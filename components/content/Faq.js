"use client";

import React, { useEffect, useState } from 'react'
import Breadcrumb from '../breadcrumb/Breadcrumb';

const Faq = ({ data }) => {
    const [info, setInfo] = useState({});

    useEffect(() => {
        const infoData = data?.filter(item => item.title === "faqs")[0];
        setInfo(infoData);
    }, []);
    return (
        <>
            <Breadcrumb title={"FAQs"} link="/dashboard" />
            <div className='faq-page-wrapper'>
                <div className='faq-details-wrapper'>
                    <div className='faq-descriptions-wrapper'>
                        <div dangerouslySetInnerHTML={{ __html: info?.description }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Faq