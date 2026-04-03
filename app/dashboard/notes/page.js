'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Notes() {
  const [notes, setNotes] = useState([])

  const fetchNotes = async () => {
    const res = await fetch('/api/notes')
    const data = await res.json()
    setNotes(data.notes || [])
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div className="bg-[url('/bg-dash.jp')] bg-fixed bg-cover bg-center h-screen">
      <Image src={'/logo.png'} alt="logo" width={101} height={53} />
      <h1 className="text-2xl font-bold text-black p-4">
        <Link href="/dashboard">Dashboard</Link> /{' '}
        <Link href={`/dashboard/notes`}>Mes Notes</Link>
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="flex w-2xl flex-wrap gap-4 p-4">
          {notes.length !== 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="p-2 shadow-lg text-white rounded odd:bg-blue-500 bg-amber-500"
              >
                <h2 className="font-bold">
                  <Link href={`/dashboard/notes/${note.id}`}>{note.title}</Link>
                </h2>
                <p className="text-sm">{note.content}</p>
              </div>
            ))
          ) : (
            <p>Aucune note pour le moment</p>
          )}
          <Link
            className="p-2 rounded-md bg-amber-600 text-white"
            href={`/dashboard/notes/add`}
          >
            Ajouter une note
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Notes
