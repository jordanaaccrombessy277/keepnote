'use client'
import { useParams } from 'next/navigation'
import ProfileImage from '@/components/ProfileImage'
import NameAndEmail from '@/components/NameAndEmail'
import PasswordProfile from '@/components/PasswordProfile'
import Image from 'next/image'

function EditProfile() {
  const { property } = useParams()
  const componentProperty = (property) => {
    if (property === 'name' || property === 'email') return <NameAndEmail />
    if (property === 'password') return <PasswordProfile />
    if (property === 'photo') return <ProfileImage />
  }

  return (
    <div className="px-4">
      <Image src={'/logo.png'} alt="logo" width={101} height={53} />
      Edit your {property} here
      {componentProperty(property)}
    </div>
  )
}

export default EditProfile
