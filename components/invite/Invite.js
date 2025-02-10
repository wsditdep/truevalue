"use client";

import toast from "react-hot-toast";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Image from "next/image";
import img from "@/public/assets/invite/img.svg"

const Invite = ({ user }) => {

    const copyToClipboard = (val) => {
        navigator.clipboard.writeText(val);
        return toast.success(`Copied - (${val})`);
    }

    return (
        <>
            <Breadcrumb authUser={user} title="Invitation" link="/dashboard" />
            <section className="invite-section">
                <div className="invite-wrapper">
                    <div className="invite-parent">
                        <div className="invite-child">
                            <Image
                                src={img}
                                alt="icon"
                                height={100}
                                width={100}
                                unoptimized
                            />
                        </div>
                        <div className="invite-child">
                            {/* <p>Refer friend</p> */}
                        </div>
                        <div className="invite-child">
                            <p>Copy your code, share it with your friends</p>
                        </div>
                        <div className="invite-child">
                            <p>Your code to invite</p>
                            <div className="refcode">
                                <p>{user?.invitation_code ?? ""}</p>
                                <p onClick={() => copyToClipboard(user?.invitation_code ?? "")}>Copy</p>
                            </div>
                        </div>
                    </div>
                    <div className="invite-btn">
                        {/* <button className="primary-btn" onClick={() => copyToClipboard(user?.invitation_code ?? "")}>Send Invitations</button> */}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Invite;