import Image from 'next/image'
import React from 'react';
import logo from "@/public/assets/logo.png"

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <Image
        src={logo}
        alt="logo"
        height={100}
        width={100}
        unoptimized
      />
    </div>
  )
}

export default Loader