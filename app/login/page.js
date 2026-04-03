'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error)
    } else router.push('/dashboard')
  }

  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      <form className="w-2xs flex flex-col gap-4" onSubmit={handleLogin}>
        <Image src={'/logo.png'} alt="logo" width={101} height={53} />
        <input
          placeholder="Email"
          className="p-2 border border-amber-200"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="p-2 border border-amber-200"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="p-2 border text-white bg-amber-500" type="submit">
          Se connecter
        </button>
        <p className="flex flex-wrap justify-between">
          <input type="checkbox" />
          <label>Se souvenir de moi</label>
          <Link href={`/password-forgotten`}>Mot de passe oublié</Link>
        </p>
        <p>
          Vous n&apos;avez pas de compte ? Inscrivez-vous{' '}
          <Link className="text-amber-600" href={`/register`}>
            ici
          </Link>
        </p>
        {error !== '' && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}
