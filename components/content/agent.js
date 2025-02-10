"use client";

import React, { useEffect, useState } from 'react'
import Breadcrumb from '../breadcrumb/Breadcrumb';

const Agent = ({ data }) => {
    const [info, setInfo] = useState({});

    useEffect(() => {
        const infoData = data?.filter(item => item.title === "agent")[0];
        setInfo(infoData);
    }, []);
    return (
        <>
            <Breadcrumb title={"Agent"} link="/dashboard" />
            <div className='agent-page-wrapper'>
                <div className='agent-details-wrapper'>
                    <div className='agent-descriptions-wrapper'>
                        <div dangerouslySetInnerHTML={{ __html: info?.description }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Agent