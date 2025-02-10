import Image from 'next/image';
import React from 'react';
import register_success from "@/public/assets/model/register_success.jpeg";
import Link from 'next/link';

const SignUpSuccessModal = ({ setIsModal }) => {
    return (
        <div className="success-modal-wrapper">
            <div className="success-modal-wrapper-inner">
                <div className="close-modal" onClick={() => setIsModal(false)}>
                    <i className="fa fa-times"></i>
                </div>
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
                    <h3>WELCOME ON BOARD!</h3>
                    <p>
                        Congratulations! <br />
                        Your account has been created
                    </p>
                    <Link href="/signin">
                        <button className="primary-btn">LOGIN NOW</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpSuccessModal