"use client";

import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import Image from 'next/image';
import { useState } from 'react';
import ConfirmModal from '../successModal/ConfirmModal';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { uploadProfile } from '@/app/actions/profile/action';
import Loader from '../loader/Loader';
import icon1 from "@/public/assets/profile/icon1.svg"
import copy from "@/public/assets/profile/copy.svg"
import Card from '../card/Card';

export const Profile = ({ user }) => {

    const copyToClipboard = (val) => {
        navigator.clipboard.writeText(val);
        return toast.success(`Copied - (${val})`);
    }

    const router = useRouter();

    const [isConfirm, setIsConfirm] = useState(false);
    const [file, setFile] = useState(null);
    const [pending, setPending] = useState(false);


    const handleForm = async (selectedFile) => {

        if (!selectedFile) {
            return toast.error("Please choose an image!");
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_IMAGE_UPLOAD_PRESET);

        // upload image to cloudinary::begin
        try {
            setPending(true);
            const cloud_res = await fetch(`https://api.cloudinary.com/v1_1/dcafl7bt9/image/upload`, {
                method: "POST",
                body: formData
            });

            const cloud_data = await cloud_res.json();

            if (cloud_res.ok) {
                // Save in database::begin
                try {
                    const formData = new FormData();
                    formData.append("public_id", cloud_data.public_id);
                    formData.append("url", cloud_data.url);

                    const response = await uploadProfile(formData);

                    if (response.status === 201) {
                        router.refresh();
                        setFile(null);  // Reset file after successful upload
                        setPending(false);
                        return toast.success(response.message);
                    } else {
                        setPending(false);
                        throw new Error("Failed to upload profile image!");
                    }
                } catch (error) {
                    setPending(false);
                    console.error(error);
                }
                // Save in database::end
            } else {
                setPending(false);
                throw new Error("Failed to upload profile image!");
            }

        } catch (error) {
            setPending(false);
            console.error(error);
        }
        // upload image to cloudinary::end
    };



    return (
        <>
            {
                isConfirm
                    ?
                    <ConfirmModal
                        setIsModal={setIsConfirm}
                    />
                    :
                    <></>
            }
            {
                pending ? <Loader /> : <></>
            }
            <Breadcrumb title="Profile" link="/dashboard" activeProfile={true} />
            <section className='profile-section'>
                <div className='profile-wrapper'>
                    <div className='profile-parent'>
                        <div className='user-info'>

                            <div className='profile-wrapper'>
                                <form>
                                    <div className="profile-img" onClick={() => document.getElementById('file-upload').click()}>
                                        {file === null ? (
                                            <Image
                                                src={user?.url === null ? icon1 : user?.url}
                                                width={100}
                                                height={100}
                                                alt="chosen file"
                                                unoptimized
                                            />
                                        ) : (
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                width={100}
                                                height={100}
                                                alt="file"
                                                unoptimized
                                            />
                                        )}

                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept=".png, .jpg, .jpeg, .gif"
                                            onChange={(e) => {
                                                setFile(e.target.files[0]);  // Set the selected file
                                                handleForm(e.target.files[0]);  // Trigger the upload function
                                            }}
                                            hidden
                                        />
                                    </div>
                                </form>

                            </div>

                            <div className='profile-info'>
                                <p>{user?.username}</p>
                                <p onClick={() => copyToClipboard(user?.invitation_code ?? "")}>
                                    {user?.invitation_code}
                                    <Image
                                        src={copy}
                                        width={100}
                                        height={100}
                                        alt="file"
                                        unoptimized
                                    /></p>
                                <div className="sidebar-progress-bar">
                                    <div className="sidebar-progress-bar-parent">
                                        <div className="sidebar-progress-bar-childs">
                                            <div className="progressbar-track">
                                                <div className="progressbar-thumb" style={{ width: `${user?.credibility}%` }}>
                                                    <div>{user?.credibility}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-invite">
                            <div className="profile-invite-childs">
                                <Card user={JSON.parse(JSON.stringify(user))} />
                            </div>
                        </div>
                        <div className='logout-btn'>
                            <button className='primary-btn' onClick={() => setIsConfirm(true)}> Log Out</button>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}