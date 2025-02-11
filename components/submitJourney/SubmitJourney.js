"use client";

import { submitJourney } from '@/app/actions/journey/action';
import toast from "react-hot-toast";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { fetchProduct } from "@/app/actions/journey/data";
import Loader from "../loader/Loader";
import { useRouter } from "next/navigation";
import JourneySuccessModal from '../successModal/JourneySuccessModal';
import Image from 'next/image';

function Submit() {

    const { pending } = useFormStatus();

    return (
        <>

            <button type="submit" className={pending ? "primary-btn managedDisabled" : "primary-btn"}> {
                pending ?
                    <> Please wait <i className="fa fa-circle-notch rotating-spinner"></i></>
                    :
                    `Submit`
            }
            </button>
        </>
    )
}

const SubmitJourney = ({ authUser }) => {

    const [isUpSideDouwnIcon, setIsUpSideDouwnIcon,] = useState(false);

    const reviews = [
        { id: 1, data: "I recommend for everyone to play this game you will love it 😍" },
        { id: 2, data: "This game was truly amazing, very detailed in almost every aspect." },
        { id: 3, data: "This game is the best game of all time. I can say that the graphics still hold up." },
        { id: 4, data: "A great, classic game that started a great franchise. It was truly an amazing game to play and experience in the shoes of my favorite protagonist of all time." },
        { id: 5, data: "Brilliant, just brilliant!" },
        { id: 6, data: "I really gotta say. Dynamites come in small packages. And this is totally it😁." },
        { id: 7, data: "It’s got the great storyline, it’s got the quality resolution and very detail-oriented graphics." },
        { id: 8, data: "Love the gameplay, story, graphics everything!" },
        { id: 9, data: "STUNNING GAME - it is definitely what I expected after so long time of development and huge advertising." },
        { id: 10, data: "I give it five stars, because I see it on YouTube and other platforms but haven't played the game but it seems really cool. :))" },
        { id: 11, data: "Highly recommended. Have fun!" },
        { id: 12, data: "Been playing this with my daughter since day of release whenever she visits on weekends and it is seriously addictive and very amusing to play!" },
        { id: 13, data: "Amazingly fun and hilarious game for family and friends. One of the best I have played in a long time." },
        { id: 14, data: "An ABSOLUTE ASTONISHING AND GORGEOUS GAME!" },
        { id: 15, data: "This game is being review bombed I’m not sure why but trust me it’s worth your time." },
        { id: 16, data: "This game probably changed my life. It was one of the first video games I've ever played. Do play it. This has to be my favorite game of all time, thank you." },
        { id: 17, data: "This game is so amazing! It reached beyond my expectations. It’s like they added all the genres!" },
        { id: 18, data: "My favorite game of all time. It has great characters, an amazing story, and has some unexpected character development. The game is hilarious as well! I give this game five stars, and I would definitely recommend it." }
    ];


    const [isCommand, setIsCommand] = useState("Please select an option to comment");

    const manage_review = (commandValue) => {
        setIsCommand(commandValue)
    }

    const { push } = useRouter();
    const [info, setInfo] = useState({
        sales: "",
        popularity: "",
        date: "",
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [myState, setMyState] = useState({});
    const [loading, setLoading] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isNextData, setIsNextData] = useState(false);

    const [rating, setRating] = useState(4);

    const handleClick = (index) => {
        setRating(index + 1);
    };

    const handleForm = async () => {
        try {
            const response = await submitJourney();

            if (response.status === 201) {
                if (response?.isNextJourney) {
                    setIsNextData(true);
                    setTimeout(() => {
                        window.location.reload();
                    }, [3000])
                } else {
                    setIsSuccess(true);
                    setTimeout(() => {
                        setIsSuccess(false);
                        push("/dashboard/journey");
                    }, [1000])
                    setIsPressed(true);
                    // toast.success(response.message);
                }
            } else {
                toast.error(response.message);
                setIsPressed(true);
                push("/dashboard/recharge");
            }

        } catch (error) {
            setIsPressed(false);
            console.log(error)
        }
    }

    const handleProduct = async () => {
        setLoading(true);
        try {
            const response = await fetchProduct();
            setMyState(response.data);
            setLoading(false);

            const infoFromLocal = JSON.parse(localStorage.getItem("journeyInfo"));
            if (infoFromLocal === null) {
                const getRandomSales = () => Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
                const getRandomPopularity = () => Math.floor(Math.random() * (100 - 90 + 1)) + 90;

                const getRandomDate = () => {
                    const currentDate = new Date();
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    const year = currentDate.getFullYear();
                    return `${day}-${month}-${year}`;
                };

                const newInfo = {
                    _id: response?.data?.product?._id,
                    sales: getRandomSales(),
                    popularity: getRandomPopularity(),
                    date: getRandomDate()
                };

                setInfo(newInfo);
                localStorage.setItem("journeyInfo", JSON.stringify(newInfo));
            } else if (infoFromLocal?._id === response?.data?.product?._id) {
                const newInfo = {
                    _id: infoFromLocal?._id,
                    sales: infoFromLocal?.sales,
                    popularity: infoFromLocal?.popularity,
                    date: infoFromLocal?.date
                };
                setInfo(newInfo);
            } else {
                const getRandomSales = () => Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
                const getRandomPopularity = () => Math.floor(Math.random() * (100 - 90 + 1)) + 90;

                const getRandomDate = () => {
                    const currentDate = new Date();
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    const year = currentDate.getFullYear();
                    return `${day}-${month}-${year}`;
                };

                const newInfo = {
                    _id: response?.data?.product?._id,
                    sales: getRandomSales(),
                    popularity: getRandomPopularity(),
                    date: getRandomDate()
                };

                setInfo(newInfo);
                localStorage.setItem("journeyInfo", JSON.stringify(newInfo));
            }

        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }

    useEffect(() => {
        handleProduct();
    }, []);

    return (
        <>
            {
                isSuccess
                    ?
                    <JourneySuccessModal setIsModal={setIsSuccess} />
                    :
                    <></>
            }
            {
                loading
                    ?
                    <Loader />
                    :
                    <></>
            }
            {
                isNextData
                    ?
                    <div className="fetchNextData">
                        <h3>Please wait....Matching next data <i className="fa fa-spinner"></i></h3>
                    </div>
                    :
                    <></>
            }
            <section className="submit-journey-section">
                <div className='submit-journey-wrapper'>
                    <div className='submit-journey-parent'>
                        <div className='product-img-container'>
                            <div className='product-img'>
                                <Image
                                    src={myState?.product?.url ?? ""}
                                    height={100}
                                    width={100}
                                    alt="product"
                                    unoptimized
                                />
                            </div>
                        </div>
                        <div className='product-info'>
                            <div className='info'>
                                <h1>{myState?.product?.productName}</h1>
                            </div>
                            <div className='divider'></div>
                            <div className='product-amount-details'>
                                <div className='detail'>
                                    <p>Commissions</p>
                                    <p>$ {myState?.commission?.toFixed(2) ?? ""}</p>
                                </div>
                                <div className='detail'>
                                    <p>Booking Value</p>
                                    <p>$ {((myState?.product?.productPrice || 0) + (myState?.commission || 0)).toFixed(2)}</p>
                                </div>
                                <div className='detail'>
                                    <p>Price</p>
                                    <p>$ {myState?.product?.productPrice?.toFixed(2) ?? ""}</p>
                                </div>
                            </div>

                            <div className='divider'></div>
                            <div className='info'>
                                <div className='info-child'>
                                    <p>Rating</p>
                                </div>
                                <div className='info-child'>
                                    <div className="rate-task-childs">
                                        <ul>
                                            {Array.from({ length: 5 }, (v, i) => (
                                                <li key={i} onClick={() => handleClick(i)}>
                                                    <i className={`fa fa-star ${i < rating ? 'rated' : ''}`}></i>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='divider'></div>
                            <div className='info'>
                                <div className='info-child'>
                                    <p>Comment</p>

                                </div>
                                <div className='info-child'>
                                    <p>{isCommand}</p>
                                    {
                                        isUpSideDouwnIcon
                                            ?
                                            <i className="fa-solid fa-angle-up" onClick={() => setIsUpSideDouwnIcon(false)}></i>
                                            :
                                            <i className="fa-solid fa-angle-down" onClick={() => setIsUpSideDouwnIcon(true)}></i>
                                    }
                                </div>
                                <div className='divider'></div>
                                <div className='info-child'>
                                    {
                                        isUpSideDouwnIcon
                                            ?
                                            <>
                                                <div className='info-sub-child'>
                                                    {reviews.map((review) => (
                                                        <div key={review.id}>
                                                            <p onClick={() => { manage_review(review.data); setIsUpSideDouwnIcon(false); }}>{review.data}</p>
                                                            <div className='divider'></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                </div>
                            </div>
                            <div className='info'>
                                <form action={handleForm}>
                                    {
                                        isPressed
                                            ?
                                            <div className="isPressedValidation">
                                                <p>Processing Please Wait <i className="fa fa-circle-notch rotating-spinner"></i></p>
                                            </div>
                                            :
                                            <Submit />
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default SubmitJourney;