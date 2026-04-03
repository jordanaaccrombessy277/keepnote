'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'

function Profile() {
  const [user, setUser] = useState({})
  const [propertyToUpdate, setPropertyToUpdate] = useState('name')

  useEffect(() => {
    fetch('/api/user/me')
      .then((res) => res.json())
      .then((data) => setUser(data.user))
  }, [])

  return (
    <div>
      <Image src={'/logo.png'} alt="logo" width={101} height={53} />
      <h1 className="text-2xl font-bold text-black p-4">
        <Link href="/dashboard">Dashboard</Link> /{' '}
        <Link href={`/dashboard/profile`}>Mon Profile</Link>
      </h1>
      <div className="p-4 flex gap-4 w-4xl rounded-r-lg border border-amber-600 flex-wrap justify-center items-center">
        <div className="relative group w-100 h-100 overflow-hidden rounded-full mt-2">
          <Image
            src={user.profileImage || '/bg-dash.jpg'}
            alt="Preview"
            className="w-100 h-100"
            width={`400`}
            height={`400`}
            priority
          />
          <p className="w-full h-full invisible group-hover:visible flex flex-wrap justify-center items-center absolute top-0 bg-black/20">
            <Link href={`/dashboard/profile/photo`}>Update</Link>
          </p>
        </div>
        <div className="py-4">
          <p className="py-2"> Name : {user.name}</p>
          <p className="py-2">Email : {user.email}</p>
          <p className="py-2">
            Password : <span>############</span> <span>👁👀</span>
          </p>
          <p className="py-2 text-amber-600">
            {' '}
            <Link href={`/dashboard/profile/${propertyToUpdate}`}>
              Modifier
            </Link>
            <select
              value={propertyToUpdate}
              onChange={(e) => setPropertyToUpdate(e.target.value)}
            >
              <option value={`name`}>Name</option>
              <option value={`email`}>Email</option>
              <option value={`password`}>password</option>
            </select>
          </p>
          <a href="/api/generate-pdf" target="_blank" rel="noopener noreferrer">
            Télécharger le profile
          </a>
        </div>
      </div>
    </div>
  )
}

export default Profile
