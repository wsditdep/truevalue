"use client";

import { useState } from 'react';
import { useFormStatus } from "react-dom";
import { logout, resetPassword } from "@/app/actions/user/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/assets/logo.png"
import icon0 from "@/public/assets/auth/icon0.svg"
import icon1 from "@/public/assets/auth/icon1.png"
import icon2 from "@/public/assets/auth/icon2.png"
import img2 from "@/public/assets/auth/img2.svg"


function Submit() {
    const { pending } = useFormStatus();
    return (
        <>
            <button type="submit" disabled={pending} className="primary-btn">{pending ? "Submitting..." : "CONFIRM"}</button>
        </>
    )
}

const ChangePassword = ({ authUser }) => {

    // Array for visibility states
    const [visibility, setVisibility] = useState([false, false, false]);

    // Toggle function for each field
    const toggleVisibility = (index) => {
        setVisibility(visibility.map((v, i) => (i === index ? !v : v)));
    };

    // Fields configuration
    const fields = [
        { label: 'Current Password', name: 'old_password' },
        { label: 'New Password', name: 'new_password' },
        { label: 'Confirm Password', name: 'confirm_password' },
    ];

    const { push } = useRouter();
    const handleForm = async (formData) => {
        try {
            const response = await resetPassword(formData);

            if (response.status === 201) {
                toast.success(response.message);
                await logout();
                push('/signin');
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
            <section className='security-section'>
                <div className='security-wrapper'>
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
                                    src={img2}
                                    alt='img'
                                    height={100}
                                    width={100}
                                    unoptimized
                                />
                            </div>
                            <div className="auth-page-child">
                                <h1>Change Security PIN</h1>
                                {/* <p>Secure your account with strong credential</p> */}
                                <div className="btns">
                                    <Link href={"/dashboard/recovery/changePassword"} className="btn">
                                        <p>WITHDRAW PIN</p>
                                    </Link>
                                    <Link href={"/dashboard/recovery/changePin"} className="btn active">
                                        <p>LOGIN PASSWORD</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="auth-page-parent">
                            {fields.map((field, index) => (
                                <div className="auth-page-child" key={index}>
                                    <p>{field.label}</p>
                                    <input
                                        type={visibility[index] ? 'number' : 'password'}
                                        placeholder="Enter your password here"
                                        name={field.name}
                                        required
                                        inputMode="numeric"
                                        onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                                    />
                                    <div className='visible-icon'>
                                        <span onClick={() => toggleVisibility(index)}>
                                            {visibility[index] ? (
                                                <Image
                                                    src={icon1}
                                                    alt="Visible icon"
                                                    height={100}
                                                    width={100}
                                                    unoptimized
                                                />
                                            ) : (
                                                <Image
                                                    src={icon2}
                                                    alt="Hidden icon"
                                                    height={100}
                                                    width={100}
                                                    unoptimized
                                                />
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="auth-page-parent">
                            <div className="auth-page-child">
                                <Submit />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default ChangePassword