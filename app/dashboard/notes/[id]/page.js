'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function NoteViewPage() {
  const [note, setNote] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { id } = useParams()

  useEffect(() => {
    fetch(`/api/notes/${id}`)
      .then((res) => res.json())
      .then((data) => setNote(data.note))
  }, [id])

  const handleDelete = async () => {
    const confirmDelete = confirm('Supprimer cette note ?')
    if (!confirmDelete) return null

    await fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    })

    router.push('/dashboard/notes')
  }

  if (!note) return <p>Chargement...</p>

  return (
    <div className="p-4">
      <Image src={'/logo.png'} alt="logo" width={101} height={53} />
      <h1 className="text-2xl font-bold text-black p-4">
        <Link href="/dashboard">Dashboard</Link> /{' '}
        <Link href={`/dashboard/notes`}>Mes Notes</Link> /{' '}
        <Link href={`/dashboard/notes/${id}`}>{note.title}</Link>
      </h1>
      <p className="mt-2">{note.content}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => router.push(`/dashboard/notes/${id}/edit`)}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Modifier
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Supprimer
        </button>
      </div>
    </div>
  )
}
