import Image from 'next/image';
import React from 'react';
import register_success from "@/public/assets/model/register_success.jpeg";
import Link from 'next/link';

const SpinnSuccess = ({ amount }) => {
    return (
        <div className="success-modal-wrapper">
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

                    {
                        amount === "Try Again"
                            ?
                            <>
                                <h3>Sorry!</h3>
                                <p>
                                    Please try agin Later <br />
                                    Better luck next time!
                                </p>
                            </>
                            :
                            amount === "0"
                                ?
                                <>
                                    <h3>Sorry!</h3>
                                    <p>
                                        Please try agin Later <br />
                                        Better luck next time!
                                    </p>
                                </>
                                :
                                <>
                                    <h3>Congratulations</h3>
                                    <p>
                                        You Win ${amount}! <br />
                                        ${amount} has been creaded to your account!
                                    </p>
                                </>
                    }
                    <Link href="/dashboard">
                        <button className="primary-btn">BACK</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SpinnSuccess