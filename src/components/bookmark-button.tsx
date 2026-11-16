import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
    movieId: number;
}

export function BookmarkButton({ movieId }: BookmarkButtonProps) {
    const isBookmarked = useBookmarkStore((state) =>
        state.bookmarkedMovieIds.includes(movieId),
    );

    const toggleBookmark = useBookmarkStore(
        (state) => state.toggleBookmark,
    );

    return (
        <button
            type="button"
            className={cn(
                "absolute right-[9px] top-[9px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-[7px] border-0 p-[5px]",
                isBookmarked
                    ? "bg-blue-600"
                    : "bg-[rgba(20,20,20,0.75)]",
            )}
            aria-pressed={isBookmarked}
            onClick={() => toggleBookmark(movieId)}
        >
            <img
                src={
                    isBookmarked
                        ? "/icons/bookmark.svg"
                        : "/icons/bookmark-outline.svg"
                }
                alt=""
                className="h-full w-full"
            />
        </button>
    );
}