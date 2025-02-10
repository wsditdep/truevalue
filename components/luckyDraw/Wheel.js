"use client";

import React, { useEffect, useState } from 'react'
import WheelComponent from './WheelComponent';
import { updateLuckyDraw } from '@/app/actions/user/action';
import { useRouter } from 'next/navigation';
import SpinnSuccess from '../successModal/SpinnSuccess';
import toast from 'react-hot-toast';
import Breadcrumb from '../breadcrumb/Breadcrumb';

const Wheel = ({ authenticatedUser }) => {

    const router = useRouter();

    const [isSuccess, setIsSuccess] = useState(false);
    const [isProcess, setIsProcess] = useState(true);

    const initialWinner = authenticatedUser?.winning_amount === undefined || authenticatedUser?.winning_amount?.length === 0 || authenticatedUser?.number_of_draws === null
        ? 'Try Again' 
        : String(authenticatedUser?.winning_amount[authenticatedUser?.used_number_of_draws]);

    const [winner, setWinner] = useState(initialWinner);

    const segments = [
        '500',
        '10',
        'Try Again',
        '5',
        '20',
        '80',
        '0',
        '100',
        '300',
    ];

    const segColors = [
        "red",
        "pink",
        "#c7bd00",
        "#007d60",
        "green",
        "orange",
        "gray",
        "#0008a6",
        "#d9003d",
    ];
    const onFinished = async (winner) => {

        setIsProcess(false);

        const res = await updateLuckyDraw(winner)

        if (res?.status === 201) {
            router.refresh();
            setIsSuccess(true);
        } else {
            setIsSuccess(false);
            console.log("Error!")
        }

    };

    // const spinFunc = () => {

    //     if (authenticatedUser?.winning_amount?.length !== 0) {
    //         setWinner(authenticatedUser?.winning_amount[authenticatedUser?.used_number_of_draws ?? 0]);
    //     } else {
    //         const randomIndexFromSpecific = specificIndices[Math.floor(Math.random() * specificIndices.length)];
    //         setWinner(segments[randomIndexFromSpecific]);
    //     }
    // }

    return (
        <>
            <div className="wavey-breadcrumb">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 375 148"
                    className="wavey-svg"
                >
                    <path
                        fill="#1F2F5C"
                        d="M0 129.398s21.361 19.633 71.25 18.559a153.632 153.632 0 0053.667-10.656c13.889-5.507 25.833-13.905 40.139-18.228 31.895-9.2 66.168-5.486 95.305 10.325 66.334 34.861 114.639 0 114.639 0V0H0v129.398z"
                    ></path>
                </svg>
                <Breadcrumb authUser={authenticatedUser} title="Rewards" link="/dashboard" />
            </div>
            <div className="spinner-outer-wrapper">
                {
                    isSuccess ? <SpinnSuccess amount={winner} /> : <></>
                }
                <div id="wheelCircle">
                    <WheelComponent
                        segments={segments}
                        segColors={segColors}
                        winningSegment={String(winner) ?? "Try Again"}
                        onFinished={(winner) => onFinished(winner)}
                        primaryColor="black"
                        primaryColoraround="#ffffffb4"
                        contrastColor="white"
                        buttonText="Spin"
                        isOnlyOnce={false}
                        size={220}
                        upDuration={1000}
                        downDuration={2000}
                        isProcess={isProcess}
                        setIsProcess={setIsProcess}
                        authenticatedUser={authenticatedUser}
                    />
                </div>
            </div>
        </>
    )
}

export default Wheel