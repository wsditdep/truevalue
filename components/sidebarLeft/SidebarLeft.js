"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import logo1 from "@/public/assets/logo.svg"
import logo2 from "@/public/assets/logo.svg"
import navicon from "@/public/assets/sidebarLeft/navicon.png"
import icon1 from "@/public/assets/sidebarLeft/icon1.svg"
import icon2 from "@/public/assets/sidebarLeft/icon2.svg"
import icon3 from "@/public/assets/sidebarLeft/icon3.svg"
import icon4 from "@/public/assets/sidebarLeft/icon4.svg"
import icon5 from "@/public/assets/sidebarLeft/icon5.svg"
import icon6 from "@/public/assets/sidebarLeft/icon6.svg"
import icon7 from "@/public/assets/sidebarLeft/icon7.svg"





const SidebarLeft = () => {

    const [isLeftNav, setIsLeftNav] = useState(false);

    const links = [
        { href: "/", icon: icon1, label: "Home" },
        { href: "/dashboard/journey", icon: icon2, label: "Design Creation" },
        { href: "/dashboard/history", icon: icon3, label: "Design Progress List" },
        { href: "/dashboard/profile", icon: icon4, label: "Profile" },
    ];

    const financialLinks = [
        { href: "/dashboard/recharge", icon: icon5, label: "Deposit" },
        { href: "/dashboard/withdrawal", icon: icon6, label: "Withdrawal" },
        { href: "/dashboard/withdrawal/linkwallet", icon: icon7, label: "Wallet Info" },
    ];

    return (
        <>
            <div className="nav-bar-child">
                <div className='navbar-img'>
                    <Image
                        src={navicon}
                        alt="icon"
                        height={100}
                        width={100}
                        unoptimized
                        onClick={() => setIsLeftNav(true)}
                    />
                    <Image
                        src={logo1}
                        alt="logo"
                        height={100}
                        width={100}
                        unoptimized
                    />
                </div>
                {
                    isLeftNav ? <div className="sidebar-overlay" onClick={() => setIsLeftNav(false)}></div> : <></>
                }
                {
                    isLeftNav
                        ?
                        <>
                            <div className="sidebar-left-weapper">
                                <div className={isLeftNav ? "sidebar-inner-wrapper leftVal" : "sidebar-inner-wrapper"}>
                                    <div className="sidebar-close-btn">
                                        <div className='sidebar-left-logo'>
                                            <Image
                                                src={logo2}
                                                alt="logo"
                                                height={100}
                                                width={100}
                                                unoptimized
                                            />
                                        </div>
                                        <i onClick={() => setIsLeftNav(false)} className="fa fa-times"></i>
                                    </div>

                                    <>
                                        <div className="lists-wrapper">
                                            {links.map((link, index) => (
                                                <Link href={link.href} key={index}>
                                                    <div className="list">
                                                        <Image src={link.icon} alt="icon" height={100} width={100} unoptimized />
                                                        <p>{link.label}</p>
                                                    </div>
                                                </Link>
                                            ))}

                                            <div className="divider"></div>

                                            {financialLinks.map((link, index) => (
                                                <Link href={link.href} key={index}>
                                                    <div className="list">
                                                        <Image src={link.icon} alt="icon" height={100} width={100} unoptimized />
                                                        <p>{link.label}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </>

                                </div>
                            </div>
                        </>
                        :
                        <></>
                }

            </div>
        </>
    )
}

export default SidebarLeft