import { useRef, useState } from "react";
import type { UserProfile } from "../data/current-user";
import { EditIcon } from "./icons";
import "./profile-edit-page.css";

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

interface ProfileEditPageProps {
  profile: UserProfile;
  onSave: (changes: Pick<UserProfile, "nickname" | "avatarUrl">) => void;
}

export default function ProfileEditPage({ profile, onSave }: ProfileEditPageProps) {
  const [nickname, setNickname] = useState(profile.nickname);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleCheckNickname() {
    // TODO: 닉네임 중복 확인 API 연동은 이후 주차에서 이어가요.
    console.log("닉네임 중복 확인 요청");
  }

  function handleChangeAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    // 같은 파일을 다시 골라도 onChange가 실행되도록 선택값을 비워요.
    event.target.value = "";
    if (!file) return;

    if (file.size > MAX_AVATAR_BYTES) {
      setAvatarError("5MB 이하의 이미지만 올릴 수 있어요.");
      return;
    }

    setAvatarError(null);
    setAvatarUrl(URL.createObjectURL(file));
  }

  function handleSave() {
    // TODO: 실제 정보 저장 API 연동은 이후 주차에서 이어가요.
    onSave({ nickname, avatarUrl });
  }

  function handleDeleteAccount() {
    // TODO: 실제 회원 탈퇴 API 연동은 이후 주차에서 이어가요.
    const confirmed = window.confirm(
      "탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다. 정말 탈퇴하시겠어요?",
    );
    if (confirmed) {
      console.log("회원 탈퇴 확정");
    }
  }

  return (
    <section className="profile-edit-page">
      <div className="profile-edit-page__header">
        <div>
          <h1 className="profile-edit-page__title">내 정보 수정</h1>
          <p className="profile-edit-page__subtitle">
            닉네임과 프로필 이미지만 변경할 수 있어요.
          </p>
        </div>
        <button
          type="button"
          className="profile-edit-page__save-button"
          onClick={handleSave}
        >
          변경사항 저장
        </button>
      </div>

      <div className="profile-edit-page__body">
        <div className="profile-edit-page__avatar-field">
          <div className="profile-edit-page__avatar-wrap">
            <img
              className="profile-edit-page__avatar"
              src={avatarUrl}
              alt=""
              aria-hidden="true"
            />
            <button
              type="button"
              className="profile-edit-page__avatar-edit"
              aria-label="프로필 이미지 변경"
              onClick={() => fileInputRef.current?.click()}
            >
              <EditIcon width={14} height={14} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="profile-edit-page__avatar-input"
              onChange={handleChangeAvatar}
            />
          </div>
          <p className="profile-edit-page__avatar-label">프로필 이미지</p>
          <p className="profile-edit-page__avatar-hint">선택 사항 · 최대 5MB</p>
          {avatarError && (
            <p className="profile-edit-page__avatar-error" role="alert">
              {avatarError}
            </p>
          )}
        </div>

        <div className="profile-edit-page__fields">
          <div className="profile-edit-page__field">
            <label className="profile-edit-page__label" htmlFor="edit-nickname">
              닉네임
            </label>
            <div className="profile-edit-page__input-wrap">
              <input
                id="edit-nickname"
                className="profile-edit-page__input"
                type="text"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
              />
              <button
                type="button"
                className="profile-edit-page__check-button"
                onClick={handleCheckNickname}
              >
                중복 확인
              </button>
            </div>
          </div>

          <div className="profile-edit-page__field">
            <label className="profile-edit-page__label" htmlFor="edit-email">
              이메일
            </label>
            <div className="profile-edit-page__input-wrap">
              <input
                id="edit-email"
                className="profile-edit-page__input"
                type="email"
                value={profile.email}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className="profile-edit-page__danger-zone">
        <div>
          <h2 className="profile-edit-page__danger-title">회원 탈퇴</h2>
          <p className="profile-edit-page__danger-text">
            탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.
          </p>
        </div>
        <button
          type="button"
          className="profile-edit-page__danger-button"
          onClick={handleDeleteAccount}
        >
          회원 탈퇴
        </button>
      </div>
    </section>
  );
}
