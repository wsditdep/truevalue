"use client";

import Image from 'next/image'
import React from 'react'
import europeImg from "@/public/travala/images/europeImg.jpg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Review = () => {

    const settings = {
        dots: false,  // Enables navigation dots at the bottom
        infinite: false, // Enables infinite scrolling
        speed: 500,  // Transition speed in milliseconds
        slidesToShow: 1.2,  // Number of cards to show at a time
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
            <div className='our-review-wrapper'>
                <div className="review-title">
                    <h2>Our Reviews</h2>
                </div>
                <Slider {...settings}>
                    <div className="reviews-wrapper">
                        <div className="review-details">
                            <ul className="review-parent">
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                            </ul>
                            <div className="review-comment">
                                <h3>Sharna was at it</h3>
                                <p>Sharna was at it, again like always. <br />
                                    Great customer services.</p>
                                <h5>Abdulai Sulaiman<span>, 7 hours ago</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="reviews-wrapper">
                        <div className="review-details">
                            <ul className="review-parent">
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                            </ul>
                            <div className="review-comment">
                                <h3>Amazing booking app</h3>
                                <p>Amazing booking app. <br />
                                    Great support team. <br />
                                    Book with confidence at Travala.</p>
                                <h5>Michael Bailey<span>, 22 hours ago</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="reviews-wrapper">
                        <div className="review-details">
                            <ul className="review-parent">
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                            </ul>
                            <div className="review-comment">
                                <h3>Georgie is the GOAT</h3>
                                <p>Georgia from the support is GOAT, <br />
                                    excellent service!</p>
                                <h5>Anonymous<span>, 5 days ago</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="reviews-wrapper">
                        <div className="review-details">
                            <ul className="review-parent">
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                            </ul>
                            <div className="review-comment">
                                <h3>Good platform</h3>
                                <p>Good platform, helping stuff. <br />
                                    They try everything to solve any problems <br />
                                    and make clients happy!</p>
                                <h5>Abdulai Sulaiman<span>, 7 hours ago</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="reviews-wrapper">
                        <div className="review-details">
                            <ul className="review-parent">
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                            </ul>
                            <div className="review-comment">
                                <h3>Great App</h3>
                                <p>Great app, good prices and quick response <br />
                                    in customer service</p>
                                <h5>Gonzola Nicolas Olivia<span>, 5 days ago</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="reviews-wrapper">
                        <div className="review-details">
                            <ul className="review-parent">
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                                <li className="review-child"><i className="fa fa-star"></i></li>
                            </ul>
                            <div className="review-comment">
                                <h3>Seamless</h3>
                                <p>Everything worked seamlessly and
                                    provided the best price possible.
                                    No issues!</p>
                                <h5>Anonymous<span>, 6days ago</span></h5>
                            </div>
                        </div>
                    </div>


                </Slider>
            </div>
        </>
    )
}

export default Review;