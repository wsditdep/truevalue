"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import icon from "@/public/assets/breadcrumb/icon.png"
import icon1 from "@/public/assets/breadcrumb/icon1.png"
import arrow from "@/public/assets/breadcrumb/arrow.svg";

const Breadcrumb = ({ link, title, activeWithdrawalHistory, activeRechargeHistory, activeProfile, authUser, bg, isLink }) => {

    const router = useRouter();

    const backFunc = () => {
        return router.back();
    }

    return (
        <div className="breadcrumb-wrapper" style={{ background: bg !== "" ? bg : "" }}>
            <div className="breadcrumb-wrapper-parent">
                <div className="breadcrumb-wrapper-childs">
                    {
                        link === ""
                            ?
                            <>
                                <Link href={""}>
                                    <Image
                                        src={arrow}
                                        alt="arrow"
                                        height={100}
                                        width={100}
                                        unoptimized
                                        onClick={() => backFunc()}
                                    />
                                </Link>
                            </>
                            :

                            <Link href={link}>

                                <Image
                                    src={arrow}
                                    alt="arrow"
                                    height={100}
                                    width={100}
                                    unoptimized
                                />
                            </Link>
                    }
                </div>
                <div className="breadcrumb-wrapper-childs">
                    <h3>{title}</h3>
                </div>
                <div className="breadcrumb-wrapper-childs">
                    {
                        activeWithdrawalHistory && activeWithdrawalHistory
                            ?
                            <Link href="/dashboard/withdrawalHistory">
                                <Image
                                    src={icon}
                                    alt="icon"
                                    height={100}
                                    width={100}
                                    unoptimized
                                />
                            </Link>
                            :
                            activeRechargeHistory && activeRechargeHistory
                                ?
                                <Link href="/dashboard/rechargeHistory">
                                    <Image
                                        src={icon}
                                        alt="icon"
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                </Link>
                                :
                                activeProfile && activeProfile
                                    ?
                                    <Link href="/dashboard/recovery/changePin">
                                        <Image
                                            src={icon1}
                                            alt="icon"
                                            height={100}
                                            width={100}
                                            unoptimized
                                        />
                                    </Link>
                                    :
                                    <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb