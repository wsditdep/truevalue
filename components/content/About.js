"use client";

import React, { useEffect, useState } from 'react'
import Breadcrumb from '../breadcrumb/Breadcrumb'

const About = ({ data }) => {
    const [info, setInfo] = useState({});

    useEffect(() => {
        const infoData = data?.filter(item => item.title === "about")[0];
        setInfo(infoData);
    }, []);
    return (
        <>
            <Breadcrumb title={"About Us"} link="/dashboard" />
            <div className='about-us-page-wrapper'>
                <div className='about-page-details-wrapper'>
                    <section className="content-section">
                        <div dangerouslySetInnerHTML={{ __html: info?.description }}></div>
                    </section>
                </div>
            </div>

        </>
    )
}

export default About