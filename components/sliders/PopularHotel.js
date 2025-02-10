"use client";

import Image from 'next/image'
import React from 'react'
import shangrilaaImg from "@/public/travala/images/shangrilaaImg.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import istanbulImg from "@/public/travala/images/istanbulImg.jpg"
import amsterHotel from "@/public/travala/images/amsterHotel.jpg"
import barceHotel from "@/public/travala/images/barceHotel.jpg"
import parisHotel from "@/public/travala/images/parisHotel.jpg"
import lisboaHotel from "@/public/travala/images/lisboaHotel.jpg"

const PopularHotel = () => {

    const settings = {
        dots: false,  // Enables navigation dots at the bottom
        infinite: false, // Enables infinite scrolling
        speed: 500,  // Transition speed in milliseconds
        slidesToShow: 1,  // Number of cards to show at a time
        slidesToScroll: 1,  // Number of cards to scroll at a time
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    return (
        <>
            <div className="popular-wrapper">
                <div className="find-hotel-title">
                    <h2>Popular Hotels</h2>
                    <p>Find the top places to stay and experience on Travala</p>
                </div>
                <Slider {...settings}>
                    <div className="hotel-details-wrapper">
                        <Image
                            src={shangrilaaImg}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="hotel-details-and-rating-wrapper">
                            <h2>SHANGRI-LA <br />
                                THE SHARD</h2>
                            <ul className="rating-parent">
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                            </ul>
                            <div className="hotel-details-parent">
                                <div className="hotel-details-child">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="hotel-details-child">
                                    <p>London, GB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hotel-details-wrapper">
                        <Image
                            src={istanbulImg}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="hotel-details-and-rating-wrapper">
                            <h2>HILTON ISTANBUL <br />
                                BOMONTI HOTEL</h2>
                            <ul className="rating-parent">
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                            </ul>
                            <div className="hotel-details-parent">
                                <div className="hotel-details-child">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="hotel-details-child">
                                    <p>Istanbul, TR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hotel-details-wrapper">
                        <Image
                            src={amsterHotel}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="hotel-details-and-rating-wrapper">
                            <h2>AMSTERDAM <br />
                                MARRIOT HOTEL</h2>
                            <ul className="rating-parent">
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                            </ul>
                            <div className="hotel-details-parent">
                                <div className="hotel-details-child">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="hotel-details-child">
                                    <p>Amsterdam, NL</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hotel-details-wrapper">
                        <Image
                            src={barceHotel}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="hotel-details-and-rating-wrapper">
                            <h2>W HOTEL <br />
                                BARCELONA</h2>
                            <ul className="rating-parent">
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                            </ul>
                            <div className="hotel-details-parent">
                                <div className="hotel-details-child">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="hotel-details-child">
                                    <p>Barcelona, ES</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hotel-details-wrapper">
                        <Image
                            src={parisHotel}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="hotel-details-and-rating-wrapper">
                            <h2>PULLMAN <br />
                                PARIS TOUR EIFFEL</h2>
                            <ul className="rating-parent">
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                            </ul>
                            <div className="hotel-details-parent">
                                <div className="hotel-details-child">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="hotel-details-child">
                                    <p>Paris, FR</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hotel-details-wrapper">
                        <Image
                            src={lisboaHotel}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="hotel-details-and-rating-wrapper">
                            <h2>TIVOLI AVENIDA <br />
                                LIBERADE LISBOA</h2>
                            <ul className="rating-parent">
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                                <li className="rating-child"><i className="fa fa-star"></i></li>
                            </ul>
                            <div className="hotel-details-parent">
                                <div className="hotel-details-child">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div className="hotel-details-child">
                                    <p>Lisbon, PT</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default PopularHotel;