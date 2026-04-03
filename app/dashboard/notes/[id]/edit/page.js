'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function EditNotePage() {
  const { id } = useParams()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch(`/api/notes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.note.title)
        setContent(data.note.content)
      })
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })

    router.push(`/dashboard/notes/${id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <Image src={'/logo.png'} alt="logo" width={101} height={53} />
      <h1 className="text-2xl font-bold text-black">
        <Link href="/dashboard">Dashboard</Link> /{' '}
        <Link href={`/dashboard/notes`}>Mes Notes</Link> /{' '}
        <Link href={`/dashboard/notes/${id}/edit`}>Modifier la note</Link>
      </h1>
      <input
        type="text"
        className="w-full border p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre"
      />
      <textarea
        className="w-full border p-2"
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenu"
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        type="submit"
      >
        Enregistrer
      </button>
    </form>
  )
}
