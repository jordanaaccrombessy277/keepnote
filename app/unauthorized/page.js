import Image from 'next/image'
function Unauthorized() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Image src={'/logo.png'} alt="logo" width={101} height={53} />
      <h1 className="text-2xl text-red-600">
        ⚠️⚠️⚠️ Vous n&apos;etes pas autorisé à aller sur cette page ! Faites
        demi-tour et vite ! ⚠️⚠️⚠️
      </h1>
    </div>
  )
}

export default Unauthorized
