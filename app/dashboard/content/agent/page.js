import { fetchContent } from '@/app/actions/content/data'
import Agent from '@/components/content/agent';

export const dynamic = "force-dynamic"

const page = async () => {
  const content = await fetchContent() || [];
  return (
    <Agent data={JSON.parse(JSON.stringify(content))} />
  )
}

export default page