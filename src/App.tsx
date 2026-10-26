import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInAnonymously, type User } from 'firebase/auth'
import { auth, isFirebaseConfigured } from './firebase'

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(auth, setUser)
  }, [])

  const joinAsGuest = async () => {
    if (!auth) return
    setError(null)
    try {
      await signInAnonymously(auth)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }

  return (
    <main className="screen">
      <h1>Bobby vs Bots</h1>
      <p className="tagline">Some of you are not who you seem. Find the Bots.</p>

      {!isFirebaseConfigured && (
        <p className="notice">Firebase is not configured. Copy .env.example to .env.local and fill it in.</p>
      )}

      {isFirebaseConfigured && !user && (
        <button className="primary" onClick={joinAsGuest}>
          Join as guest
        </button>
      )}

      {user && <p className="notice">Connected as {user.isAnonymous ? 'guest' : user.email} ({user.uid.slice(0, 6)})</p>}

      {error && <p className="error">{error}</p>}
    </main>
  )
}
