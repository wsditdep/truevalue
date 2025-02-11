"use client";

import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/app/actions/user/action';
import { useFormStatus } from "react-dom";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from "@/public/assets/logo.png"
import icon0 from "@/public/assets/auth/icon0.svg"
import icon1 from "@/public/assets/auth/icon1.png"
import icon2 from "@/public/assets/auth/icon2.png"
import img1 from "@/public/assets/auth/img1.svg"
import SignInFailModal from '../successModal/SigninFailModal';

function Submit() {
    const { pending } = useFormStatus();
    return (
        <>
            <button type="submit" disabled={pending} className="primary-btn">{pending ? <>Please Wait<i className="fa fa-circle-notch rotating-spinner"></i></> : "Login"}</button>
        </>
    )
}

const Signin = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isMessage, setIsMessage] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const { push } = useRouter();

    const [defaultVal, setDefaultVal] = useState({
        username: "",
        password: ""
    });

    const saveLoginData = (data) => {

        const { username, password } = Object.fromEntries(data);

        const loginData = {
            username: username,
            password: password
        };

        localStorage.setItem("xjdeiuqx_history", JSON.stringify(loginData));
    };

    const handleForm = async (formData) => {
        try {
            const response = await authenticate(formData);

            if (response === undefined) {
                // toast.success("successfully logged In");
                push('/dashboard');
                saveLoginData(formData);
                return;
            } else {
                setIsMessage(true);
                // toast.error(response.message);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fromHistory = localStorage.getItem("xjdeiuqx_history");

        if (fromHistory) {
            const parsedData = JSON.parse(fromHistory);
            setDefaultVal({
                username: parsedData?.username || "",
                password: parsedData?.password || ""
            });
        }

    }, []);
    return (
        <>
            {
                isMessage
                    ?
                    <SignInFailModal setIsModal={setIsMessage} />
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
                        <h1>Sign in to your Account</h1>
                        {/* <p>If you don’t have an account register You can <Link href={"/signup"}> &nbsp; Register here !</Link></p> */}
                    </div>
                </div>
                <div className="auth-page-parent">
                    <div className="auth-page-child">
                        <p>Username</p>
                        <input
                            type="text"
                            placeholder="Enter your username here"
                            name="username"
                            defaultValue={defaultVal?.username}
                            required
                        />
                    </div>
                    <div className="auth-page-child">
                        <p>Password</p>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Enter your password here"
                            name="password"
                            defaultValue={defaultVal?.password}
                            required
                        />
                        <div className='visible-icon'>
                            <span onClick={togglePasswordVisibility}>
                                {passwordVisible
                                    ?
                                    <Image
                                        src={icon1}
                                        alt='img'
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                    :
                                    <Image
                                        src={icon2}
                                        alt='img'
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                }
                            </span>
                        </div>
                    </div>
                    <div className="auth-forgot-parent">
                        <div className="auth-forgot-child">
                            <Link href={"/signup"}>
                                <p className="color">Sign Up</p>
                            </Link>
                            <Link href={"/support"}>
                                <p>Forget Password?</p>
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

export default Signin