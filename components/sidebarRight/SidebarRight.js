"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import ConfirmModal from '../successModal/ConfirmModal';

import human from "@/public/assets/sidebarRight/human.svg"
import logo1 from "@/public/assets/logo.svg"
import icon0 from "@/public/assets/sidebarRight/icon0.svg"
import icon1 from "@/public/assets/sidebarRight/icon1.svg"
import icon2 from "@/public/assets/sidebarRight/icon2.svg"
import icon3 from "@/public/assets/sidebarRight/icon3.svg"
import icon4 from "@/public/assets/sidebarRight/icon4.svg"
import icon5 from "@/public/assets/sidebarRight/icon5.svg"
import icon6 from "@/public/assets/sidebarRight/icon6.svg"
import icon7 from "@/public/assets/sidebarRight/icon7.svg"
import icon8 from "@/public/assets/sidebarRight/icon8.svg"
import icon9 from "@/public/assets/sidebarRight/icon9.svg"
import vip1 from "@/public/assets/sidebarRight/vip1.svg"
import vip2 from "@/public/assets/sidebarRight/vip2.svg"
import vip3 from "@/public/assets/sidebarRight/vip3.svg"
import vip4 from "@/public/assets/sidebarRight/vip4.svg"



const SidebarRight = ({ session, allCommission, userCommission }) => {

    const membershipName = (allCommission || []).map(item => item.membership_name);


    const [isOpen, setIsOpen] = useState(false)
    const [isUpSideDouwnIcon, setIsUpSideDouwnIcon,] = useState(true)

    function toggle() {
        setIsOpen((isOpen) => !isOpen);
    }

    const [isRightNav, setIsRightNav] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);

    const openConfirm = () => {
        setIsConfirm(true);
        setIsRightNav(false);
    }


    const links = [
        { href: "/dashboard/invite", src: icon1, alt: "icon", text: "Invitation Code" },
        { href: "/dashboard/recovery/changePassword", src: icon2, alt: "icon", text: "Security" },
        { href: "/dashboard/content/about", src: icon3, alt: "icon", text: "About Us" },
        { href: "/dashboard/content/faq", src: icon4, alt: "icon", text: "FAQs" },
        { href: "/dashboard/content/tc", src: icon5, alt: "icon", text: "Terms and Conditions" },
        // { href: "/dashboard//content/agent", src: icon6, alt: "icon", text: "Agent" },
        { href: "/dashboard/membership", src: icon7, alt: "icon", text: "Membership Upgrade" },
    ];


    return (
        <>

            {
                isConfirm
                    ?
                    <ConfirmModal setIsModal={setIsConfirm} />
                    :
                    <></>
            }
            <div className="nav-bar-child">
                <div className="profile-icon" onClick={() => setIsRightNav(true)}>
                    <p>Personal</p>
                    <Image
                        src={human}
                        alt="icon"
                        height={100}
                        width={100}
                        unoptimized
                    />
                </div>
                {
                    isRightNav ? <div className="sidebar-overlay" onClick={() => setIsRightNav(false)}></div> : <></>
                }
                {
                    isRightNav
                        ?
                        <>
                            <div className="sidebar-right-weapper">
                                <div className={isRightNav ? "sidebar-inner-wrapper rightVal" : "sidebar-inner-wrapper"}>
                                    <div className="sidebar-close-btn">
                                        <div className='sidebar-left-logo'>
                                            <Image
                                                src={logo1}
                                                alt="logo"
                                                height={100}
                                                width={100}
                                                unoptimized
                                            />
                                        </div>
                                        <i onClick={() => setIsRightNav(false)} className="fa fa-times"></i>
                                    </div>
                                    {
                                        session?.role === "user"
                                            ?
                                            <>
                                                <div className="vip-levels-wrapper">
                                                    <div className="vip-level-parent">

                                                        <div className="level-child">
                                                            {

                                                                allCommission
                                                                    ?.filter((data) => data?.membership_name === session.membership_level) // Filter based on membership name
                                                                    .map((data, index) => (
                                                                        <div className='sub-child' key={index}>
                                                                            <Image
                                                                                src={
                                                                                    data?.membership_name === membershipName[0]

                                                                                        ?
                                                                                        vip1
                                                                                        :
                                                                                        data?.membership_name === membershipName[1]
                                                                                            ?
                                                                                            vip2
                                                                                            :
                                                                                            data?.membership_name === membershipName[2]
                                                                                                ?
                                                                                                vip3
                                                                                                :
                                                                                                vip4


                                                                                }
                                                                                alt="logo"
                                                                                height={100}
                                                                                width={100}
                                                                                unoptimized
                                                                            />
                                                                            <div className="level-desc">
                                                                                <p>{session?.membership_level}</p>
                                                                                <p>{session.membership_level === userCommission ? "unlock" : "lock"}&#183; {(data?.commission_rate * 100)?.toFixed(2)}%</p>
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                            }
                                                            <div className='sub-child' onClick={toggle}>
                                                                {
                                                                    isUpSideDouwnIcon
                                                                        ?
                                                                        <i className="fa-solid fa-angle-down" onClick={() => setIsUpSideDouwnIcon(false)}></i>
                                                                        :
                                                                        <i className="fa-solid fa-angle-up" onClick={() => setIsUpSideDouwnIcon(true)}></i>
                                                                }
                                                            </div>
                                                        </div>
                                                        {
                                                            isOpen &&
                                                            <>
                                                                {

                                                                    allCommission
                                                                        ?.filter((data) => data?.membership_name !== session.membership_level) // Filter based on membership name
                                                                        .map((data, index) => (
                                                                            <div key={index}>
                                                                                <div className="level-child">
                                                                                    <div className='sub-child'>
                                                                                        <Image
                                                                                            src={
                                                                                                data?.membership_name === membershipName[0]
                                                                                                    ?
                                                                                                    vip1
                                                                                                    :
                                                                                                    data?.membership_name === membershipName[1]
                                                                                                        ?
                                                                                                        vip2
                                                                                                        :
                                                                                                        data?.membership_name === membershipName[2]
                                                                                                            ?
                                                                                                            vip3
                                                                                                            :
                                                                                                            vip4


                                                                                            }
                                                                                            alt="logo"
                                                                                            height={100}
                                                                                            width={100}
                                                                                            unoptimized
                                                                                        />
                                                                                        <div className="level-desc">
                                                                                            <p>{data?.membership_name}</p>
                                                                                            <p>{session.membership_level === data?.membership_name ? "unlock" : "lock"}&#183; {(data?.commission_rate * 100)?.toFixed(2)}%</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='sub-child'>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                    <div className="divider"></div>
                                                </div>
                                            </>
                                            :
                                            <></>
                                    }
                                    <div className="functions-wrapper">
                                        <div className='functions-parent'>
                                            <div className='function-category'>
                                                <p>General functions</p>
                                            </div>
                                            {links.map((link, index) => (
                                                <Link key={index} href={link.href}>
                                                    <div className='function'>
                                                        <Image
                                                            src={link.src}
                                                            alt={link.alt}
                                                            height={100}
                                                            width={100}
                                                            unoptimized
                                                        />
                                                        <p>{link.text}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                            <div className='divider'></div>
                                            <Link href={"/dashboard/support"}>
                                                <div className='function'>
                                                    <Image
                                                        src={icon8}
                                                        alt="icon"
                                                        height={100}
                                                        width={100}
                                                        unoptimized
                                                    />
                                                    <p>Support</p>
                                                </div>
                                            </Link>
                                            <Link href={""}>
                                                <div className='function' onClick={(e) => { e.preventDefault(); openConfirm(true); }}>
                                                    <Image
                                                        src={icon9}
                                                        alt="icon"
                                                        height={100}
                                                        width={100}
                                                        unoptimized
                                                    />
                                                    <p>Log out</p>
                                                </div>
                                            </Link>
                                            <div className='user-info-wrapper'>
                                                {/* <div className='divider'></div> */}
                                                <div className='user-info-parent'>
                                                    <div className='user-img'>
                                                        <div className='img-bg'>
                                                            <Image
                                                                src={session?.url === null ? icon0 : session?.url}
                                                                alt="icon"
                                                                height={100}
                                                                width={100}
                                                                unoptimized
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className='user-info'>
                                                        <p>{session?.username}</p>
                                                        <p>Invitation Code: {session?.invitation_code}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                        :
                        <></>
                }

            </div >
        </>
    )
}

export default SidebarRight