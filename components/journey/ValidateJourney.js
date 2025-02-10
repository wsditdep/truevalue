"use client";

import { useFormStatus } from "react-dom";
import { useRouter } from 'next/navigation';
import { validateStartJourney } from "@/app/actions/journey/action";
import { toast } from 'react-hot-toast';
import { useEffect, useState } from "react";
import JourneyFailModal from "../successModal/JourneyFailModal";
import InsufficientBalance from "../successModal/InsufficientBalance";


function Submit() {

    const { pending } = useFormStatus();

    return (
        <button type="submit" className={pending ? "primary-btn managedDisabled" : "primary-btn"}> {
            pending ?
                <> Please wait <i className="fa fa-circle-notch rotating-spinner"></i></>
                :
                `Start`
        }
        </button>
    )
}

const ValidateJourney = () => {

    const { push, refresh } = useRouter();

    const [isError, setIsError] = useState(false);
    const [isInsufficient, setInsufficient] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleForm = async () => {
        try {
            const response = await validateStartJourney();

            if (response.status === 201) {
                push('/dashboard/journey/submitJourney');
                setIsPressed(true);
                return;
            } else if (response.status === 101) {
                toast.error("Please complete your pending product!")
                push('/dashboard/history');
                setIsPressed(true);
                return;
            } else if (response.status === 404) {
                push('/dashboard/journey');
                setInsufficient(true);
                return;
            }
            else {
                setIsError(true);
                setIsPressed(false);
                // return toast.error(response.message);
                return;
            }

        } catch (error) {
            setIsError(true);
            setIsPressed(false);
            console.log(error)
        }
    }

    useEffect(() => {
        refresh();
    }, []);
    return (
        <>
            {
                isError
                    ?
                    <JourneyFailModal setIsModal={setIsError} />
                    :
                    <></>
            }
            {
                isInsufficient
                    ?
                    <InsufficientBalance setIsModal={setInsufficient} />
                    :
                    <></>
            }
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
        </>
    )
}

export default ValidateJourney