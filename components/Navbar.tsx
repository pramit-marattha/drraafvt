import { useEffect, useState } from 'react'
import Link from 'next/link'
import DarkModeToggle from './DarkModeToggle'

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <>
      <header className="mx-auto flex max-w-7xl justify-between p-5">
        <div className="flex items-center space-x-10">
          <Link href="/">
            <img
              className="w-44 cursor-pointer object-contain"
              src="https://user-images.githubusercontent.com/37651620/153719941-9a1dc136-8cc6-4823-8096-548d4a203b45.png"
              alt="Drraafvt Logo"
            />
          </Link>
          <div className="item-center hidden space-x-7 md:inline-flex"></div>
        </div>
        <div className="flex items-center space-x-5">
          <h3 className="rounded-full bg-teal-500 px-5 py-1 text-white">
            Hello !
          </h3>
          <DarkModeToggle />
        </div>
      </header>
    </>
  )
}

export default Navbar
