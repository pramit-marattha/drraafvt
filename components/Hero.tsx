import React from 'react'

const Hero = () => {
  return (
    <div className="flex items-center justify-between rounded-md border-y border-solid border-teal-800 bg-teal-400 py-10 hover:border-dotted lg:py-0">
      <div className="space-y-5 px-10">
        <h1 className="mx-w-xl font-serif text-4xl text-teal-900 md:text-7xl">
          <span className="text-teal-100 underline decoration-teal-100 hover:no-underline">
            Drraafvt
          </span>{' '}
          a portal for writers,creators and developers
        </h1>
        <h2 className="font-serif text-teal-900">
          It's simple and free to share your thoughts and opinions on any issue
          related to any technology in general.
        </h2>
      </div>
      <img
        className="hidden h-32 rotate-90 md:inline-flex lg:h-full"
        src="https://user-images.githubusercontent.com/37651620/153721800-355ef679-07a9-47fc-a0ff-00264c6bfb05.png"
        alt="man falling logo"
      />
    </div>
  )
}

export default Hero
