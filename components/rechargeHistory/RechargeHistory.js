import React from 'react'
import Breadcrumb from '../breadcrumb/Breadcrumb'
import moment from 'moment';
import 'moment-timezone';
import data_not_found from "@/public/not_found.png";
import Image from 'next/image';

const RechargeHistory = ({ history, authUser }) => {

    return (
        <>
            <Breadcrumb authUser={authUser} title="Deposit History" link="/dashboard/recharge" />
            <section className='transaction-history-section'>
                <div className='history-wrapper'>
                    {
                        history?.length === 0
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
                            history?.map((data, index) => (
                                <div className='withdraw-his' key={index}>
                                    <div className='withdraw-info'>
                                        <div className='info'>
                                            <p>Status: {data?.recharge_type ? data.recharge_type.charAt(0).toUpperCase() + data.recharge_type.slice(1).toLowerCase() : ''}</p>
                                            <p>{moment.tz(data?.createdAt, process.env.NEXT_PUBLIC_TIMWZONE).format('DD MMM YYYY, hh:mm:ss')}</p>
                                            {/* <p>USDC {data?.amount}</p> */}
                                        </div>
                                        <div className='info'>
                                            <p>{data?.username},</p>
                                            <p>has been credited to your account,</p>
                                            <p>{data?.status ? data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase() : ''}</p>
                                            {/* <p></p> */}
                                            <p>$ {(data?.amount)?.toFixed(2)}</p>                                        </div>
                                    </div>
                                </div>
                            )).reverse()
                    }
                </div >
            </section >
        </>
    )
}

export default RechargeHistory