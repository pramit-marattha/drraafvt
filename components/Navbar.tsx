import Link from 'next/link'

function Navbar() {
  return (
    <>
      <header>
        <div>
          <Link href="/">
            <img
              className="w-44 cursor-pointer object-contain"
              src="https://user-images.githubusercontent.com/37651620/153719941-9a1dc136-8cc6-4823-8096-548d4a203b45.png"
              alt="Drraafvt Logo"
            />
          </Link>
        </div>
        <div></div>
      </header>
    </>
  )
}

export default Navbar
