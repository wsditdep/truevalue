

import { auth } from "../auth";
import { fetchNotice } from "../actions/notice/data";
import { fetchAuthenticatedUser, fetchCommission } from "../actions/user/data";
import Image from "next/image";
import SecurityCheck from "@/components/checkSecurityCode/CheckSecurityCode";
import SidebarRight from "@/components/sidebarRight/SidebarRight";
import SidebarLeft from "@/components/sidebarLeft/SidebarLeft";
import icon1 from "@/public/assets/dashboard/icon1.svg";
import image1 from "@/public/assets/dashboard/image1.png"
import image2 from "@/public/assets/dashboard/image2.png"
import image3 from "@/public/assets/dashboard/image3.png"
import image4 from "@/public/assets/dashboard/image4.png"
import image5 from "@/public/assets/dashboard/image5.png"
import image6 from "@/public/assets/dashboard/image6.svg"
import image7 from "@/public/assets/dashboard/image7.svg"
import image8 from "@/public/assets/dashboard/image8.svg"
import image9 from "@/public/assets/dashboard/image9.svg"
import image10 from "@/public/assets/dashboard/image10.svg"
import image11 from "@/public/assets/dashboard/image11.svg"
import image12 from "@/public/assets/dashboard/image12.svg"
import image13 from "@/public/assets/dashboard/image13.svg"
import image14 from "@/public/assets/dashboard/image14.svg"
export const dynamic = "force-dynamic"

const page = async () => {

    const { user } = await auth();
    const authenticatedUser = await fetchAuthenticatedUser() || {};
    const notice = await fetchNotice() || [];
    const { allCommission, userCommission } = await fetchCommission();

    return (
        <>

            <section className="dashboard-page-section">
                <div className="dashboard-page-wrapper">
                    <div className="nav-bar-parent">
                        <SidebarLeft />

                        <SidebarRight
                            session={JSON.parse(JSON.stringify(authenticatedUser))}
                            allCommission={JSON.parse(JSON.stringify(allCommission))}
                            userCommission={JSON.parse(JSON.stringify(userCommission))} />
                    </div>
                    <div className="running-notice">
                        <div className="notice-icon">
                            <Image
                                src={icon1}
                                alt="icon"
                                height={100}
                                width={100}
                                unoptimized
                            />
                        </div>
                        <div className="notice-content">
                            <marquee direction="left" behavior="scroll" scrollamount="8">
                                {notice[0]?.notice}
                            </marquee>
                        </div>
                    </div>

                    <div className="dashboard-img">
                        <div className="img-content">
                            <Image
                                src={image1}
                                alt="icon"
                                height={100}
                                width={100}
                                unoptimized
                            />
                            <p>Lounges & Sofas</p>
                        </div>
                    </div>
                    <div className="dashboard-contents-wrapper">
                        <div className="furniture-container">
                            <div className="title">
                                <h1>SHOP BY POPULAR <br /> CATEGORIES</h1>
                            </div>
                            <div className="categorys">
                                <div className="img-content">
                                    <Image
                                        src={image2}
                                        alt="icon"
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                    <p>LOUNGES & SOFAS</p>
                                </div>
                                <div className="img-content">
                                    <Image
                                        src={image3}
                                        alt="icon"
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                    <p>DINING</p>
                                </div>
                                <div className="img-content">
                                    <Image
                                        src={image4}
                                        alt="icon"
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                    <p>COFFEE TABLES & TV UNITS</p>
                                </div>
                                <div className="img-content">
                                    <Image
                                        src={image5}
                                        alt="icon"
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                    <p>WALL PAINTINGS</p>
                                </div>
                            </div>
                        </div>
                        <div className="furniture-container">
                            <div className="title">
                                <h1>SHOP BY FURNITURE <br /> CATEGORY</h1>
                            </div>
                            <div className="categorys">
                                <div className="img-content">
                                    <Image
                                        src={image6}
                                        alt="icon"
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                    <p>Fabric Lounges</p>
                                </div>
                                <div className="img-content">
                                    <Image
                                        src={image7}
                                        alt="icon"
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                    <p>Dining Tables</p>
                                </div>
                                <div className="img-content">
                                    <Image
                                        src={image8}
                                        alt="icon"
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                    <p>Bar Stools</p>
                                </div>
                                <div className="img-content">
                                    <Image
                                        src={image9}
                                        alt="icon"
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                    <p>Leather Lounges</p>
                                </div>
                                <div className="img-content">
                                    <Image
                                        src={image10}
                                        alt="icon"
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                    <p>Dining Chairs</p>
                                </div>
                                <div className="img-content">
                                    <Image
                                        src={image11}
                                        alt="icon"
                                        height={100}
                                        width={100}
                                        unoptimized
                                    />
                                    <p>Tv Units</p>
                                </div>
                            </div>
                        </div>
                        <div className="furniture-container">
                            <div className="title">
                                <h1>TRENDING NOW</h1>
                            </div>
                            <div className="categorys">
                                <div className="home-appliances-wrapper">
                                    <div className="home-appliances">
                                        <div className="appliances-img">
                                            <Image
                                                src={image12}
                                                alt="icon"
                                                height={100}
                                                width={100}
                                                unoptimized
                                            />
                                        </div>
                                        <div className="appliances-desc">
                                            <p>London Extendable TV Unit With Storage in Walnut and Black</p>
                                        </div>
                                    </div>
                                    <div className="home-appliances">
                                        <div className="appliances-img">
                                            <Image
                                                src={image13}
                                                alt="icon"
                                                height={100}
                                                width={100}
                                                unoptimized
                                            />
                                        </div>
                                        <div className="appliances-desc">
                                            <p>Casper Extendable Modern TV Stand with Three Solid Wood Drawers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="furniture-container">
                            <div className="title">
                                <h1>RETAILERS AND <br /> MANUFACTURERS TRUST US</h1>
                            </div>
                            <div className="categorys">
                                <Image
                                    src={image14}
                                    alt="icon"
                                    height={100}
                                    width={100}
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <SecurityCheck
                user={JSON.parse(JSON.stringify(user))}
                authenticatedUser={JSON.parse(JSON.stringify(authenticatedUser))}
            />
        </>
    )
}

export default page