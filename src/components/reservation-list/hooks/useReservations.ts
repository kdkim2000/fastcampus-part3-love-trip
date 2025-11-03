import { useQuery } from '@tanstack/react-query'
import { getReservations } from '@remote/reservation'

import useUser from '@hooks/auth/useUser'

export default function useReservations() {
  const user = useUser()

  const { data, isPending } = useQuery({
    queryKey: ['reservations', user?.uid],
    queryFn: () => getReservations({ userId: user?.uid as string }),
    enabled: user != null,
  })

  return { data, isLoading: isPending }
}
