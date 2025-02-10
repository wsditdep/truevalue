import Image from 'next/image';
import React from 'react';
import journey_fail from "@/public/assets/model/journey_fail.jpeg";

const InsufficientBalance = ({ setIsModal }) => {

    return (
        <div className="success-modal-wrapper">
            <div className="success-modal-wrapper-inner">
                <div className="close-modal" onClick={() => setIsModal(false)}>
                    <i className="fa fa-times"></i>
                </div>
                <div className="success-modal-wrapper-image">
                    <Image
                        src={journey_fail}
                        height={100}
                        width={100}
                        alt="modal"
                        unoptimized
                    />
                </div>
                <div className="success-modal-wrapper-content">
                    <h3>Sorry</h3>
                    <p>You have insufficient balance!</p>
                    {/* <Link href="/dashboard/recharge">
                        <button className="btn global-primary-btn">Try Again</button>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default InsufficientBalance;