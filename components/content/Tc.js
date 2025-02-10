"use client";

import React, { useEffect, useState } from 'react'
import Breadcrumb from '../breadcrumb/Breadcrumb';

const Tc = ({ data }) => {
    const [info, setInfo] = useState({});

    useEffect(() => {
        const infoData = data?.filter(item => item.title === "tc")[0];
        setInfo(infoData);
    }, []);
    return (
        <>
            <Breadcrumb title={"T&C"} link="/dashboard" />
            <div className='term-condition-page-wrapper'>
                <div className='tAndc-details-wrapper'>
                    <div className='tAndc-description-wrapper'>
                        <div dangerouslySetInnerHTML={{ __html: info?.description }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tc