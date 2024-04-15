function Hero() {
  return (
    <div className="relative isolate flex h-screen items-center px-2 pt-10 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ffa31a] to-[#ff80b5] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="hidden md:mb-8 md:flex md:justify-center">
          <div className="relative flex select-none items-center gap-4 rounded-full px-4 py-2 text-sm leading-6 text-dark ring-1 ring-gray-900/10 duration-300 hover:ring-gray-900/20 dark:text-light dark:ring-gray-500 hover:dark:ring-gray-100">
            <span>Best place to get the latest notices and updates</span>
            <a
              href="https://github.com/Aman-in-GitHub/NewsBit-TheNewsletterForIOST/blob/main/README.md"
              target="_blank"
              className="font-semibold text-primary hover:underline"
            >
              <span className="absolute inset-0" aria-hidden="true"></span>
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-heading text-4xl tracking-tight text-dark dark:text-primary lg:text-6xl">
            <span className="text-primary dark:text-light">The</span> Newsletter
            to get the latest news and updates
          </h1>
          <p className="mt-6 text-lg leading-8 text-darkAccent dark:text-lightAccent">
            Stay informed effortlessly with your branch-specific updates,
            ensuring you're always in the know about the latest notices and news
            relevant to your academic pursuits.{" "}
            <p className="block lg:inline">
              Source:{" "}
              <a
                href="https://iost.tu.edu.np"
                className="whitespace-nowrap text-primary hover:underline"
                target="_blank"
              >
                TU IOST
              </a>
            </p>
          </p>
          <div className="mt-10 flex items-center justify-center">
            <button
              className="rounded-md bg-primary px-4 py-2 font-subHeading text-light duration-300 hover:bg-primary/80 active:scale-[0.969]"
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
              }
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
