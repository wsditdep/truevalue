import Image from 'next/image';
import React from 'react';
import Breadcrumb from '../breadcrumb/Breadcrumb';

const Notification = () => {
    return (
        <>
            <Breadcrumb title="Notice" link="/dashboard" />
            <div className="notification-image">
                <Image
                    src={notification}
                    alt="all"
                    height={100}
                    width={100}
                    unoptimized
                />
            </div>
        </>
    )
}

export default Notification