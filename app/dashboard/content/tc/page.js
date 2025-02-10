import { fetchContent } from '@/app/actions/content/data'
import Tc from '@/components/content/Tc';

export const dynamic = "force-dynamic"

const page = async () => {
  const content = await fetchContent() || [];
  return (
    <Tc data={JSON.parse(JSON.stringify(content))} />
  )
}

export default page