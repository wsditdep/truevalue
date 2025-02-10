import Image from 'next/image';
import React from 'react';
import register_success from "@/public/assets/model/register_fail.jpeg";

const SignInFailModal = ({ setIsModal }) => {
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
                    <h3>Invalid username or password</h3>
                    <p>
                        Please enter the correct username/password
                    </p>
                    <button className="primary-btn" onClick={() => setIsModal(false)}>Try Again</button>
                </div>
            </div>
        </div>
    )
}

export default SignInFailModal