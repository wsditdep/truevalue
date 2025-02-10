"use client";

import Breadcrumb from '../breadcrumb/Breadcrumb';
import Link from 'next/link';
import { useState } from 'react';
import Card from '../card/Card';


const Recharge = ({ user }) => {
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

    return (
        <>
            <Breadcrumb link="/dashboard" title="Deposit" activeRechargeHistory={true} />
            <section className='recharge-section'>
                <div className='recharge-wrapper'>
                    <div className='withdraw-card'>
                        <div className='card-bg'>
                            <Card user={JSON.parse(JSON.stringify(user))} />
                        </div>
                    </div>
                    <form >
                        <div className="transaction-amount">
                            <h3>Deposit Amount</h3>
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
                        <div className='submit-btn'>
                            <Link href={""}>
                                <button className='primary-btn'>Deposit</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Recharge;
