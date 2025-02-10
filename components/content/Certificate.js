"use client";

import Breadcrumb from '../breadcrumb/Breadcrumb';
import Image from 'next/image';

const Certificate = () => {

    return (
        <>
            <div className='certificate-section'>
                <Breadcrumb title={"Certificate"} link="/dashboard" />
                <div className='certificate-wrapper'>
                    <div className='certifiacte-parent'>
                        <Image
                            src={""}
                            alt='certificate'
                            height={100}
                            width={100}
                            unoptimized
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Certificate