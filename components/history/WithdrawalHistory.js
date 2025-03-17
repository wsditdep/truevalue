"use client";

import React, { useState } from 'react'
import Breadcrumb from '../breadcrumb/Breadcrumb'
import moment from 'moment';
import 'moment-timezone';
import data_not_found from "@/public/not_found.png";
import Image from 'next/image';

const WithdrawalHistory = ({ withdrawal, authUser }) => {

    const [allProducts, setAllProducts] = useState(withdrawal || []);
    const [statusType, setStatusType] = useState("all");


    const handleFilter = (filterType) => {
        if (filterType === "all") {
            setAllProducts(withdrawal)
            setStatusType("all");
        } else if (filterType === "pending") {
            const pendingProducts = withdrawal?.filter(product => product.status === "pending");
            setAllProducts(pendingProducts);
            setStatusType("pending");
        } else if (filterType === "completed") {
            const completedProducts = withdrawal?.filter(product => product.status === "approved");
            setAllProducts(completedProducts);
            setStatusType("completed");
        } else if (filterType === "freezed") {
            const completedProducts = withdrawal?.filter(product => product.status === "freezed");
            setAllProducts(completedProducts);
            setStatusType("freezed");
        }
    }

    return (
        <>
            <Breadcrumb authUser={authUser} title="Withdraw History" link="/dashboard/withdrawal" />
            <section className='transaction-history-section'>
                <div className='history-wrapper'>
                    <div className="history-filter">
                        <ul>
                            <li><button onClick={() => handleFilter("all")} className={statusType === "all" ? "history-active" : ""}>All</button></li>
                            <li><button onClick={() => handleFilter("pending")} className={statusType === "pending" ? "history-active" : ""}>Pending</button></li>
                            <li><button onClick={() => handleFilter("completed")} className={statusType === "completed" ? "history-active" : ""}>Completed</button></li>
                            <li><button onClick={() => handleFilter("freezed")} className={statusType === "freezed" ? "history-active" : ""}>Freezed</button></li>
                        </ul>
                    </div >


                    {
                        allProducts?.length === 0
                            ?
                            <div className="data-not-found">
                                <Image
                                    src={data_not_found}
                                    height={100}
                                    width={100}
                                    alt="logo"
                                    unoptimized
                                />
                            </div>
                            :
                            allProducts?.map((data, index) => (
                                <div className='withdraw-his' key={index}>
                                    <div className='withdraw-info'>
                                        <div className='info'>
                                            <p>Status: {data?.status ? data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase() : ''}</p>
                                            <p>{moment.tz(data?.createdAt, process.env.NEXT_PUBLIC_TIMWZONE).format('DD MMM YYYY, hh:mm:ss')}</p>
                                        </div>
                                        <div className='info'>
                                            <p>Transfer to wallet</p>
                                            <p>{data?.username}, {data?.phone_number},</p>
                                            <p>{data?.wallet_address},</p>
                                            <p>$ {(data?.withdrawal_amount)?.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            )).reverse()
                    }
                </div>
            </section >
        </>
    )
}

export default WithdrawalHistory