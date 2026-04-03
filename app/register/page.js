'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
      setMessage('')
    } else {
      setMessage(data.message)
      setError('')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    }
  }

  {
    // Implémenter un email de bienvenue après l'inscription d'un user.
  }

  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      <form className="w-2xs flex flex-col gap-4" onSubmit={handleRegister}>
        <Image src={'/logo.png'} alt="logo" width={101} height={53} />
        <input
          className="p-2 border border-amber-200"
          type="text"
          required
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-2 border border-amber-200"
          type="email"
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 border border-amber-200"
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="p-2 border text-white bg-amber-500" type="submit">
          S’inscrire
        </button>
        <p>
          Vous avez déjà un compte ? Connectez-vous{' '}
          <Link className="text-amber-600" href={`/login`}>
            ici
          </Link>
        </p>
        {error !== '' && <p className="text-red-500">{error}</p>}
        {message !== '' && <p className="text-green-500">{message}</p>}
      </form>
    </div>
  )
}
