import React from 'react'
import Image from "next/image"
// import membership from "@/public/assets/membership/membership.jpg"
import Breadcrumb from "@/components/breadcrumb/Breadcrumb"


const Membership = () => {
    return (
        <>
            <Breadcrumb title={"Membership"} link="/dashboard" />
            <div className="membership-section">
                <div className="membership-wrapper">
                    <div className="membership-img">
                        {/* <Image
                            src={membership}
                            alt="icon"
                            height={100}
                            width={100}
                            unoptimized
                        /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Membership