import { useState, useCallback, useMemo } from "react";
import type { ContentCard, Section } from "@/data/schema";
import { getSessionCards } from "@/lib/content-loader";
import { useAppStore } from "@/store/useAppStore";

interface UseSessionReturn {
  cards: ContentCard[];
  currentIndex: number;
  currentCard: ContentCard | undefined;
  isComplete: boolean;
  progress: number;
  next: () => void;
  previous: () => void;
  restart: () => void;
}

export function useSession(section: Section, count = 5): UseSessionReturn {
  const seenCards = useAppStore((s) => s.seenCards);
  const markSeen = useAppStore((s) => s.markSeen);
  const setLastSection = useAppStore((s) => s.setLastSection);

  const [cards, setCards] = useState<ContentCard[]>(() =>
    getSessionCards(section, seenCards, count),
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCard = useMemo(() => cards[currentIndex], [cards, currentIndex]);

  const isComplete = currentIndex >= cards.length;
  const progress =
    cards.length > 0 ? Math.min(currentIndex / cards.length, 1) : 0;

  const next = useCallback(() => {
    if (currentCard) {
      markSeen(currentCard.id);
    }
    setLastSection(section);
    setCurrentIndex((i) => i + 1);
  }, [currentCard, markSeen, setLastSection, section]);

  const previous = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const restart = useCallback(() => {
    setCards(getSessionCards(section, seenCards, count));
    setCurrentIndex(0);
  }, [section, seenCards, count]);

  return {
    cards,
    currentIndex,
    currentCard,
    isComplete,
    progress,
    next,
    previous,
    restart,
  };
}
