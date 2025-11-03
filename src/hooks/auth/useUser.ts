import { useUserContext } from '@contexts/UserContext'

function useUser() {
  const { user } = useUserContext()
  return user
}

export default useUser
