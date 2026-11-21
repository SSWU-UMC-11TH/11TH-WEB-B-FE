import React from 'react'
import { Link } from '@tanstack/react-router'
import type { Rating, RatingInput } from '../../api/members/ratings'
import { useMeQuery } from '../../hooks/use-me-query'
import { useMemberRatingsQuery, useRatingMutation, type RatingChange } from '../../hooks/use-member-ratings'
import { useAuthStore } from '../../stores/auth-store'
import { getApiErrorMessage } from '../../utils/api-error-message'
import { getTokenMemberId } from '../../utils/get-token-member-id'

export default function MovieRating({ movieId }: { movieId: number }) {
  const accessToken = useAuthStore((state) => state.accessToken)
  const member = useMeQuery()
  const memberId = accessToken ? getTokenMemberId(accessToken) : null

  return (
    <div>
      <div>내 평점</div>
      {!accessToken ? (
        <Link to="/login" className="mt-2 inline-block text-sm text-[#2563eb]">로그인하고 평점 남기기</Link>
      ) : member.isError ? (
        <div className="mt-2 text-sm">
          <p role="alert">{getApiErrorMessage(member.error)}</p>
          <button type="button" className="text-[#2563eb]" onClick={() => void member.refetch()}>다시 불러오기</button>
        </div>
      ) : !member.data ? (
        <p role="status" className="mt-2 text-sm">내 정보를 불러오는 중이에요.</p>
      ) : !memberId ? (
        <p role="alert" className="mt-2 text-sm">로그인 정보에서 회원 ID를 확인할 수 없어요.</p>
      ) : (
        <MemberMovieRating key={memberId} memberId={memberId} movieId={movieId} />
      )}
    </div>
  )
}

function MemberMovieRating({ memberId, movieId }: { memberId: string; movieId: number }) {
  const ratings = useMemberRatingsQuery(memberId)
  const mutation = useRatingMutation(memberId)
  const submitting = React.useRef(false)

  const submit = async (change: RatingChange) => {
    if (submitting.current) return
    submitting.current = true
    try {
      await mutation.mutateAsync(change)
    } catch {
      // The mutation error is shown below the form.
    } finally {
      submitting.current = false
    }
  }

  if (ratings.isPending) return <p role="status" className="mt-2 text-sm">평점을 불러오는 중이에요.</p>
  if (ratings.isError) {
    return (
      <div className="mt-2 text-sm">
        <p role="alert">{getApiErrorMessage(ratings.error)}</p>
        <button type="button" className="text-[#2563eb]" onClick={() => void ratings.refetch()}>다시 불러오기</button>
      </div>
    )
  }

  const rating = ratings.data.find((item) => item.movieId === movieId)

  return (
    <>
      <RatingForm
        key={rating ? `${rating.ratingId}:${rating.updatedAt}` : 'new'}
        rating={rating}
        isPending={mutation.isPending}
        onSave={(input) => void submit(rating ? { type: 'update', ratingId: rating.ratingId, input } : { type: 'create', movieId, input })}
        onDelete={rating ? () => void submit({ type: 'delete', ratingId: rating.ratingId }) : undefined}
      />
      {mutation.isError && <p role="alert" className="mt-2 text-sm text-[#b91c1c]">{getApiErrorMessage(mutation.error)}</p>}
    </>
  )
}

interface RatingFormProps {
  rating?: Rating
  isPending: boolean
  onSave: (input: RatingInput) => void
  onDelete?: () => void
}

function RatingForm({ rating, isPending, onSave, onDelete }: RatingFormProps) {
  const [score, setScore] = React.useState(rating?.score ?? 0)
  const [comment, setComment] = React.useState(rating?.comment ?? '')
  const commentLength = Array.from(comment).length
  const isValid = Number.isInteger(score) && score >= 1 && score <= 5 && commentLength <= 500

  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      if (isValid && !isPending) onSave({ score, comment: comment.trim() || undefined })
    }}>
      <fieldset disabled={isPending} className="m-0 min-w-0 border-0 p-0">
        <legend className="mt-2 mb-[10px] px-0 text-[12px] text-[#98a2b3]">별점은 필수, 후기는 선택이에요.</legend>
        <div className="mb-[10px] flex gap-[6px]">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className="flex size-[34px] items-center justify-center rounded-[7px] border border-[#e5e7eb] bg-white p-0"
              aria-label={`${value}점`}
              aria-pressed={score === value}
              onClick={() => setScore(value)}
            >
              <img className="size-5" src={score >= value ? '/icons/star.svg' : '/icons/star-outline.svg'} alt="" />
            </button>
          ))}
        </div>
        <textarea
          className="mt-[10px] inline-block h-[88px] w-full resize-none rounded-lg border border-[#e5e7eb] bg-white p-3 align-baseline text-[13.3333px] text-black [font-family:inherit] placeholder:text-[#757575]"
          aria-label="후기"
          placeholder="영화를 보고 느낀 점을 남겨보세요."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        {commentLength > 500 && <p className="mt-2 text-sm text-[#b91c1c]">후기는 500자 이하로 입력해 주세요.</p>}
        <button
          type="submit"
          disabled={!isValid}
          className="mt-[10px] w-full rounded-[7px] border-0 bg-[#17191e] p-[11px] font-[Arial] text-[13.3333px] font-bold leading-[normal] text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? '처리 중…' : rating ? '평점 수정' : '평점 저장'}
        </button>
        {onDelete && (
          <button type="button" onClick={onDelete} className="mt-2 w-full rounded-[7px] border border-[#e5e7eb] bg-white p-[11px] text-sm font-bold text-[#b91c1c]">
            평점 삭제
          </button>
        )}
      </fieldset>
    </form>
  )
}
