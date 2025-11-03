import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { getReviews, writeReview, removeReview } from '@remote/review'
import useUser from '@hooks/auth/useUser'

function useReview({ hotelId }: { hotelId: string }) {
  const user = useUser()
  const client = useQueryClient()

  const { data, isPending } = useQuery({
    queryKey: ['reviews', hotelId],
    queryFn: () => getReviews({ hotelId }),
  })

  const { mutateAsync: write } = useMutation({
    mutationFn: async (text: string) => {
      const newReview = {
        createdAt: new Date(),
        hotelId,
        userId: user?.uid as string,
        text,
      }

      await writeReview(newReview)

      return true
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['reviews', hotelId] })
    },
  })

  const { mutate: remove } = useMutation({
    mutationFn: ({
      reviewId,
      hotelId,
    }: {
      reviewId: string
      hotelId: string
    }) => {
      return removeReview({ reviewId, hotelId })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['reviews', hotelId] })
    },
  })

  return { data, isLoading: isPending, write, remove }
}

export default useReview
