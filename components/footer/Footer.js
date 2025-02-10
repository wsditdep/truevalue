import React from 'react'
import Image from 'next/image'
import Logo from "@/public/travala_assets/logo/travela_white_logo.png"


const Footer = () => {
    return (
        <>
            <div className='footer-wrapper'>
                <div className='travala-logo'>
                    <Image
                        src={Logo}
                        alt="white"
                        unoptimized
                    />
                    <h4>Simplify your travel bookings</h4>
                </div>
                <ul className="social-media-parent">
                    <li className="social-media-child"><i className="fab fa-twitter"></i></li>
                    <li className="social-media-child"><i className="fab fa-facebook"></i></li>
                    <li className="social-media-child"><i className="fab fa-telegram"></i></li>
                    <li className="social-media-child"><i className="fab fa-instagram"></i></li>
                    <li className="social-media-child"><i className="fab fa-reddit"></i></li>
                    <li className="social-media-child"><i className="fab fa-linkedin"></i></li>
                    <li className="social-media-child"><i className="fab fa-discord"></i></li>
                </ul>
                <div className='copyright'>
                    <p>© Copyright 2017 - 2024. Travala.com</p>
                </div>
            </div>
        </>
    )
}

export default Footer
