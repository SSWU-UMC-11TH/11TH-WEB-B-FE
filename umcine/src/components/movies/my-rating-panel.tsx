import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ratingQueries } from "../../api/ratings/rating-queries";
import type { Rating } from "../../api/ratings/ratings";
import { useRatingMutations } from "../../hooks/use-rating-mutations";
import { useAuthStore } from "../../stores/auth-store";
import { getMemberIdFromToken } from "../../utils/auth/get-member-id-from-token";
import { StarIcon, StarOutlineIcon } from "../icons";

const RATING_COUNT = 5;
const MAX_COMMENT_LENGTH = 500;

interface MyRatingPanelProps {
  movieId: number;
}

export function MyRatingPanel({ movieId }: MyRatingPanelProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = getMemberIdFromToken(accessToken);
  // 내 평점 목록(GET /members/{memberId}/ratings)에서 이 영화의 평점을 찾아요.
  const myRatingsQuery = useQuery({
    ...ratingQueries.byMember(memberId ?? 0),
    enabled: memberId !== null,
  });
  const myRating = myRatingsQuery.data?.find((rating) => rating.movieId === movieId);

  let content: ReactNode;
  if (memberId === null) {
    content = (
      <p className="text-sm text-[#606774]">
        <Link to="/login" className="font-bold text-[#2563eb] hover:underline">
          로그인
        </Link>
        하면 평점을 남길 수 있어요.
      </p>
    );
  } else if (myRatingsQuery.isPending) {
    content = <p role="status" className="text-sm text-[#606774]">내 평점을 불러오는 중이에요.</p>;
  } else if (myRatingsQuery.isError) {
    content = (
      <div className="flex flex-wrap items-center gap-3">
        <p role="alert" className="text-sm text-[#606774]">내 평점을 불러오지 못했어요.</p>
        <button
          type="button"
          onClick={() => myRatingsQuery.refetch()}
          className="text-sm font-bold text-[#2563eb] hover:underline"
        >
          다시 시도
        </button>
      </div>
    );
  } else {
    // 등록·삭제로 평점이 바뀌면 key가 달라져 폼을 새 초기값으로 다시 그려요.
    content = (
      <RatingForm
        key={myRating?.ratingId ?? "new"}
        movieId={movieId}
        memberId={memberId}
        myRating={myRating}
      />
    );
  }

  return (
    <div className="flex flex-col gap-1 border-[#e3e6eb] lg:border-l lg:pl-8">
      <h3 className="text-lg font-bold leading-none text-[#17191e]">내 평점</h3>
      <p className="mb-2 text-[13px] text-[#969da8]">별점은 필수, 후기는 선택이에요.</p>
      {content}
    </div>
  );
}

interface RatingFormProps {
  movieId: number;
  memberId: number;
  myRating: Rating | undefined;
}

function RatingForm({ movieId, memberId, myRating }: RatingFormProps) {
  const [score, setScore] = useState(myRating?.score ?? 0);
  const [comment, setComment] = useState(myRating?.comment ?? "");
  const { createMutation, updateMutation, deleteMutation, isPending } =
    useRatingMutations(memberId);

  const trimmedComment = comment.trim();
  const isChanged =
    !myRating || score !== myRating.score || trimmedComment !== (myRating.comment ?? "");
  const canSave = score > 0 && isChanged && !isPending;

  function handleSave() {
    if (!canSave) return;

    if (myRating) {
      updateMutation.mutate({ ratingId: myRating.ratingId, score, comment: trimmedComment });
    } else {
      createMutation.mutate({ movieId, score, comment: trimmedComment });
    }
  }

  function handleDelete() {
    if (!myRating || isPending) return;
    if (!confirm("평점을 삭제할까요?")) return;
    deleteMutation.mutate(myRating.ratingId);
  }

  return (
    <>
      <div className="mb-2 flex gap-2" role="radiogroup" aria-label="별점">
        {Array.from({ length: RATING_COUNT }, (_, index) => {
          const value = index + 1;
          return (
            <button
              key={value}
              type="button"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-[#e3e6eb] bg-white px-1.5 py-px transition-colors hover:border-[#c9ced6]"
              role="radio"
              aria-checked={score === value}
              aria-label={`${value}점`}
              disabled={isPending}
              onClick={() => setScore(value)}
            >
              {value <= score ? (
                <StarIcon width={26} height={26} className="text-[#f5c518]" />
              ) : (
                <StarOutlineIcon width={26} height={26} className="text-[#606774]" />
              )}
            </button>
          );
        })}
      </div>

      <textarea
        className="h-[102px] w-full resize-none rounded-lg border border-[#e3e6eb] bg-white px-3 pb-[18px] pt-4 text-sm text-[#17191e] placeholder:text-[#b0b6bf]"
        placeholder="영화를 보고 느낀 점을 남겨보세요."
        aria-label="후기"
        maxLength={MAX_COMMENT_LENGTH}
        value={comment}
        disabled={isPending}
        onChange={(event) => setComment(event.target.value)}
      />
      <p className="text-right text-xs text-[#969da8]">
        {comment.length}/{MAX_COMMENT_LENGTH}
      </p>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="h-[42px] flex-1 rounded-lg border border-white bg-[#17191e] px-4 text-sm font-bold text-white transition-colors enabled:hover:bg-[#303540] disabled:cursor-not-allowed disabled:opacity-40"
          onClick={handleSave}
          disabled={!canSave}
        >
          {createMutation.isPending || updateMutation.isPending
            ? "저장 중"
            : myRating
              ? "평점 수정"
              : "평점 저장"}
        </button>
        {myRating && (
          <button
            type="button"
            className="h-[42px] rounded-lg border border-[#ef3525] bg-white px-4 text-sm font-bold text-[#df2e20] transition-colors enabled:hover:bg-[#fef2f2] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={handleDelete}
            disabled={isPending}
          >
            {deleteMutation.isPending ? "삭제 중" : "삭제"}
          </button>
        )}
      </div>
    </>
  );
}
