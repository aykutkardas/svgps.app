import Link from "next/link";

import Icon from "src/components/Icon";
import NavLink from "src/components/NavLink";
import Notification from "src/components/Notification";

const Header = () => (
  <header className="relative z-20 flex h-16 w-full shrink-0 items-center justify-between">
    <Link
      href="/"
      aria-label="SVGPS home"
      className="group flex items-center gap-2 rounded-lg select-none"
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-purple-700 text-white shadow-glow transition group-hover:scale-105">
        <Icon icon="package" size={18} />
      </span>
      <span className="text-[15px] font-bold tracking-tight text-fg">
        SVGPS
      </span>
    </Link>
    <nav className="flex items-center gap-1 sm:gap-2">
      <div className="flex items-center gap-0.5 rounded-xl border border-line bg-surface/70 p-1 backdrop-blur-md">
        <NavLink href="/store">Store</NavLink>
        <NavLink href="/collection">Collection</NavLink>
      </div>
      <a
        href="https://github.com/aykutkardas/svgps.app"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="flex size-9 items-center justify-center rounded-xl text-fg-muted transition hover:bg-white/[0.06] hover:text-fg"
      >
        <Icon icon="github" size={18} />
      </a>
      {/* notifications are temporarily hidden */}
      {false && <Notification />}
    </nav>
  </header>
);

export default Header;
