import Image from 'next/image';
import React from 'react';
import register_success from "@/public/assets/model/register_success.jpeg";
import Link from 'next/link';

const WithdrawalSuccessModal = ({ setIsModal }) => {

    return (
        <div className="success-modal-wrapper" onClick={() => setIsModal(false)}>
            <div className="success-modal-wrapper-inner">
                <Link href="/dashboard">
                    <div className="close-modal">
                        <i className="fa fa-times"></i>
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
                        Your withdrawal is on its way. <br />
                        Check your account soon!
                    </p>
                    <Link href="/dashboard/withdrawalHistory">
                        <button className="primary-btn">Check My History</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default WithdrawalSuccessModal