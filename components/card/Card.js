"use client";

import Image from "next/image";

const Card = ({ user }) => {

    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 327 118"
            >
                <g id="with_card" data-name="with card" transform="translate(-797 -481)">
                    <g id="Group_3" data-name="Group 3" transform="translate(797 481)">
                        <rect
                            id="Rectangle_1"
                            width="327"
                            height="118"
                            fill="#f9f9fb"
                            data-name="Rectangle 1"
                            rx="8"
                        ></rect>
                        <path
                            id="Path_3"
                            fill="rgba(36,36,48,0.05)"
                            fillRule="evenodd"
                            d="M321 53.607v64.02h-16.361a206 206 0 0 0-.711-24.185q-8.734 11.8-17.428 23.474-8.279-11.233-16.005-22.763a2.14 2.14 0 0 0-1.423-1.423 218 218 0 0 0-.711 24.9H252V52.184a9.36 9.36 0 0 1 8.892 2.845q12.476 17.79 25.608 34.856 13.188-16.052 24.9-33.433 3.78-5.209 9.6-2.845"
                            data-name="Path 3"
                        ></path>
                    </g>
                    <g id="Group_2" data-name="Group 2" transform="translate(4)">
                        <g
                            id="Group_1"
                            fill="#4d4d66"
                            data-name="Group 1"
                            fontFamily="Poppins-Bold, Poppins"
                            fontWeight="700"
                        >
                            <text
                                id="_"
                                data-name="$"
                                fontSize="20"
                                transform="translate(813 562)"
                            >
                                <tspan x="0" y="0">
                                    ${" "}
                                </tspan>
                            </text>
                            <text
                                id="_29_865.00_"
                                data-name="29,865.00"
                                fontSize="30"
                                transform="translate(830 562)"
                            >
                                <tspan x="0" y="0">
                                    {user?.balance?.toFixed(2) ?? ""}{" "}
                                </tspan>
                            </text>
                        </g>
                        <text
                            id="Total_Balance"
                            fill="#626e79"
                            data-name="Total Balance"
                            fontFamily="Poppins-SemiBold, Poppins"
                            fontSize="15"
                            fontWeight="600"
                            transform="translate(813 520)"
                        >
                            <tspan x="0" y="0">
                                Account Balance
                            </tspan>
                        </text>
                    </g>
                </g>
            </svg>
        </>
    );
};

export default Card;
