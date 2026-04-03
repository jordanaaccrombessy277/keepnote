function WelcomeEmailTemplate({ firstname }) {
  return (
    <div className="p-4 bg-amber-700 text-white">
      Welcome on KeepNote ! Hello my friend {firstname}, I&apos;m glad to see
      you using KeepNote. Have fun !
    </div>
  )
}

export default WelcomeEmailTemplate
