import type { ContentCard, Section } from "@/data/schema";
import { fisherYatesShuffle } from "./shuffle";

import fanTalkData from "@/data/fan-talk.json";
import interviewData from "@/data/interview.json";
import backstageData from "@/data/backstage.json";
import panicData from "@/data/panic.json";

const ALL_CONTENT: Record<Section, ContentCard[]> = {
  "fan-talk": fanTalkData as ContentCard[],
  interview: interviewData as ContentCard[],
  backstage: backstageData as ContentCard[],
  panic: panicData as ContentCard[],
};

export function getContentBySection(section: Section): ContentCard[] {
  return ALL_CONTENT[section] ?? [];
}

export function getSessionCards(
  section: Section,
  seenIds: string[],
  count = 5,
): ContentCard[] {
  const all = getContentBySection(section);
  const unseen = all.filter((card) => !seenIds.includes(card.id));
  const pool = unseen.length >= count ? unseen : all;
  return fisherYatesShuffle(pool).slice(0, count);
}

export function getAllContent(): ContentCard[] {
  return Object.values(ALL_CONTENT).flat();
}

export function getCardById(id: string): ContentCard | undefined {
  return getAllContent().find((card) => card.id === id);
}

export function getSectionCardCount(section: Section): number {
  return getContentBySection(section).length;
}
