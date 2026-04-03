import { useState } from 'react'
import { useRouter } from 'next/navigation'

function PasswordProfile() {
  const [oldpassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handlePass = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/user/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldpassword, password, confirmpassword }),
    })

    const datas = await res.json()
    if (!res.ok) {
      setError(datas.error)
    } else {
      setError('')
      setMessage(datas.message)
      setTimeout(() => {
        router.push('/dashboard/profile')
      }, 2000)
    }
  }

  return (
    <div className="flex flex-wrap justify-center items-center h-[400px]">
      <form className="w-2xs flex flex-col gap-4" onSubmit={handlePass}>
        <input
          type="password"
          name="oldpassword"
          placeholder="Ancien Mot de Passe"
          className="p-2 border border-amber-200"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className="p-2 border border-amber-200"
          placeholder="Nouveau Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmpassword"
          className="p-2 border border-amber-200"
          placeholder="Confirmer le Nouveau Mot de passe"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="p-2 border text-white bg-amber-500" type="submit">
          Se connecter
        </button>
        {error !== '' && <p className="text-red-500">{error}</p>}
        {message !== '' && <p className="text-green-500">{message}</p>}
      </form>
    </div>
  )
}

export default PasswordProfile
