function Logo() {
  return (
    <a
      href="/"
      className="flex min-w-12 items-center justify-center gap-2 lg:min-w-16 lg:gap-4"
    >
      <img src="/logo.png" alt="Logo" className="w-12 lg:w-16" />
      <span className="font-heading text-2xl text-primary lg:text-3xl">
        News<span className="text-dark dark:text-light">Bit</span>
      </span>
    </a>
  );
}

export default Logo;
