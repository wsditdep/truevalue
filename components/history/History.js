"use client";

import moment from 'moment';
import 'moment-timezone';
import Image from "next/image";
import { useEffect, useState } from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import data_not_found from "@/public/not_found.png";
import Link from "next/link";

const History = ({ data, membership, authUser }) => {

    const [allProducts, setAllProducts] = useState(data || []);
    const [statusType, setStatusType] = useState("all");


    const handleFilter = (filterType) => {
        if (filterType === "all") {
            setAllProducts(data)
            setStatusType("all");
        } else if (filterType === "pending") {
            const pendingProducts = data?.filter(product => product.status === "pending");
            setAllProducts(pendingProducts);
            setStatusType("pending");
        } else if (filterType === "completed") {
            const completedProducts = data?.filter(product => product.status === "completed");
            setAllProducts(completedProducts);
            setStatusType("completed");
        } else if (filterType === "freezed") {
            const completedProducts = data?.filter(product => product.status === "freezed");
            setAllProducts(completedProducts);
            setStatusType("freezed");
        }
    }

    useEffect(() => {
        setAllProducts(data);
    }, []);

    return (
        <>
            <Breadcrumb authUser={authUser} title="Design Progress List" link="/dashboard" />
            <div className="history-section-wrapper">
                <div className="history-filter">
                    <ul>
                        <li><button onClick={() => handleFilter("all")} className={statusType === "all" ? "history-active" : ""}>All</button></li>
                        <li><button onClick={() => handleFilter("pending")} className={statusType === "pending" ? "history-active" : ""}>Pending</button></li>
                        <li><button onClick={() => handleFilter("completed")} className={statusType === "completed" ? "history-active" : ""}>Completed</button></li>
                        <li><button onClick={() => handleFilter("freezed")} className={statusType === "freezed" ? "history-active" : ""}>On Hold</button></li>
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
                            <div className="history-parent" key={index}>
                                <div className="history-child">
                                    <div className="product-status-date">
                                        <p>Status: <span>{data?.status ?? ""}</span></p>
                                        <p>{moment.tz(data?.createdAt, process.env.NEXT_PUBLIC_TIMWZONE).format('D MMM YYYY, hh:mm:ss')}</p>
                                    </div>
                                    <div className="divider"></div>
                                    <div className="product-img-container">
                                        <div className="pruduct-img">
                                            {
                                                data && data.url && (
                                                    <Image
                                                        src={data.url}
                                                        height={100}
                                                        width={100}
                                                        alt="product"
                                                        unoptimized
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <p>{data?.productName}</p>
                                    </div>
                                </div>
                                <div className="history-child">
                                    <div className="product-info">
                                        <p>Commissions</p>
                                        {/* <p>Booking Value</p> */}
                                        <p>Price</p>

                                    </div>
                                    <div className="product-info">

                                        {
                                            data?.isJourneyProduct
                                                ?
                                                <p>$ {(data?.productPrice * membership?.ticket_commission)?.toFixed(2)}</p>
                                                :
                                                <p>$ {(data?.productPrice * membership?.commission_rate)?.toFixed(2)}</p>

                                        }
                                        {/* {
                                            data?.isJourneyProduct
                                                ?
                                                <p>$ {(data?.productPrice + (data?.productPrice * membership?.ticket_commission)).toFixed(2)}</p>
                                                :
                                                <p>$ {(data?.productPrice + (data?.productPrice * membership?.commission_rate)).toFixed(2)}</p>

                                        } */}
                                        <p>$ {data?.productPrice?.toFixed(2)}</p>

                                    </div>
                                </div>
                                <div className="history-child">
                                    {
                                        data?.status === "pending"
                                            ?
                                            <Link href="/dashboard/journey/submitJourney">
                                                <button className="primary-btn">Submit</button>
                                            </Link>
                                            :
                                            <></>
                                    }

                                </div>
                            </div>
                        ))
                }
            </div>
        </>
    )
}

export default History
