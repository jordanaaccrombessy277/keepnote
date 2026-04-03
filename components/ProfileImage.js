'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function ProfileImage() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('file', image)

    const res = await fetch('/api/user/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    if (data.url) {
      alert('Image uploadée avec succès !')
      // Optionnel : refresh la page ou l'état
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-[200px]">
      <input
        type="file"
        className="border p-2"
        accept="image/*"
        onChange={handleChange}
      />
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          className="w-24 h-24 rounded-full mt-2"
          width={`70`}
          height={`70`}
        />
      )}
      <button
        onClick={handleUpload}
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
      >
        Uploader
      </button>
    </div>
  )
}
