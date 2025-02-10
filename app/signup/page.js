import SignUp from "@/components/auth/SignUp";

export const dynamic = "force-dynamic"

const page = () => {
    return (
        <>
            <section className="auth-page-section">
                <div className="auth-page-wrapper">
                    <SignUp />
                </div>
            </section>
        </>
    )
}
export default page