import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { getHotels } from '@remote/hotel'
import { useCallback } from 'react'
import { Hotel } from '@models/hotel'

function useHotels() {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    useSuspenseInfiniteQuery({
      queryKey: ['hotels'],
      queryFn: ({ pageParam }) => getHotels(pageParam),
      initialPageParam: undefined,
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible || undefined
      },
    })

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  const hotels = (data?.pages ?? [])
    .map((page: any) => page.items as Hotel[])
    .flat()

  return { data: hotels, loadMore, isFetching, hasNextPage }
}

export default useHotels
