import { queryOptions } from "@tanstack/react-query";
import { getFavorites, getFavoriteStatus } from "./favorites";

export const favoriteQueries = {
  all: () => ["favorites"] as const,

  list: () =>
    queryOptions({
      queryKey: [...favoriteQueries.all(), "list"],
      queryFn: getFavorites,
    }),

  status: (movieId: number) =>
    queryOptions({
      queryKey: [...favoriteQueries.all(), "status", movieId],
      queryFn: () => getFavoriteStatus(movieId),
    }),
};
