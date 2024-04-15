import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { CommandList } from "cmdk";

const branches: Array<{ value: string; label: string }> = [];

const branchNames = ["BIT", "CSIT", "MIT", "M.Sc.CSIT"];

for (let i = 1; i <= 8; i++) {
  branchNames.forEach((branchName) => {
    const semesterLimit = ["MIT", "M.Sc.CSIT"].includes(branchName) ? 4 : 8;

    if (i <= semesterLimit) {
      const romanNumeral = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][
        i - 1
      ];
      const value = `${branchName} ${romanNumeral}`;
      const label = `${branchName} ${romanNumeral} Sem`;
      branches.push({ value, label });
    }
  });
}
function Newsletter() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [branch, setBranch] = useState("");
  const [open, setOpen] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (!branch) {
        toast.error("Please select a branch");
        return;
      }

      const branchName = branch.split(" ")[0].trim();
      const semester = branch.split(" ")[1].trim();
      const email = emailRef.current?.value.toLowerCase().trim();

      const response = await fetch(
        `${import.meta.env.VITE_NODE_API_URL}/api/saveEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            branch: branchName,
            semester,
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      if (emailRef.current) {
        emailRef.current.value = "";
      }
      setBranch("");

      if (response.status === 200) {
        toast.success("Email saved successfully");
      } else {
        toast.error("Failed to save email", {
          description: data.message,
        });
      }
    } catch (error) {
      if (emailRef.current) {
        emailRef.current.value = "";
      }
      setBranch("");
      toast.error("Failed to save email", {
        description: "Couldn't connect to the server. Please try again later.",
      });
    }
  }

  return (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:rounded-3xl">
      <h2 className="mx-auto max-w-2xl text-center font-heading text-3xl font-bold tracking-tight text-dark dark:text-light sm:text-4xl">
        Get notified when you have a new notice
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-darkAccent dark:text-lightAccent">
        We will send you an email only when there is a new notice regarding your
        specific branch.
      </p>
      <form
        className="mx-auto mt-10 flex max-w-md flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              name="email"
              type="email"
              ref={emailRef}
              required
              className="w-[250px] flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-dark shadow-sm outline-0 ring-1 ring-inset ring-white placeholder:text-neutral-500 dark:text-light dark:ring-white/10 dark:placeholder:text-neutral-400 sm:text-sm sm:leading-6 lg:w-[200px]"
              placeholder="Enter your email"
            />
          </div>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              asChild
              className="flex items-center justify-between px-3"
            >
              <button
                role="combobox"
                aria-expanded={open}
                className="h-[2.55rem] w-[250px] rounded-md border-0 bg-white/5 text-sm text-dark shadow-sm ring-1 ring-inset ring-white dark:bg-white/5 dark:text-light dark:ring-white/10 lg:w-[200px]"
              >
                {branch
                  ? branches.find((b) => b.value === branch)?.label
                  : "Select your branch"}
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 font-text">
              <Command>
                <CommandInput placeholder="Search branch" />
                <CommandList>
                  <CommandEmpty>No branch found.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea className="h-[200px] rounded-md">
                      {branches.map((b) => (
                        <CommandItem
                          key={b.value}
                          value={b.value}
                          onSelect={(currentValue) => {
                            setBranch(
                              currentValue === branch ? "" : currentValue,
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              branch === b.value ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {b.label}
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <button
          type="submit"
          className="mx-auto w-[250px] rounded-md bg-light px-4 py-2 font-subHeading text-dark duration-500 hover:bg-primary hover:bg-primary/80 hover:text-light active:scale-[0.969] dark:bg-dark dark:text-light dark:hover:bg-primary lg:mx-0 lg:w-full"
        >
          Notify me
        </button>
      </form>
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient
            id="759c1415-0410-454c-8f7c-9a820de03641"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(512 512) rotate(90) scale(512)"
          >
            <stop stopColor="#ff80b5" />
            <stop offset={1} stopColor="#ffa31a" stopOpacity={0} />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

export default Newsletter;
