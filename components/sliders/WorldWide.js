"use client";

import Image from 'next/image'
import React from 'react'
import europeImg from "@/public/travala/images/europeImg.jpg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import northImg from "@/public/travala/images/northAmerica.jpg"
import asiaImg from "@/public/travala/images/asiaImage.jpg"
import centralImg from "@/public/travala/images/centralAmerica.jpg"
import oceaniaImg from "@/public/travala/images/oceaniaImg.jpg"
import southImg from "@/public/travala/images/southAmerica.jpg"
import africaImg from "@/public/travala/images/africaImg.jpg"
import middleImg from "@/public/travala/images/middleEast.jpg"


const WorldWide = () => {

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
            <div className="destination-wrapper">
                <div className="destination-title">
                    <h2>Worldwide Destinations</h2>
                    <p>Explore the best hotels in top destinations</p>
                </div>
                <Slider {...settings}>
                    <div className="destination-details-wrapper">
                        <Image
                            src={europeImg}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="destination-details">
                            <h1>EUROPE</h1>
                            <p>The hub of history & culture</p>
                        </div>
                    </div>
                    <div className="destination-details-wrapper">
                        <Image
                            src={northImg}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="destination-details">
                            <h1>NORTH AMERICA</h1>
                            <p>Land of dreams & diversity</p>
                        </div>
                    </div>
                    <div className="destination-details-wrapper">
                        <Image
                            src={asiaImg}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="destination-details">
                            <h1>ASIA</h1>
                            <p>The pulse of tradition & innovation</p>
                        </div>
                    </div>
                    <div className="destination-details-wrapper">
                        <Image
                            src={centralImg}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="destination-details">
                            <h1>CENTRAL AMERICA</h1>
                            <p>A blend of cultures & nature</p>
                        </div>
                    </div>
                    <div className="destination-details-wrapper">
                        <Image
                            src={oceaniaImg}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="destination-details">
                            <h1>OCEANIA</h1>
                            <p>Islands of paradise & adventure</p>
                        </div>
                    </div>
                    <div className="destination-details-wrapper">
                        <Image
                            src={southImg}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="destination-details">
                            <h1>SOUTH AMERICA</h1>
                            <p>Passionate & untamed</p>
                        </div>
                    </div>
                    <div className="destination-details-wrapper">
                        <Image
                            src={africaImg}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="destination-details">
                            <h1>AFRICA</h1>
                            <p>Rich in heritage & diversity</p>
                        </div>
                    </div>
                    <div className="destination-details-wrapper">
                        <Image
                            src={middleImg}
                            height={100}
                            width={100}
                            alt="white"
                            unoptimized
                        />
                        <div className="destination-details">
                            <h1>MIDDLE EAST</h1>
                            <p>The cradle of ancient civilizations</p>
                        </div>
                    </div>
                </Slider>
            </div>
        </>
    )
}

export default WorldWide