
import Signin from "@/components/auth/Signin";

export const dynamic = "force-dynamic";

const page = () => {
    return (
        <section className="auth-page-section">
            <div className="auth-page-wrapper">
                <Signin />
            </div>
        </section>
    )
}

export default page