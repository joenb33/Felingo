import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ui } from "@/i18n/ui";

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function StarIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  const location = useLocation();
  const isPanic = location.pathname === "/panic";

  if (isPanic) return null;

  return (
    <header className="sticky top-0 z-50 w-full pt-safe glass border-b border-[rgba(255,255,255,0.06)]">
      <div className="layout-wide flex h-14 items-center justify-between gap-3 md:h-[3.5rem]">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 rounded-xl py-1 transition-opacity hover:opacity-80 active:opacity-60"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#BF5AF2] to-[#FF375F] shadow-[0_2px_8px_rgba(191,90,242,0.5)]">
            <span className="text-[10px] font-bold tracking-wide text-white">
              Fe
            </span>
          </div>
          <div className="leading-tight">
            <span className="block text-[15px] font-bold text-white tracking-[-0.3px]">
              Felingo
            </span>
            <span className="block text-[10px] font-semibold text-[rgba(235,235,245,0.50)] uppercase tracking-[0.15em]">
              Eurovision
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-full bg-[rgba(255,255,255,0.06)] p-1 ring-1 ring-[rgba(255,255,255,0.06)]">
            <NavLink to="/" current={location.pathname} icon={<HomeIcon />}>
              {ui.nav.home}
            </NavLink>
            <NavLink
              to="/favorites"
              current={location.pathname}
              icon={<StarIcon active={location.pathname === "/favorites"} />}
            >
              {ui.nav.saved}
            </NavLink>
          </div>
          <Link
            to="/panic"
            className="inline-flex h-9 items-center rounded-full bg-[rgba(255,55,95,0.15)] px-3.5 text-[12px] font-semibold text-[#FF375F] ring-1 ring-[rgba(255,55,95,0.25)] transition-all hover:bg-[rgba(255,55,95,0.22)] hover:ring-[rgba(255,55,95,0.4)] active:scale-[0.97] sm:px-4 sm:text-[13px]"
          >
            ⚡ {ui.nav.quick}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  to,
  current,
  children,
  icon,
}: {
  to: string;
  current: string;
  children: ReactNode;
  icon: ReactNode;
}) {
  const isActive = current === to;
  return (
    <Link
      to={to}
      className={`
        inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-all duration-150 active:scale-[0.97]
        ${
          isActive
            ? "bg-white text-[#0C0B10] shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
            : "text-[rgba(235,235,245,0.6)] hover:text-white"
        }
      `}
    >
      <span className={isActive ? "text-[#0C0B10]" : ""} aria-hidden>
        {icon}
      </span>
      <span className="hidden sm:inline">{children}</span>
      <span className="sr-only sm:hidden">{children}</span>
    </Link>
  );
}
