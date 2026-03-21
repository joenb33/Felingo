import { describe, it, expect } from "vitest";
import {
  getContentBySection,
  getSessionCards,
  getAllContent,
  getCardById,
  getSectionCardCount,
} from "@/lib/content-loader";

describe("content-loader", () => {
  it("loads fan-talk content", () => {
    const cards = getContentBySection("fan-talk");
    expect(cards.length).toBeGreaterThan(0);
    cards.forEach((card) => {
      expect(card.id).toBeTruthy();
      expect(card.type).toBeTruthy();
    });
  });

  it("loads interview content", () => {
    const cards = getContentBySection("interview");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("loads backstage content", () => {
    const cards = getContentBySection("backstage");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("loads panic content", () => {
    const cards = getContentBySection("panic");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("returns session cards of requested count", () => {
    const cards = getSessionCards("fan-talk", [], 3);
    expect(cards).toHaveLength(3);
  });

  it("filters out seen cards when enough unseen remain", () => {
    const all = getContentBySection("fan-talk");
    const seenIds = all.slice(0, 3).map((c) => c.id);
    const session = getSessionCards("fan-talk", seenIds, 5);
    const sessionIds = session.map((c) => c.id);
    seenIds.forEach((id) => {
      expect(sessionIds).not.toContain(id);
    });
  });

  it("falls back to all cards when too few unseen", () => {
    const all = getContentBySection("panic");
    const seenIds = all.map((c) => c.id);
    const session = getSessionCards("panic", seenIds, 5);
    expect(session).toHaveLength(5);
  });

  it("getAllContent returns all cards from all sections", () => {
    const all = getAllContent();
    expect(all.length).toBeGreaterThan(100);
  });

  it("getCardById finds a card", () => {
    const all = getAllContent();
    const first = all[0]!;
    const found = getCardById(first.id);
    expect(found).toBeDefined();
    expect(found!.id).toBe(first.id);
  });

  it("getCardById returns undefined for missing id", () => {
    expect(getCardById("nonexistent_id")).toBeUndefined();
  });

  it("getSectionCardCount returns correct count", () => {
    const cards = getContentBySection("fan-talk");
    expect(getSectionCardCount("fan-talk")).toBe(cards.length);
  });
});
