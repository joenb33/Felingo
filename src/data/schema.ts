export type Section = "fan-talk" | "interview" | "backstage" | "panic";

export type CardType = "phrase" | "dialogue" | "choice" | "fun";

export interface PhraseCard {
  id: string;
  type: "phrase";
  en: string;
  sv: string;
  section: Section;
  tags?: string[];
}

export interface DialogueLine {
  speaker: "other" | "you";
  text: string;
  /** Swedish gloss — English `text` is the practice line / TTS source. */
  textSv: string;
}

export interface DialogueCard {
  id: string;
  type: "dialogue";
  scenario: string;
  scenarioSv: string;
  lines: DialogueLine[];
  section: Section;
}

export interface ChoiceOption {
  text: string;
  correct: boolean;
  feedback: string;
  /** Förklaring efter val — alltid på svenska i UI. */
  feedbackSv: string;
}

export interface ChoiceCard {
  id: string;
  type: "choice";
  prompt: string;
  promptSv: string;
  options: ChoiceOption[];
  section: Section;
}

export interface FunCard {
  id: string;
  type: "fun";
  prompt: string;
  /** Svensk rubrik/förklaring — engelska `prompt` oförändrad. */
  promptSv: string;
  templates: string[];
  /** Svenska motsvarigheter till varje `templates`-rad (samma ordning). */
  templatesSv: string[];
  section: Section;
}

export type ContentCard = PhraseCard | DialogueCard | ChoiceCard | FunCard;

export interface AppState {
  seenCards: string[];
  favorites: string[];
  lastSection: Section | null;
  streak: number;
}

export const DEFAULT_APP_STATE: AppState = {
  seenCards: [],
  favorites: [],
  lastSection: null,
  streak: 0,
};

/** Rubriker & beskrivningar för UI (svenska). Övningsinnehållet är på engelska i datan. */
export const SECTION_META: Record<
  Section,
  { title: string; description: string; icon: string }
> = {
  "fan-talk": {
    title: "Prata med fans",
    description: "Möten, tack, småprat — inför och under Eurovisionveckan",
    icon: "💬",
  },
  interview: {
    title: "Intervjuläge",
    description: "Press, TV och korta svar när många lyssnar",
    icon: "🎙️",
  },
  backstage: {
    title: "Engelska backstage",
    description: "Scen, ljud, crew och logistik — tydligt och enkelt",
    icon: "🎸",
  },
  panic: {
    title: "Snabbfraser",
    description: "Korta engelska rader när det stressar eller krånglar",
    icon: "💬",
  },
};
