"use client";

import { createUser } from "@/app/actions/user/action";
import { toast } from 'react-hot-toast';
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { useState } from "react";
import SignUpSuccessModal from "../successModal/SignUpSuccessModal";
import SignUpFailModal from "../successModal/SignUpFailModal";
import Image from "next/image";
import logo from "@/public/assets/logo.svg"
import icon0 from "@/public/assets/auth/icon0.svg"
import icon1 from "@/public/assets/auth/icon1.png"
import icon2 from "@/public/assets/auth/icon2.png"
import img1 from "@/public/assets/auth/img1.svg"

function Submit() {
    const { pending } = useFormStatus();
    return (
        <>
            <button type="submit" disabled={pending} className="primary-btn">{pending ? <>Please Wait<i className="fa fa-circle-notch rotating-spinner"></i></> : "Register"}</button>
        </>
    )
}

const SignUp = () => {

    // Array for visibility states
    const [visibility, setVisibility] = useState([false, false, false, false]);

    // Toggle function for each field
    const toggleVisibility = (index) => {
        setVisibility(visibility.map((v, i) => (i === index ? !v : v)));
    };

    // Fields configuration
    const fields = [
        { label: 'Login Password', name: 'password', placeholder: "Enter your password here", type: "text" },
        { label: 'Confirm Password', name: 'cpassword', placeholder: "Enter your password here", type: "text" },
        { label: 'Withdraw Password', name: 'withdrawal_pin', placeholder: "Enter your password here", type: "number", inputMode: "numeric", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, '') },
        { label: 'Confirm Password', name: 'cwithdrawal_pin', placeholder: "Enter your password here", type: "number", inputMode: "numeric", onInput: (e) => e.target.value = e.target.value.replace(/[^0-9]/g, '') },
    ];

    const [isModal, setIsModal] = useState(false);
    const [isFailModal, setIsFailModal] = useState(false);

    const handleForm = async (formData) => {
        try {
            const response = await createUser(formData);

            if (response.status === 201) {
                setIsModal(true)
            } else {
                toast.error(response.message);
                setIsFailModal(true);
            }

        } catch (error) {
            console.log(error)
            setIsFailModal(true);
        }
    }

    return (
        <>
            {
                isModal
                    ?
                    <SignUpSuccessModal
                        setIsModal={setIsModal}
                    />
                    :
                    <></>
            }
            {
                isFailModal
                    ?
                    <SignUpFailModal
                        setIsModal={setIsFailModal}
                    />
                    :
                    <></>
            }

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
                        <h1>Create your account</h1>
                        {/* <p>If you already have an account register You can <Link href={"/signin"}> &nbsp; Login here !</Link></p> */}
                    </div>
                </div>
                <div className="auth-page-parent">
                    <div className="auth-page-child">
                        <p>Username</p>
                        <input
                            type="hidden"
                            name="role"
                            value="user"
                        />
                        <input
                            type="text"
                            placeholder="Enter your username here"
                            name="username"
                            required
                        />
                    </div>
                    <div className="auth-page-child">
                        <p>Phone Number</p>
                        <input
                            type="number"
                            placeholder="Enter your username here"
                            name="phone_number"
                            required
                        />
                    </div>
                    {fields.map((field, index) => (
                        <div className="auth-page-child" key={index}>
                            <p>{field.label}</p>
                            <input
                                type={visibility[index] ? 'text' : 'password'}
                                name={field.name}
                                placeholder={field?.placeholder}
                                inputMode={field?.inputMode}
                                onInput={field?.onInput}
                                required
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
                    <div className="auth-page-child">
                        <p>Invitation Code</p>
                        <input
                            type="text"
                            placeholder="Enter your invitation code here"
                            name="ref_code"
                            required
                        />
                    </div>
                    <div className="auth-forgot-parent">
                        <div className="auth-forgot-child">
                            <Link href={"/signin"}>
                                <p>Already have an account?</p>
                            </Link>
                            <Link href={"/signin"}>
                                <p className="color">Log In</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="auth-page-parent">
                    <div className="auth-page-child">
                        <Submit />
                    </div>
                </div>
            </form>
        </>
    )
}


export default SignUp