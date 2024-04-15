import { ModeToggle } from "@/components/mode-toggle";
import Logo from "./Logo";
import { GithubIcon } from "lucide-react";

function Navbar() {
  return (
    <nav className="absolute left-0 top-0 z-50 flex w-full select-none items-center justify-between px-4 py-4 shadow-sm backdrop-blur-[6.9px] dark:shadow-darkAccent/20 lg:px-20 lg:py-5 3xl:px-64">
      <div className="relative">
        <Logo />
        <span className="absolute bottom-0 right-0 font-text text-[9.69px] text-dark dark:text-light">
          <span className="text-dark dark:text-light">By </span>
          <a
            href="https://amanchand.com.np"
            target="_blank"
            className="text-primary hover:underline"
          >
            Aman
          </a>
        </span>
      </div>

      <div className="flex items-center gap-5 lg:gap-8">
        <a
          href="https://github.com/Aman-in-GitHub/NewsBit-TheNewsletterForIOST"
          target="_blank"
        >
          <GithubIcon className="size-[1.8rem] text-primary lg:size-[2rem]" />
        </a>
        <ModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
