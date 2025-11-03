import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '@remote/firebase'
import { UserContext } from '@contexts/UserContext'
import { User } from '@models/user'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser == null) {
        setUser(null)
      } else {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? '',
          displayName: firebaseUser.displayName ?? '',
          photoURL: firebaseUser.photoURL ?? '',
        })
      }

      setInitialize(true)
    })

    return () => unsubscribe()
  }, [])

  if (initialize === false) {
    return null
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default AuthGuard
