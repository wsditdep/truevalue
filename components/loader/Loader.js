import Image from 'next/image'
import React from 'react';
import icon1 from "@/public/assets/profile/icon1.svg"

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <Image
        src={icon1}
        alt="logo"
        height={100}
        width={100}
        unoptimized
      />
    </div>
  )
}

export default Loader