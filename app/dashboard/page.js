'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import LineChart from '@/components/LineChart'

export default function Dashboard() {
  const [loginCount, setLoginCount] = useState(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const [filterNotes, setFilterNotes] = useState({
    all: false,
    fromDate: '',
    toDate: '',
  })
  const router = useRouter()

  useEffect(() => {
    fetch('/api/user/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setLoginCount(data.user.loginCount)
          setName(data.user.name)
          setRole(data.user.role)
        }
      })
  }, [])

  const logout = async () => {
    await fetch('api/auth/logout')
    router.push('/login')
  }

  const handleFilterNotes = (e) => {
    const { name, value } = e.target
    setFilterNotes((prev) => ({ ...prev, [name]: value }))
    console.log('changement ', new Date(e.target.value), e.target.name)

    if (filterNotes.fromDate != '' || filterNotes.toDate != '') {
      setFilterNotes((prev) => ({ ...prev, all: false }))
    }
  }

  const handleCheckedAll = (e) => {
    console.log('changement de ', !e.target.checked)
    setFilterNotes((prev) => ({
      ...prev,
      all: e.target.checked,
    }))
    console.log('à ', e.target.checked)

    if (filterNotes.all === !e.target.checked) {
      setFilterNotes((prev) => ({ ...prev, fromDate: '', toDate: '' }))
      console.log(`checked ${filterNotes.all} pour le all`)
    }
  }

  const getFilterNotes = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/generate-pdf-notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filterNotes),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error)
    } else {
      setError('')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.id = 'pdfnotes'
      a.href = url
      a.download = 'notes.pdf'
      a.innerText = 'Télécharger le pdf avant son autodestruction dans 10s'
      ;((a.style.color = 'white'),
        (a.style.backgroundColor = 'orange'),
        (a.style.padding = '5px'),
        (a.style.marginLeft = '5px'),
        (a.style.borderRadius = '10px'),
        document.getElementById('content-href-download').append(a))
      document.getElementById('buttonpdf').disabled = true
      // a.click()
      const start = Date.now()

      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - start) / 1000)
        a.innerText = `Télécharger ⏱️ ${elapsed}s`
      }, 1000)

      setTimeout(() => {
        clearInterval(interval)
        document.getElementById('pdfnotes').remove()
        document.getElementById('buttonpdf').disabled = false
      }, 10000)
    }
  }

  return (
    <div className="p-4">
      <Image src={'/logo.png'} alt="logo" width={101} height={53} />
      <h1 className="text-2xl font-bold text-black py-4">
        <Link href="/dashboard">Dashboard</Link>
      </h1>
      {loginCount === 1 && (
        <p className="py-4">
          Bienvenue <b>{name}</b> sur KeepNote ! 🎉
        </p>
      )}
      <div className="gap-4 flex flex-row">
        <Link href={'dashboard/profile'}>My profile</Link> |
        <Link href={`/dashboard/notes`}>Mes Notes</Link> |
        {role === 'admin' && (
          <p className="gap-4 flex flex-row">
            <Link href={`/admin`}>Administration</Link> |
          </p>
        )}
        <button onClick={() => logout()}>Déconnexion</button>
      </div>

      <div className="flex flex-wrap h-auto pt-4">
        <div className="md:w-1/2 w-full">{<LineChart />}</div>
        <div className="md:w-1/2 w-full">
          <form className="flex flex-row gap-4">
            <div>
              <label>Toutes les notes</label>{' '}
              <input
                type="checkbox"
                name="all"
                checked={filterNotes.all}
                onChange={(e) => handleCheckedAll(e)}
              />
            </div>
            <input
              type="date"
              name="fromDate"
              value={filterNotes.fromDate}
              onChange={(e) => handleFilterNotes(e)}
            />
            <label>à</label>
            <input
              type="date"
              name="toDate"
              value={filterNotes.toDate}
              onChange={(e) => handleFilterNotes(e)}
            />
          </form>
          <div id="content-href-download" className="pt-4">
            <button
              id="buttonpdf"
              className="bg-blue-400 text-white p-2 border rounded-md"
              onClick={(e) => getFilterNotes(e)}
            >
              Générer un pdf de vos notes
            </button>
          </div>
          {error !== '' && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  )
}
