"use client"

import Breadcrumb from '../breadcrumb/Breadcrumb';
import Image from 'next/image';

import img1 from "@/public/assets/support/img1.svg"
import Link from 'next/link';

const Support = ({ setting, authUser, isLink, support }) => {

    const handleAddFundsClick = () => {
        if (window.LC_API && typeof window.LC_API.open_chat_window === 'function') {
            window.LC_API.open_chat_window();
        } else {
            console.error("Live Chat widget not initialized or method not found.");
        }
    };

    return (
        <>
            <Breadcrumb authUser={authUser} title="Support" link="/dashboard" />
            <section className='support-section'>
                <div className='support-section-wrapper'>
                    <div className='support-parent'>
                        <Image
                            src={img1}
                            height={100}
                            width={100}
                            alt="img"
                            unoptimized
                        />
                    </div>
                    <div className='support-parent'>
                        <div className='support-child'>
                            <p>Any questions?</p>
                            <p>Contact us through Telegram or Live Chat</p>
                        </div>
                        <div className='support-child'>
                            <button className='primary-btn' onClick={() => handleAddFundsClick()}>Direct to Customer Service</button>
                        </div>
                        {/* <Link target="_blank" href={support?.link ?? ""}>
                            <button className='support-btn'>Contact us with Telegram</button>
                        </Link> */}
                        <div className='support-child'>
                            <p>Agency Service Time: <b>{support?.work_time ?? ""}</b></p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Support