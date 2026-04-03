import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

function NameAndEmail() {
  const { property } = useParams()
  const [data, setData] = useState({
    name: '',
    email: '',
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/user/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      setError('Erreur')
    } else {
      setError('')
      router.push('/dashboard/profile')
    }
  }
  return (
    <div className="flex flex-wrap justify-center items-center h-[200px]">
      <form className="w-2xs flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type={property === 'name' ? `${'text'}` : property}
          name={property}
          value={property === 'name' ? data.name : data.email}
          placeholder={`Modifier`}
          onChange={(e) => handleChange(e)}
          className="p-2 border"
        />
        <button type="submit">Modifier</button>
      </form>
      {error !== '' && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default NameAndEmail
