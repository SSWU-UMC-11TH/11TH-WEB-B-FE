import React from 'react'
import { useFavoriteMutation, useFavoritesQuery, useFavoriteStatusQuery } from '../../hooks/use-favorites'
import { useMeQuery } from '../../hooks/use-me-query'
import { useAuthStore } from '../../stores/auth-store'
import { useBookmarkStore } from '../../stores/bookmark-store'
import { getApiErrorMessage } from '../../utils/api-error-message'
import { cn } from '../../utils/cn'

interface FavoriteButtonProps {
  movieId: number
  compactPosition?: string
}

export default function FavoriteButton({ movieId, compactPosition }: FavoriteButtonProps) {
  const hasToken = useAuthStore((state) => Boolean(state.accessToken))
  const member = useMeQuery()
  const canQuery = hasToken && Boolean(member.data)
  const favorites = useFavoritesQuery(canQuery && Boolean(compactPosition))
  const status = useFavoriteStatusQuery(movieId, canQuery && !compactPosition)
  const favorite = compactPosition ? favorites : status
  const mutation = useFavoriteMutation(movieId)
  const localFavorite = useBookmarkStore((state) => state.bookmarkedMovieIds.includes(movieId))
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark)
  const submitting = React.useRef(false)

  const serverFavorite = compactPosition ? favorites.data?.some((item) => item.movieId === movieId) : status.data
  const isFavorite = hasToken ? serverFavorite === true : localFavorite
  const isBusy = hasToken && (member.isPending || favorite.isPending || mutation.isPending)
  const lookupError = hasToken ? member.error ?? favorite.error : null

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (!useAuthStore.getState().accessToken) {
      toggleBookmark(movieId)
      return
    }
    if (!canQuery || serverFavorite === undefined || isBusy || lookupError || submitting.current) return

    submitting.current = true
    try {
      await mutation.mutateAsync(!isFavorite)
    } catch {
      // The mutation error is shown below the button.
    } finally {
      submitting.current = false
    }
  }

  const error = lookupError ?? (hasToken ? mutation.error : null)
  const buttonClass = compactPosition
    ? cn(
      'absolute flex size-[34px] cursor-pointer items-center justify-center rounded-lg border px-[6px] py-[7.5px]',
      compactPosition,
      isFavorite ? 'border-[#2563eb] bg-[#2563eb]' : 'border-white bg-[rgba(23,25,30,0.8)]',
    )
    : 'static mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-[6px] border-0 bg-[#2563eb] px-4 py-[10px] font-[Arial] text-[14px] font-bold leading-[normal] text-white'

  return (
    <>
      <button
        type="button"
        className={cn(buttonClass, 'disabled:cursor-not-allowed disabled:opacity-60')}
        title={compactPosition && error ? getApiErrorMessage(error) : undefined}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? '북마크 해제' : '북마크 추가'}
        disabled={isBusy || Boolean(lookupError)}
        onClick={(event) => void handleClick(event)}
      >
        <img
          className={cn('brightness-0 invert', compactPosition ? 'block h-[19px] w-[22px]' : 'size-[18px]')}
          src={isFavorite ? '/icons/bookmark.svg' : '/icons/bookmark-outline.svg'}
          alt=""
        />
        {!compactPosition && (isBusy && !lookupError ? '처리 중…' : '즐겨찾기')}
      </button>
      {!compactPosition && lookupError && (
        <div className="mt-2 text-sm">
          <p role="alert">{getApiErrorMessage(lookupError)}</p>
          <button type="button" className="text-[#2563eb]" onClick={() => void (member.isError ? member.refetch() : favorite.refetch())}>
            다시 불러오기
          </button>
        </div>
      )}
      {hasToken && mutation.isError && (
        <p role="alert" className={compactPosition ? 'sr-only' : 'mt-2 text-sm text-[#b91c1c]'}>{getApiErrorMessage(mutation.error)}</p>
      )}
    </>
  )
}
