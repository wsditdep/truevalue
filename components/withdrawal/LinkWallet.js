"use client";

import { useFormStatus } from "react-dom";
import { createWallet } from "@/app/actions/user/action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/logo.png"
import icon0 from "@/public/assets/auth/icon0.svg"
import img1 from "@/public/assets/linkwallet/img1.svg"

function Submit({ user }) {
    const { pending } = useFormStatus();
    return (
        <>
            {
                user?.network_type === null
                    ?
                    <button type="submit" disabled={pending} className="primary-btn">{pending ? "Submitting..." : "Update"}</button>
                    :
                    <button type="submit" disabled={pending} className="primary-btn">{pending ? "Submitting..." : "Link Wallet"}</button>
            }
        </>
    )
}

const LinkWallet = ({ user }) => {

    const { push, refresh } = useRouter();

    const [selectedCurrencyOption, setSelectedCurrencyOption] = useState("USDT");
    const [selectedNetworkOption, setSelectedNetworkOption] = useState("TRC 20");


    const handleOptionChange = (e) => {
        setSelectedCurrencyOption(e.target.value);
    };

    const handleNetworkOptionChange = (e) => {
        setSelectedNetworkOption(e.target.value);
    };

    const handleForm = async (formData) => {
        try {

            formData.append("id", user?._id);
            formData.append("currency", selectedCurrencyOption);
            formData.append("network_type", selectedNetworkOption);

            const response = await createWallet(formData);

            if (response.status === 201) {
                toast.success(response.message);
                push('/dashboard/withdrawal');
                refresh();
                return;
            } else {
                return toast.error(response.message);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setSelectedCurrencyOption(user?.currency ?? "USDT")
        setSelectedNetworkOption(user?.network_type ?? "TRC 20")
    }, [])

    return (
        <>
            <section className="linkwallet-section">
                <div className="linkwallet-wrapper">

                    <form action={handleForm}>
                        <div className="auth-page-parent">
                            <div className="auth-page-child">
                                <Link href={"/"}>
                                    <Image
                                        src={icon0}
                                        alt='img'
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                </Link>
                                <Image
                                    src={logo}
                                    alt='img'
                                    height={100}
                                    width={100}
                                    unoptimized
                                />
                            </div>
                            <div className="auth-page-child">
                                <Image
                                    src={img1}
                                    alt='img'
                                    height={100}
                                    width={100}
                                    unoptimized
                                />
                            </div>
                            <div className="auth-page-child">
                                <h1>Link Wallet</h1>
                                {/* <p>You will receive your withdrawal within an hour</p> */}
                            </div>
                        </div>
                        <div className="auth-page-parent">
                            <div className="auth-page-child">
                                <p>Full name</p>
                                <input
                                    type="text"
                                    placeholder="Enter your full name here"
                                    name="wallet_name"
                                    defaultValue={user?.wallet_name ?? ""}
                                    required
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                            </div>
                            <div className="auth-page-child">
                                <p>Phone Number</p>
                                <input
                                    type="number"
                                    placeholder="Enter your phone number here"
                                    name="wallet_phone"
                                    defaultValue={user?.wallet_phone}
                                    required
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                            </div>
                            <div className="auth-page-child">
                                <p>Wallet Address</p>
                                <input
                                    type="text"
                                    placeholder="Enter your wallet address here"
                                    name="wallet_address"
                                    defaultValue={user?.wallet_address}
                                    required
                                    onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                                />
                            </div>
                            <div className="auth-page-child">
                                <p>Cryptocurrency</p>
                                <div className="radio-group">
                                    <label className={selectedCurrencyOption === "USDT" ? "checked" : ""}>
                                        <input
                                            type="radio"
                                            name="currency"
                                            value="USDT"
                                            checked={selectedCurrencyOption === "USDT"}
                                            onChange={(e) => handleOptionChange(e)}
                                        />
                                        <span className="radio-custom"></span>
                                        USDT
                                    </label>
                                    <label className={selectedCurrencyOption === "USDC" ? "checked" : ""}>
                                        <input
                                            type="radio"
                                            name="currency"
                                            value="USDC"
                                            checked={selectedCurrencyOption === "USDC"}
                                            onChange={(e) => handleOptionChange(e)}
                                        />
                                        <span className="radio-custom"></span>
                                        USDC
                                    </label>
                                    <label className={selectedCurrencyOption === "ETH" ? "checked" : ""}>
                                        <input
                                            type="radio"
                                            name="currency"
                                            value="ETH"
                                            checked={selectedCurrencyOption === "ETH"}
                                            onChange={(e) => handleOptionChange(e)}
                                        />
                                        <span className="radio-custom"></span>
                                        ETH
                                    </label>
                                    <label className={selectedCurrencyOption === "BTC" ? "checked" : ""}>
                                        <input
                                            type="radio"
                                            name="currency"
                                            value="BTC"
                                            checked={selectedCurrencyOption === "BTC"}
                                            onChange={(e) => handleOptionChange(e)}
                                        />
                                        <span className="radio-custom"></span>
                                        BTC
                                    </label>
                                </div>
                            </div>
                            <div className="auth-page-child">
                                <p>Network</p>
                                <div className="radio-group">
                                    <label className={selectedNetworkOption === "TRC 20" ? "checked" : ""}>
                                        <input
                                            type="radio"
                                            name="network_type"
                                            value="TRC 20"
                                            checked={selectedNetworkOption === "TRC 20"}
                                            onChange={(e) => handleNetworkOptionChange(e)}
                                        />
                                        <span className="radio-custom"></span>
                                        TRC 20
                                    </label>
                                    <label className={selectedNetworkOption === "ERC 20" ? "checked" : ""}>
                                        <input
                                            type="radio"
                                            name="network_type"
                                            value="ERC 20"
                                            checked={selectedNetworkOption === "ERC 20"}
                                            onChange={(e) => handleNetworkOptionChange(e)}
                                        />
                                        <span className="radio-custom"></span>
                                        ERC 20
                                    </label>
                                    <label className={selectedNetworkOption === "BTC" ? "checked" : ""}>
                                        <input
                                            type="radio"
                                            name="network_type"
                                            value="BTC"
                                            checked={selectedNetworkOption === "BTC"}
                                            onChange={(e) => handleNetworkOptionChange(e)}
                                        />
                                        <span className="radio-custom"></span>
                                        BTC
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="auth-page-parent">
                            <div className="auth-page-child">
                                {
                                    user?.network_type === null
                                        ?
                                        <Submit />
                                        :
                                        ""
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default LinkWallet