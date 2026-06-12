import {queryOptions} from "@tanstack/react-query";
import {fetchBirdById, fetchBirds} from "../Birds/birds.ts";

export const birdQueryOptions = {
    all: () =>
        queryOptions({
            queryKey: ["birds"],
            queryFn: fetchBirds,
            staleTime: 5 * 60 * 1000,
        }),
    byId: (id: number) =>
        queryOptions({
            queryKey: ['birds', id],
            queryFn: () => fetchBirdById(id),
            staleTime: 10 * 60 * 1000,
        }),
}

