"use client";

import { useEffect, useState } from "react";
import icon1 from "@/public/assets/journey/icon1.svg";
import Image from "next/image";


const CirclerBar = ({ user }) => {
    const [floatNumber, setPercentage] = useState(0);

    useEffect(() => {
        if (user && user.daily_available_order > 0) {
            const totalAvailableOrder = user.daily_available_order;
            const todayCompletedOrder = user.today_order;
            setPercentage(Math.round((100 / totalAvailableOrder) * todayCompletedOrder));
        } else {
            setPercentage(0);
        }
    }, [user]);

    const percentage = Math.floor(floatNumber);

    return (
        <>
            <div className='percentage'>
                <div className='percentage-text'>
                    <p>{percentage}% completed</p>
                    <p>
                        <Image
                            src={icon1}
                            height={100}
                            width={100}
                            alt="bgimg"
                            unoptimized
                        />
                        {user.today_order}/{user.daily_available_order} Completed
                    </p>
                </div>
                <div className='percentage-bar'>
                    <div style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        </>
    );
};

export default CirclerBar;
