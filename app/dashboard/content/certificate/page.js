import { fetchContent } from '@/app/actions/content/data'
import Certificate from '@/components/content/Certificate';

export const dynamic = "force-dynamic"

const page = async () => {
    return (
        <Certificate />
    )
}

export default page