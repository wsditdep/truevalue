import { fetchNotice } from "@/app/actions/notice/data";
import Loader from "@/components/loading/Loader";
import Welcome from "@/components/welcome/Welcome";

export default async function Home() {
  const notice = await fetchNotice() || [];
  return (
    <>
      <Welcome notice={JSON.parse(JSON.stringify(notice))} />
    </>
  );
}
