import { News, columns } from "../elements/News";
import { DataTable } from "../elements/DataTable";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { secondsToDate } from "@/utils/dateManipulator";
import TableLoader from "@/elements/TableLoader";

async function getData(): Promise<News[]> {
  const response = await fetch(
    `${import.meta.env.VITE_NODE_API_URL}/api/getNews`,
  );
  const res = await response.json();

  return res.data;
}

export default function NewsTable() {
  const { data, error, isLoading } = useQuery<News[]>({
    queryKey: ["news"],
    queryFn: getData,
  });

  if (data && data.length >= 3) {
    let index = 0;
    const intervalID = setInterval(() => {
      const news = data[index];
      toast.info(`${news.title}`, {
        description: `${secondsToDate(news.date)}`,
      });
      index++;
      if (index >= 3) {
        clearInterval(intervalID);
      }
    }, 1500);

    setTimeout(() => {
      toast.success(
        "Join the Newsletter to get these updates right in your inbox",
      );
    }, 9696);
  }

  if (error) {
    return (
      <section className="flex h-screen flex-col items-center justify-center gap-6 lg:gap-8">
        <TableLoader />
        <div className="flex flex-col items-center gap-4">
          <p className="select-none text-center font-subHeading text-xl text-primary lg:text-3xl">
            Error Connecting To Server
          </p>
          <a
            href="mailto:amanchandinc@gmail.com?subject=Bug Report - NewsBit"
            className="select-none text-2xl text-dark underline decoration-primary underline-offset-4 duration-300 hover:text-primary dark:text-light dark:hover:text-primary"
          >
            Report Issue
          </a>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="flex h-screen flex-col items-center justify-center gap-8 lg:gap-12">
        <TableLoader />
        <p className="select-none text-center font-subHeading text-xl text-primary lg:text-3xl">
          Loading News
        </p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="flex h-screen flex-col items-center justify-center gap-8 lg:gap-12">
        <TableLoader />
        <div className="flex flex-col items-center gap-4">
          <p className="select-none text-center font-subHeading text-xl text-primary lg:text-3xl">
            No News Found
          </p>
          <a
            href="mailto:amanchandinc@gmail.com?subject=Bug Report - NewsBit"
            className="text-2xl text-dark underline decoration-primary underline-offset-4 duration-300 hover:text-primary dark:text-light dark:hover:text-primary"
          >
            Report Issue
          </a>
        </div>
      </section>
    );
  }

  return (
    <div className="container">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
