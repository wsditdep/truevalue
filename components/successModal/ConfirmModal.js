import Image from 'next/image';
import React from 'react';
import logoutPic from "@/public/assets/model/logout.jpeg";
import { logout } from '@/app/actions/user/action';
import { useRouter } from 'next/navigation';

const ConfirmModal = ({ setIsModal }) => {

    const router = useRouter();

    const logoutfunc = async () => {
        await logout();
        setIsModal(false)
        router.push("/");
    }

    return (
        <div className="success-modal-wrapper">
            <div className="success-modal-wrapper-inner">
                <div className="close-modal" onClick={() => setIsModal(false)}>
                    <i className="fa fa-times"></i>
                </div>
                <div className="success-modal-wrapper-image">
                    <Image
                        src={logoutPic}
                        height={100}
                        width={100}
                        alt="modal"
                        unoptimized
                    />
                </div>
                <div className="success-modal-wrapper-content">
                    <h3>Logout</h3>
                    <p>
                        Are you sure <br />
                        you want to logout?
                    </p>
                    <button onClick={() => logoutfunc()} className="primary-btn">LOGOUT</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal