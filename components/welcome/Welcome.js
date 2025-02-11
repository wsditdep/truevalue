import Image from "next/image"
import img1 from "@/public/assets/welcome/img1.png"
import logo from "@/public/assets/logo.png"
import Link from "next/link"

const Welcome = () => {
    return (
        <section className="welcome-page-section">
            <div className="welcome-page-wrapper">
                <div className="welcome-contents">
                    <div className="welcome-img">
                        <Image
                            src={img1}
                            alt={"footer"}
                            height={100}
                            width={100}
                            unoptimized
                        />
                    </div>
                    <div className="welcome-introductions">
                        <div className="content">
                            <Image
                                src={logo}
                                alt={"footer"}
                                height={100}
                                width={100}
                                unoptimized
                            />
                        </div>
                        <div className="content">
                            <h1>True Value Rewards <br /> is<br /> Here For You</h1>
                        </div>
                        <div className="content">
                            <p>Sign up today to make the most of every visit and experiance the rewards that are crafted just for you!</p>
                        </div>
                        <div className="content">
                            <Link href={"signin"}>
                                <button className="primary-btn">Let’s Go</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Welcome