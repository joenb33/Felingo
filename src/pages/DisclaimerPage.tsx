import { Link } from "react-router-dom";
import { ui } from "@/i18n/ui";

export function DisclaimerPage() {
  const year = new Date().getFullYear();

  return (
    <main className="layout-narrow flex-1 py-8 pb-16 md:py-12">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[rgba(235,235,245,0.5)] transition-colors hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {ui.disclaimer.back}
        </Link>
      </div>

      <h1 className="mb-2 text-[26px] font-bold tracking-[-0.5px] text-white md:text-[30px]">
        {ui.disclaimer.title}
      </h1>
      <p className="mb-10 text-[14px] text-[rgba(235,235,245,0.45)]">{ui.disclaimer.subtitle}</p>

      <div className="space-y-10 text-[15px] leading-relaxed text-[rgba(235,235,245,0.78)]">
        <section>
          <h2 className="mb-3 text-[17px] font-semibold text-white">{ui.disclaimer.aboutHeading}</h2>
          <p className="whitespace-pre-line">{ui.disclaimer.aboutBody}</p>
        </section>

        <section>
          <h2 className="mb-3 text-[17px] font-semibold text-white">{ui.disclaimer.liabilityHeading}</h2>
          <p className="whitespace-pre-line">{ui.disclaimer.liabilityBody}</p>
        </section>

        <section>
          <h2 className="mb-3 text-[17px] font-semibold text-white">{ui.disclaimer.copyrightHeading}</h2>
          <p>{ui.disclaimer.copyrightBody(year)}</p>
        </section>

        <section>
          <h2 className="mb-3 text-[17px] font-semibold text-white">{ui.disclaimer.aiHeading}</h2>
          <p>{ui.disclaimer.aiBody}</p>
        </section>

        <section>
          <h2 className="mb-3 text-[17px] font-semibold text-white">{ui.disclaimer.eurovisionHeading}</h2>
          <p>{ui.disclaimer.eurovisionBody}</p>
        </section>
      </div>
    </main>
  );
}
