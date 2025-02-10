import { fetchContent } from '@/app/actions/content/data'
import Faq from '@/components/content/Faq';

export const dynamic = "force-dynamic"

const page = async () => {
  const content = await fetchContent() || [];
  return (
    <Faq data={JSON.parse(JSON.stringify(content))} />
  )
}

export default page