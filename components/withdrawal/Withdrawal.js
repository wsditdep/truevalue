"use client";

import Breadcrumb from '../breadcrumb/Breadcrumb';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { withdrawal } from '@/app/actions/user/action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useFormStatus } from "react-dom";
import WithdrawalSuccessModal from '../successModal/WithdrawalSuccessModal';
import img from "@/public/assets/withdraw/img.svg"
import Image from 'next/image';
import icon1 from "@/public/assets/auth/icon1.png"
import icon2 from "@/public/assets/auth/icon2.png"
import Card from '../card/Card';

function Submit() {
    const { pending } = useFormStatus();
    return (
        <>
            {
                <button type="submit" disabled={pending} className="primary-btn">{pending ? <>Please Wait<i className="fa fa-circle-notch rotating-spinner"></i></> : "WITHDRAWAL"}</button>
            }
        </>
    )
}

const Withdrawal = ({ user, withdrawalInfo }) => {


    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    const router = useRouter();

    const [isSuccess, setIsSuccess] = useState(false);

    const amounts = [
        { currency: "$", value: "50.00", numericValue: 50 },
        { currency: "$", value: "100.00", numericValue: 100 },
        { currency: "$", value: "300.00", numericValue: 300 },
        { currency: "$", value: "1000.00", numericValue: 1000 },
        { currency: "$", value: "3000.00", numericValue: 3000 },
        { currency: "", value: "Others", numericValue: 0 }
    ];

    const [amountData, setAmountData] = useState(0);
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index, numericValue) => {
        setActiveIndex(index);
        setAmountData(numericValue);
    };

    const handleInputChange = (event) => {
        setAmountData(Number(event.target.value));
        setActiveIndex(null);
    };

    const handleForm = async (formData) => {
        try {
            const response = await withdrawal(formData);

            if (response.status === 201) {
                toast.success(response.message);
                setIsSuccess(true);
                router.refresh();
                return;
            } else {
                toast.error(response.message);
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                isSuccess
                    ?
                    <WithdrawalSuccessModal setIsModal={setIsSuccess} />
                    :
                    <></>
            }
            <Breadcrumb link="/dashboard" title="Withdrawal" authUser={user} activeWithdrawalHistory={true} />

            <section className="withdraw-section">
                <div className="withdraw-wrapper">
                    <div className='withdraw-card'>
                        <div className='card-bg'>
                            <Card user={JSON.parse(JSON.stringify(user))} />
                        </div>
                    </div>

                    {
                        user?.network_type === null
                            ?
                            <>
                                <div className="link-wallet-wrapper">
                                    <div className='link-wallat-parent'>
                                        <div className='link-wallat-child'>
                                            <div className='wallet-img'>
                                                <Image
                                                    src={img}
                                                    alt='img'
                                                    height={100}
                                                    width={100}
                                                    unoptimized
                                                />
                                            </div>
                                            <h1>Your don’t have any wallet yet</h1>
                                            <p>Please link crypto wallet to your account before any withdrawal.</p>
                                        </div>
                                        <div className='link-wallat-child'>
                                            <Link href="/dashboard/withdrawal/linkwallet">
                                                <button className="primary-btn">Link Wallet Now</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <form action={handleForm}>
                                <div className='withdraw-info'>
                                    <div className='info'>
                                        <p>Withdraw To</p>
                                        <p>{user?.network_type}</p>
                                    </div>
                                    <div className='info'>
                                        <p>{user?.wallet_name}, {user?.wallet_phone},</p>
                                        <p>{user?.wallet_address}</p>
                                    </div>
                                </div>
                                <div className="transaction-amount">
                                    <h3>Withdrawal Amount</h3>
                                    <input
                                        type="number"
                                        placeholder="$0.00"
                                        value={amountData === 0 ? "" : amountData}
                                        onChange={handleInputChange}
                                        name="amount"
                                        step="any"
                                        required
                                    />
                                </div>
                                <div className="amount-options">
                                    <div className="amount-option-parent">
                                        {amounts.map((amount, index) => (
                                            <div
                                                className={`amount-option-childs ${activeIndex === index ? 'active-deposit-btn' : ''}`}
                                                key={index}
                                                onClick={() => handleClick(index, amount.numericValue)}
                                            >
                                                <h3>{amount.currency}</h3>
                                                <h3>{amount.value}</h3>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="transaction-amount">
                                    <h3>Withdraw Password</h3>
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="Enter your password here"
                                        name="withdrawal_pin"
                                        required
                                    />
                                    <span onClick={togglePasswordVisibility}>
                                        {passwordVisible
                                            ?
                                            <Image
                                                src={icon1}
                                                alt='img'
                                                height={100}
                                                width={100}
                                                unoptimized
                                            />
                                            :
                                            <Image
                                                src={icon2}
                                                alt='img'
                                                height={100}
                                                width={100}
                                                unoptimized
                                            />
                                        }
                                    </span>
                                </div>
                                <div className='withdraw-btn'>
                                    <Submit />
                                </div>
                            </form>
                    }
                </div>
            </section >
        </>
    )
}

export default Withdrawal