import Image from 'next/image';
import React from 'react';
import register_success from "@/public/assets/model/register_fail.jpeg";

const SignUpFailModal = ({ setIsModal }) => {
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
                    <h3>REGISTRATION FAILED</h3>
                    <p>
                        Hmm... something went wrong... <br />
                        Please try again later.
                    </p>
                    <button className="primary-btn" onClick={() => setIsModal(false)}>Try Again</button>
                </div>
            </div>
        </div>
    )
}

export default SignUpFailModal