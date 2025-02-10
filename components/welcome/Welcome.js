import Image from "next/image"
import img1 from "@/public/assets/welcome/img1.svg"
import logo from "@/public/assets/logo.svg"
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
                            <h1>Furniture Stores Canberra Marco Furniture Australia</h1>
                        </div>
                        <div className="content">
                            <p>For over 15 years, Marco Furniture has stood as Australia's premier destination for exquisite furniture and home decor selections.</p>
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