import Link from 'next/link'
import Image from 'next/image'

import React from 'react'

const FourOhFour = () => {
  return (
    <div className=" ">
      <div className="grid grid-cols-2 h-screen justify-center items-center">
        <div className="flex flex-col items-center max-w-[70%] m-auto ">
          <h1 className="font-extrabold text-5xl text-VeryDarkBlueL">
            It's empty here
          </h1>
          <p className="text-DarkGrayL font-light my-6">
            Looks like this page can't be found. Maybe it was moved or removed
          </p>
          <Link
            href="/"
            className="py-3 px-6 border-VeryDarkBlueL border-solid border-2 font-bold tracking-wide hover:bg-[#eee] hover:ease-in hover:duration-200 uppercase mt-5"
          >
            Back to homepage
          </Link>
        </div>
        <div>
          <Image
            src="/4.png"
            alt="error image"
            className="w-[500px] "
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  )
}

export default FourOhFour
