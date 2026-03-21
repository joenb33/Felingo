import { AnimatePresence } from "framer-motion";
import type { ContentCard } from "@/data/schema";
import { PhraseCard } from "@/components/cards/PhraseCard";
import { DialogueCard } from "@/components/cards/DialogueCard";
import { ChoiceCard } from "@/components/cards/ChoiceCard";
import { FunCard } from "@/components/cards/FunCard";

interface SessionPlayerProps {
  card: ContentCard;
}

export function SessionPlayer({ card }: SessionPlayerProps) {
  return (
    <AnimatePresence mode="wait">
      <div key={card.id} className="mb-8 md:mb-10">
        {renderCard(card)}
      </div>
    </AnimatePresence>
  );
}

function renderCard(card: ContentCard) {
  switch (card.type) {
    case "phrase":
      return <PhraseCard card={card} />;
    case "dialogue":
      return <DialogueCard card={card} />;
    case "choice":
      return <ChoiceCard card={card} />;
    case "fun":
      return <FunCard card={card} />;
    default: {
      const _exhaustive: never = card;
      void _exhaustive;
      return null;
    }
  }
}
