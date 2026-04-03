'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function NotesPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
    const data = await res.json()
    if (res.ok) {
      setTitle('')
      setContent('')
      if (data.note) {
        setMessage('Note créée avec succès !')
        setError('')
      }
    } else {
      setError(data.error)
      setMessage('')
    }
  }

  return (
    <div className="p-4">
      <Image src={'/logo.png'} alt="logo" width={101} height={53} />
      <h1 className="text-2xl font-bold text-black p-4">
        <Link href="/dashboard">Dashboard</Link> /{' '}
        <Link href={`/dashboard/notes`}>Mes Notes</Link> /{' '}
        <Link href={`/dashboard/notes/add`}>Ajouter</Link>
      </h1>
      <form onSubmit={handleSubmit} className="space-y-2 p-4">
        <input
          className="border px-2 py-1 w-full"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border px-2 py-1 w-full"
          placeholder="Contenu"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-1 rounded">
          Créer une note
        </button>
        {error !== '' && <p className="text-red-500">{error}</p>}
        {message !== '' && <p className="text-green-500">{message}</p>}
      </form>
    </div>
  )
}
