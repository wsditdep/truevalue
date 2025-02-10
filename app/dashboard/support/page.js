import { fetchSetting, fetchSupport } from '@/app/actions/notice/data';
import { fetchAuthenticatedUser } from '@/app/actions/user/data';
import { auth } from '@/app/auth';
import SecurityCheck from '@/components/checkSecurityCode/CheckSecurityCode';
import Support from '@/components/support/Support';

export const dynamic = "force-dynamic";

const page = async () => {

    const { user: logedinUser } = await auth();
    const user = await fetchAuthenticatedUser();

    const setting = await fetchSetting() || {};
    const support = await fetchSupport() || {};

    return (
        <>
            <Support 
            setting={JSON.parse(JSON.stringify(setting))} 
            support={JSON.parse(JSON.stringify(support))} 
            authUser={JSON.parse(JSON.stringify(user))}     
            />
            <SecurityCheck
                user={JSON.parse(JSON.stringify(logedinUser))}
                authenticatedUser={JSON.parse(JSON.stringify(user))}
            />
        </>
    )
}

export default page