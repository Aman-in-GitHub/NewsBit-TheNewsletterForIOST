import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { secondsToDate } from "@/utils/dateManipulator";
import { downloadPDF } from "@/utils/downloadPDF";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ArrowDownToLine,
  SquareArrowOutUpRight,
} from "lucide-react";

export type News = {
  index: number;
  title: string;
  date: string;
  pdf: string;
  download: string;
  url: string;
};

export const columns: ColumnDef<News>[] = [
  {
    accessorKey: "index",
    header: "ID",
    cell: ({ row }) => (
      <div className="select-none text-center">{row.getValue("index")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-right">
        {secondsToDate(row.getValue("date"))}
      </div>
    ),
  },
  {
    accessorKey: "url",
    header: "Source",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        <a
          href={row.getValue("url")}
          target="_blank"
          className="group flex items-center gap-2 decoration-primary hover:underline"
        >
          <span>Visit Site</span>
          <SquareArrowOutUpRight className="h-4 w-4 duration-300 group-hover:text-primary" />
        </a>
      </div>
    ),
  },
  {
    accessorKey: "pdfUrl",
    header: "PDF",
    cell: ({ row }) => (
      <div className="">
        <a
          href={row.getValue("pdfUrl")}
          target="_blank"
          className="decoration-primary hover:underline"
        >
          {row.getValue("pdfUrl")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "download",
    header: "Download",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TooltipTrigger asChild>
                <ArrowDownToLine
                  className="size-6 duration-300 hover:text-primary active:scale-[0.90]"
                  onClick={() =>
                    downloadPDF(row.getValue("pdfUrl"), row.getValue("title"))
                  }
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Download PDF</p>
              </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
];
