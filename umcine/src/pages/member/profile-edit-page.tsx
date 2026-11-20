import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ChangeEvent, type SubmitEvent } from "react";
import { memberQueries } from "../../api/members/member-queries";
import type { MemberInfo } from "../../api/members/me";
import { EditIcon } from "../../components/icons";
import { ProfileAvatar } from "../../components/member/profile-avatar";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";
import { useProfileStore } from "../../stores/profile-store";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const inputClass =
  "h-12 w-full rounded-lg border border-[#e3e6eb] bg-white px-4 text-sm text-[#17191e] outline-none transition-colors focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/15";

export function ProfileEditPage() {
  const meQuery = useQuery(memberQueries.me());

  if (meQuery.isPending) {
    return (
      <main className="mx-auto w-full max-w-[1440px] flex-1 px-6 py-20 text-center text-sm text-[#606774] md:px-20">
        <p role="status">내 정보를 불러오는 중이에요.</p>
      </main>
    );
  }

  if (meQuery.isError) {
    return (
      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-wrap items-start justify-center gap-3 px-6 py-20 text-sm text-[#606774] md:px-20">
        <p role="alert">내 정보를 불러오지 못했어요.</p>
        <button
          type="button"
          onClick={() => meQuery.refetch()}
          className="font-bold text-[#2563eb] hover:underline"
        >
          다시 시도
        </button>
      </main>
    );
  }

  // 불러온 내 정보를 폼의 초기값으로 쓰기 위해 데이터가 준비된 뒤에 폼을 그려요.
  return <ProfileEditForm member={meQuery.data} />;
}

function ProfileEditForm({ member }: { member: MemberInfo }) {
  const navigate = useNavigate();
  const savedImageDataUrl = useProfileStore((state) => state.imageDataUrl);
  const saveImage = useProfileStore((state) => state.saveImage);
  const updateMeMutation = useUpdateMeMutation();
  const [nickname, setNickname] = useState(member.nickname);
  const [imageDataUrl, setImageDataUrl] = useState(savedImageDataUrl);
  const [imageError, setImageError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isReadingImage, setIsReadingImage] = useState(false);
  const readerRef = useRef<FileReader | null>(null);
  const isNicknameValid = nickname.trim().length >= 2 && nickname.trim().length <= 12;

  useEffect(() => () => {
    const reader = readerRef.current;
    readerRef.current = null;
    reader?.abort();
  }, []);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const previousReader = readerRef.current;
    readerRef.current = null;
    previousReader?.abort();
    setIsReadingImage(false);
    setImageError(null);
    setSaveError(null);

    if (!IMAGE_TYPES.includes(file.type)) {
      setImageError("JPG, PNG, WebP, GIF 이미지 파일을 선택해 주세요.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("프로필 이미지는 5MB 이하로 선택해 주세요.");
      return;
    }

    const reader = new FileReader();
    readerRef.current = reader;
    setIsReadingImage(true);

    reader.onload = async () => {
      try {
        const source = String(reader.result);
        const image = new Image();
        image.src = source;
        await image.decode();
        if (readerRef.current === reader) setImageDataUrl(source);
      } catch {
        if (readerRef.current === reader) setImageError("이미지를 읽을 수 없어요. 다른 파일을 선택해 주세요.");
      } finally {
        if (readerRef.current === reader) setIsReadingImage(false);
      }
    };
    reader.onerror = () => {
      if (readerRef.current !== reader) return;
      setImageError("이미지를 읽을 수 없어요. 다시 선택해 주세요.");
      setIsReadingImage(false);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isNicknameValid || isReadingImage || updateMeMutation.isPending) return;
    setSaveError(null);

    try {
      saveImage(imageDataUrl);
    } catch (error) {
      setSaveError(
        error instanceof DOMException && error.name === "QuotaExceededError"
          ? "브라우저 저장 공간이 부족해요. 더 작은 이미지를 선택해 주세요."
          : "변경사항을 저장하지 못했어요. 다시 시도해 주세요.",
      );
      return;
    }

    const trimmedNickname = nickname.trim();
    // 닉네임이 그대로면 서버에 요청하지 않아요.
    if (trimmedNickname === member.nickname) {
      navigate({ to: "/mypage" });
      return;
    }

    // 성공하면 응답으로 내 정보 캐시를 바꾸고(setQueryData) 마이페이지로 이동해요.
    updateMeMutation.mutate({ nickname: trimmedNickname });
  }

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 pb-7 pt-6 md:px-20">
      <form onSubmit={handleSubmit} noValidate className="mb-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-bold leading-tight tracking-[-1.2px] text-[#17191e]">
              내 정보 수정
            </h1>
            <p className="mt-3 text-sm text-[#606774]">
              닉네임과 프로필 이미지만 변경할 수 있어요.
            </p>
          </div>
          <button
            type="submit"
            disabled={!isNicknameValid || isReadingImage || updateMeMutation.isPending}
            className="h-10 shrink-0 rounded-lg bg-[#2563eb] px-4 text-sm font-bold text-white transition-colors hover:enabled:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updateMeMutation.isPending ? "저장 중" : "변경사항 저장"}
          </button>
        </div>

        {saveError && <p role="alert" className="mt-4 text-sm text-red-600">{saveError}</p>}

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center md:pt-5">
            <label htmlFor="profile-image" className="group flex cursor-pointer flex-col items-center">
              <span className="relative">
                <ProfileAvatar imageDataUrl={imageDataUrl} />
                <span className="absolute bottom-0 right-0 rounded-full bg-[#f8f9fa] text-[#17191e] group-hover:text-[#2563eb] group-focus-within:text-[#2563eb]">
                  <EditIcon width={26} height={26} />
                </span>
                <input
                  id="profile-image"
                  name="profileImage"
                  type="file"
                  accept={IMAGE_TYPES.join(",")}
                  className="peer sr-only"
                  aria-describedby="profile-image-help profile-image-error"
                  aria-invalid={!!imageError}
                  onChange={handleImageChange}
                />
                <span className="pointer-events-none absolute inset-0 rounded-full peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#2563eb]" />
              </span>
              <span className="mt-2 text-sm font-bold text-[#17191e]">프로필 이미지</span>
            </label>
            <p id="profile-image-help" className="mt-1 text-xs text-[#969da8]">선택 사항 · 최대 5MB</p>
            {isReadingImage && <p role="status" className="mt-2 text-xs text-[#606774]">이미지를 불러오는 중이에요.</p>}
            <p id="profile-image-error" role={imageError ? "alert" : undefined} className="mt-2 text-center text-xs text-red-600">
              {imageError}
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-5">
            <div>
              <label htmlFor="profile-nickname" className="mb-2 block text-sm font-bold text-[#17191e]">
                닉네임
              </label>
              <div className="relative">
                <input
                  id="profile-nickname"
                  name="nickname"
                  autoComplete="nickname"
                  value={nickname}
                  onChange={(event) => { setNickname(event.target.value); setSaveError(null); }}
                  aria-invalid={!isNicknameValid}
                  aria-describedby={!isNicknameValid ? "nickname-error" : undefined}
                  className={`${inputClass} pr-24`}
                />
                <button
                  type="button"
                  disabled
                  aria-label="닉네임 중복 확인 (준비 중)"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#2563eb] disabled:cursor-not-allowed"
                >
                  중복 확인
                </button>
              </div>
              {!isNicknameValid && (
                <p id="nickname-error" role="alert" className="mt-2 text-xs text-red-600">
                  닉네임은 앞뒤 공백을 제외하고 2~12자로 입력해 주세요.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="profile-email" className="mb-2 block text-sm font-bold text-[#17191e]">
                이메일
              </label>
              <input id="profile-email" name="email" type="email" value={member.email} readOnly className={inputClass} />
            </div>
          </div>
        </div>
      </form>

      <section aria-labelledby="withdrawal-title" className="mt-auto flex flex-wrap items-center justify-between gap-5 rounded-xl border border-[#ef3525] bg-[#fef2f2] p-5 text-[#df2e20]">
        <div>
          <h2 id="withdrawal-title" className="text-sm font-bold">회원 탈퇴</h2>
          <p className="mt-2 text-xs leading-relaxed">
            탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.
          </p>
        </div>
        <button type="button" disabled aria-label="회원 탈퇴 (준비 중)" className="h-10 shrink-0 rounded-lg border border-[#ef3525] bg-white px-4 text-sm font-bold disabled:cursor-not-allowed">
          회원 탈퇴
        </button>
      </section>
    </main>
  );
}
