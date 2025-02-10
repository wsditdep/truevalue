import Image from 'next/image';
import React from 'react';
import register_success from "@/public/assets/model/register_success.jpeg";
import Link from 'next/link';

const JourneySuccessModal = () => {

    return (
        <Link href="/dashboard/journey">
            <div className="success-modal-wrapper">
                <div className="success-modal-wrapper-inner">
                    <Link href="/dashboard/journey">
                        <div className="close-modal">
                            {/* <i className="fa fa-times"></i> */}
                        </div>
                    </Link>
                    <div className="success-modal-wrapper-image">
                        <Image
                            src={register_success}
                            height={100}
                            width={100}
                            alt="modal"
                            unoptimized
                        />
                    </div>
                    <div className="success-modal-wrapper-content">
                        <h3>SUCCESSFUL</h3>
                        <p>
                            Congratulations! <br />
                            Boosting has been successfully submitted!
                        </p>
                        {/* <Link href="/dashboard/history">
                        <button className="btn global-primary-btn">Check My Record</button>
                    </Link> */}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default JourneySuccessModal