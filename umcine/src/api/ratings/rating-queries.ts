import { queryOptions } from "@tanstack/react-query";
import { getMemberRatings } from "./ratings";

export const ratingQueries = {
  all: () => ["ratings"] as const,

  byMember: (memberId: number) =>
    queryOptions({
      queryKey: [...ratingQueries.all(), "member", memberId],
      queryFn: () => getMemberRatings(memberId),
    }),
};
