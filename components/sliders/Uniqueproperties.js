"use client";

import Image from 'next/image'
import React from 'react'
import hotelImg from "@/public/travala/images/hotelImg.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import propertyImg from "@/public/travala/images/propertyImg.jpg"
import chaletImg from "@/public/travala/images/chaletImg.jpg"
import cottageImg from "@/public/travala/images/cottageImg.jpg"
import hostelImg from "@/public/travala/images/hostelImg.jpg"
import ranchImg from "@/public/travala/images/ranchImg.jpg"
import villaImg from "@/public/travala/images/villaImg.png"
import lodgeImg from "@/public/travala/images/lodgeImg.jpg"
import apartmentImg from "@/public/travala/images/apartmentImg.jpg"


const UniqueProperties = () => {

    const settings = {
        dots: false,  // Enables navigation dots at the bottom
        infinite: false, // Enables infinite scrolling
        speed: 500,  // Transition speed in milliseconds
        slidesToShow: 2,  // Number of cards to show at a time
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
            <div className="properties-wrapper">
                <div className="property-title">
                    <h2>Top Unique Properties </h2>
                    <p>The most distinctive places to stay on Travala</p>
                </div>
                <Slider {...settings}>
                    <div className="property-img-parent">
                        <div className="property-img-child">
                            <Image
                                src={hotelImg}
                                height={100}
                                width={100}
                                alt="white"
                                unoptimized
                            />
                            <div className="img-title">
                                <h3>Hotel</h3>
                            </div>
                        </div>
                    </div>
                    <div className="property-img-parent">
                        <div className="property-img-child">
                            <Image
                                src={propertyImg}
                                height={100}
                                width={100}
                                alt="white"
                                unoptimized
                            />
                            <div className="img-title">
                                <h3>Unique <br />
                                    Property</h3>
                            </div>
                        </div>
                    </div>
                    <div className="property-img-parent">
                        <div className="property-img-child">
                            <Image
                                src={chaletImg}
                                height={100}
                                width={100}
                                alt="white"
                                unoptimized
                            />
                            <div className="img-title">
                                <h3>Chalet</h3>
                            </div>
                        </div>
                    </div>
                    <div className="property-img-parent">
                        <div className="property-img-child">
                            <Image
                                src={cottageImg}
                                height={100}
                                width={100}
                                alt="white"
                                unoptimized
                            />
                            <div className="img-title">
                                <h3 style={{
                                    color: "black"
                                }}>
                                    Cottage</h3>
                            </div>
                        </div>
                    </div>
                    <div className="property-img-parent">
                        <div className="property-img-child">
                            <Image
                                src={hostelImg}
                                height={100}
                                width={100}
                                alt="white"
                                unoptimized
                            />
                            <div className="img-title">
                                <h3>Hostel <br/>
                                & Backpacker</h3>
                            </div>
                        </div>
                    </div>
                    <div className="property-img-parent">
                        <div className="property-img-child">
                            <Image
                                src={ranchImg}
                                height={100}
                                width={100}
                                alt="white"
                                unoptimized
                            />
                            <div className="img-title">
                                <h3>Ranch</h3>
                            </div>
                        </div>
                    </div>
                    <div className="property-img-parent">
                        <div className="property-img-child">
                            <Image
                                src={villaImg}
                                height={100}
                                width={100}
                                alt="white"
                                unoptimized
                            />
                            <div className="img-title">
                                <h3>Villa</h3>
                            </div>
                        </div>
                    </div>
                    <div className="property-img-parent">
                        <div className="property-img-child">
                            <Image
                                src={lodgeImg}
                                height={100}
                                width={100}
                                alt="white"
                                unoptimized
                            />
                            <div className="img-title">
                                <h3>Lodge</h3>
                            </div>
                        </div>
                    </div>
                    <div className="property-img-parent">
                        <div className="property-img-child">
                            <Image
                                src={apartmentImg}
                                height={100}
                                width={100}
                                alt="white"
                                unoptimized
                            />
                            <div className="img-title">
                                <h3>Apartment</h3>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default UniqueProperties;