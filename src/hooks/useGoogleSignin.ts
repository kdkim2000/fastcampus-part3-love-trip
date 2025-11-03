import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useCallback } from 'react'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

import { auth, store } from '@remote/firebase'
import { COLLECTIONS } from '@constants'
import { FirebaseError } from 'firebase/app'

function useGoogleSignin() {
  const navigate = useNavigate()

  const signin = useCallback(async () => {
    const provider = new GoogleAuthProvider()

    try {
      const { user } = await signInWithPopup(auth, provider)

      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), user.uid),
      )

      // 이미 가입한 유저
      if (userSnapshot.exists()) {
        navigate('/')
      } else {
        const 새로운유저 = {
          uid: user.uid,
          email: user.email ?? '',
          displayName: user.displayName ?? '',
          photoURL: user.photoURL ?? '',
        }

        await setDoc(
          doc(collection(store, COLLECTIONS.USER), user.uid),
          새로운유저,
        )

        navigate('/')
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Firebase error code:', error.code)
        console.error('Firebase error message:', error.message)

        if (error.code === 'auth/popup-closed-by-user') {
          return
        }

        if (error.code === 'auth/popup-blocked') {
          alert('팝업이 차단되었습니다. 팝업 차단을 해제해주세요.')
          return
        }

        if (error.code === 'auth/cancelled-popup-request') {
          return
        }
      }

      console.error('Signin error:', error)
      alert('로그인에 실패했습니다. 다시 시도해주세요.')
    }
  }, [navigate])

  const signout = useCallback(() => {
    signOut(auth)
  }, [])

  return { signin, signout }
}

export default useGoogleSignin
