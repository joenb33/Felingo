import { Link } from "react-router-dom";
import { ui } from "@/i18n/ui";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[rgba(255,255,255,0.06)] bg-[rgba(12,11,16,0.85)] pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
      <div className="layout-narrow px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[12px] leading-relaxed text-[rgba(235,235,245,0.42)]">
            <span className="font-semibold text-[rgba(235,235,245,0.55)]">
              Felingo
            </span>
            {" · "}
            {ui.footer.attribution(year)}
          </p>
          <Link
            to="/disclaimer"
            className="text-[12px] font-medium text-[rgba(235,235,245,0.5)] underline decoration-[rgba(255,255,255,0.12)] underline-offset-2 transition-colors hover:text-[rgba(235,235,245,0.75)]"
          >
            {ui.footer.disclaimerLink}
          </Link>
        </div>
      </div>
    </footer>
  );
}
