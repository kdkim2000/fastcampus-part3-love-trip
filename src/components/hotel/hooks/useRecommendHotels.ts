import { useQuery } from '@tanstack/react-query'
import { getRecommendHotels } from '@remote/hotel'

function useRecommendHotels({ hotelIds }: { hotelIds: string[] }) {
  return useQuery({
    queryKey: ['recommendHotels', JSON.stringify(hotelIds)],
    queryFn: () => getRecommendHotels(hotelIds),
    enabled: hotelIds.length > 0,
  })
}

export default useRecommendHotels
