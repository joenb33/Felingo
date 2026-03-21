import { useAppStore } from "@/store/useAppStore";
import { ui } from "@/i18n/ui";

interface FavoriteButtonProps {
  cardId: string;
  className?: string;
}

export function FavoriteButton({ cardId, className = "" }: FavoriteButtonProps) {
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const isFavorite = useAppStore((s) => s.favorites.includes(cardId));

  return (
    <button
      onClick={() => toggleFavorite(cardId)}
      className={`
        flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-200
        ${isFavorite
          ? "border-[rgba(255,214,10,0.35)] bg-[rgba(255,214,10,0.15)] text-[#FFD60A]"
          : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] text-[rgba(235,235,245,0.5)] hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.12)] hover:text-white"
        }
        ${className}
      `}
      aria-label={isFavorite ? ui.aria.removeFavorite : ui.aria.addFavorite}
      title={isFavorite ? ui.aria.saved : ui.aria.save}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  );
}
