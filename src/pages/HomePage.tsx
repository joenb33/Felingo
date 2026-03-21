import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { SECTION_META, type Section } from "@/data/schema";
import { getSectionCardCount } from "@/lib/content-loader";
import { ui } from "@/i18n/ui";

const sections: Section[] = ["fan-talk", "interview", "backstage"];

type SectionStyle = {
  gradient: string;
  iconBg: string;
  accent: string;
  hoverBorder: string;
  progressGradient: string;
};

const sectionStyles: Record<string, SectionStyle> = {
  "fan-talk": {
    gradient: "from-[rgba(10,132,255,0.22)] to-[rgba(90,200,250,0.06)]",
    iconBg: "from-[#0A84FF] to-[#5AC8FA]",
    accent: "#409CFF",
    hoverBorder: "rgba(10,132,255,0.4)",
    progressGradient: "from-[#0A84FF] to-[#5AC8FA]",
  },
  interview: {
    gradient: "from-[rgba(191,90,242,0.22)] to-[rgba(255,55,95,0.06)]",
    iconBg: "from-[#BF5AF2] to-[#FF375F]",
    accent: "#D483F5",
    hoverBorder: "rgba(191,90,242,0.4)",
    progressGradient: "from-[#BF5AF2] to-[#FF375F]",
  },
  backstage: {
    gradient: "from-[rgba(48,209,88,0.18)] to-[rgba(10,132,255,0.06)]",
    iconBg: "from-[#30D158] to-[#5AC8FA]",
    accent: "#4ADE80",
    hoverBorder: "rgba(48,209,88,0.35)",
    progressGradient: "from-[#30D158] to-[#5AC8FA]",
  },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HomePage() {
  const lastSection = useAppStore((s) => s.lastSection);
  const seenCards = useAppStore((s) => s.seenCards);

  return (
    <main className="flex-1 w-full">
      <div className="layout-wide">
        {/* ── Hero ─────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pt-10 pb-10 sm:pt-14 sm:pb-12 md:pt-16"
        >
          {/* Eyebrow badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(191,90,242,0.12)] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.15em] text-[#BF5AF2] ring-1 ring-[rgba(191,90,242,0.2)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#BF5AF2] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#BF5AF2]" />
              </span>
              {ui.home.tagline}
            </span>
          </div>

          {/* Main heading */}
          <div className="text-center max-w-2xl mx-auto px-2">
            <h1 className="text-[3rem] font-extrabold leading-[1.05] tracking-[-2px] text-white sm:text-[4.5rem] md:text-[5.5rem]">
              Hej,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #BF5AF2 0%, #FF375F 60%, #FFD60A 100%)",
                }}
              >
                Felicia
              </span>
              !
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-[rgba(235,235,245,0.50)] sm:text-[18px] md:text-[20px]">
              {ui.home.heroLead}
            </p>
          </div>

          {/* Continue button */}
          {lastSection && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-8 flex justify-center"
            >
              <Link to={`/session/${lastSection}`}>
                <button className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0C0B10] shadow-[0_4px_20px_rgba(255,255,255,0.15)] transition-all hover:shadow-[0_6px_28px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0C0B10" aria-hidden>
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Fortsätt: {SECTION_META[lastSection]?.title ?? lastSection}
                </button>
              </Link>
            </motion.div>
          )}

          {/* Stats pill */}
          {seenCards.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex justify-center"
            >
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[rgba(48,209,88,0.10)] px-5 py-2.5 ring-1 ring-[rgba(48,209,88,0.18)]">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#30D158]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-[13px] font-medium text-[rgba(235,235,245,0.7)]">
                  <span className="font-bold text-white">{seenCards.length}</span>{" "}
                  {ui.home.cardsPracticed}
                </span>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* ── Section grid ──────────────────────────────────── */}
        <section className="pb-24 md:pb-16">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5"
          >
            {sections.map((sectionKey) => {
              const meta = SECTION_META[sectionKey];
              const style = sectionStyles[sectionKey]!;
              const count = getSectionCardCount(sectionKey);
              const seenInSection = seenCards.filter((id) =>
                id.startsWith(sectionKey.replace("-", "_").substring(0, 3)),
              ).length;
              const progress = count > 0 ? Math.round((seenInSection / count) * 100) : 0;

              return (
                <motion.div key={sectionKey} variants={item}>
                  <Link to={`/session/${sectionKey}`} className="group block h-full">
                    <div
                      className={`relative flex h-full flex-col overflow-hidden rounded-[20px] border bg-gradient-to-br ${style.gradient} p-7 min-h-[200px] transition-all duration-300 ease-out sm:p-8`}
                      style={{
                        borderColor: "rgba(255,255,255,0.09)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = style.hoverBorder;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px ${style.hoverBorder}, inset 0 1px 0 rgba(255,255,255,0.09)`;
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.09)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      }}
                    >
                      {/* Icon + count row */}
                      <div className="mb-6 flex items-center justify-between">
                        <div
                          className={`flex h-13 w-13 items-center justify-center rounded-[15px] bg-gradient-to-br ${style.iconBg} text-[24px] shadow-[0_2px_14px_rgba(0,0,0,0.45)]`}
                        >
                          {meta.icon}
                        </div>
                        <span className="rounded-full bg-[rgba(255,255,255,0.1)] px-3.5 py-1.5 text-[12px] font-medium text-[rgba(235,235,245,0.55)]">
                          {count} {ui.home.cardsLabel}
                        </span>
                      </div>

                      {/* Text */}
                      <div className="mb-6 space-y-2">
                        <h3 className="text-[18px] font-bold leading-tight text-white tracking-[-0.3px]">
                          {meta.title}
                        </h3>
                        <p className="text-[14px] leading-relaxed text-[rgba(235,235,245,0.5)]">
                          {meta.description}
                        </p>
                      </div>

                      {/* Progress or CTA */}
                      {seenInSection > 0 ? (
                        <div className="mt-auto space-y-2.5">
                          <div className="flex justify-between text-[12px] text-[rgba(235,235,245,0.45)]">
                            <span>{progress}% {ui.home.progressDone}</span>
                            <span className="tabular-nums">{seenInSection}/{count}</span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(255,255,255,0.1)]">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${style.progressGradient} transition-all duration-500`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="mt-auto flex items-center gap-2 text-[14px] font-semibold" style={{ color: style.accent }}>
                          {ui.home.startPractice}
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Bottom row: Favorites + Panic ─────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="mt-4 grid gap-4 sm:grid-cols-2 md:gap-5"
          >
            {/* Favorites */}
            <motion.div variants={item}>
              <Link to="/favorites" className="group block h-full">
                <div
                  className="flex h-full items-center gap-5 rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,214,10,0.06)] p-6 transition-all duration-300 sm:gap-6 sm:p-7"
                  style={{
                    boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,214,10,0.3)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#FFD60A] to-[#FF9F0A] text-[22px] shadow-[0_2px_12px_rgba(255,214,10,0.35)]">
                    ⭐
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[16px] font-semibold text-white tracking-[-0.2px]">{ui.home.savedTitle}</p>
                    <p className="mt-1 text-[13px] leading-snug text-[rgba(235,235,245,0.45)]">{ui.home.savedDesc}</p>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </Link>
            </motion.div>

            {/* Panic mode */}
            <motion.div variants={item}>
              <Link to="/panic" className="group block h-full">
                <div
                  className="flex h-full items-center gap-5 rounded-[20px] border border-[rgba(255,55,95,0.18)] bg-[rgba(255,55,95,0.08)] p-6 transition-all duration-300 sm:gap-6 sm:p-7"
                  style={{
                    boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,55,95,0.35)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,55,95,0.18)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#FF375F] to-[#FF453A] text-[22px] shadow-[0_2px_12px_rgba(255,55,95,0.4)]">
                    ⚡
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[16px] font-semibold text-white tracking-[-0.2px]">{ui.home.panicLink}</p>
                    <p className="mt-1 text-[13px] leading-snug text-[rgba(235,235,245,0.45)]">Korta fraser för stressiga stunder</p>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
