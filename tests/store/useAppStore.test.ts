import { describe, it, expect, beforeEach } from "vitest";
import { useAppStore } from "@/store/useAppStore";

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.getState().resetProgress();
  });

  it("starts with empty state", () => {
    const state = useAppStore.getState();
    expect(state.seenCards).toEqual([]);
    expect(state.favorites).toEqual([]);
    expect(state.lastSection).toBeNull();
    expect(state.streak).toBe(0);
  });

  it("marks cards as seen", () => {
    useAppStore.getState().markSeen("test_1");
    expect(useAppStore.getState().seenCards).toContain("test_1");
  });

  it("does not duplicate seen cards", () => {
    useAppStore.getState().markSeen("test_1");
    useAppStore.getState().markSeen("test_1");
    expect(
      useAppStore.getState().seenCards.filter((id) => id === "test_1"),
    ).toHaveLength(1);
  });

  it("toggles favorites on", () => {
    useAppStore.getState().toggleFavorite("fav_1");
    expect(useAppStore.getState().favorites).toContain("fav_1");
  });

  it("toggles favorites off", () => {
    useAppStore.getState().toggleFavorite("fav_1");
    useAppStore.getState().toggleFavorite("fav_1");
    expect(useAppStore.getState().favorites).not.toContain("fav_1");
  });

  it("checks isFavorite", () => {
    expect(useAppStore.getState().isFavorite("fav_1")).toBe(false);
    useAppStore.getState().toggleFavorite("fav_1");
    expect(useAppStore.getState().isFavorite("fav_1")).toBe(true);
  });

  it("sets last section", () => {
    useAppStore.getState().setLastSection("interview");
    expect(useAppStore.getState().lastSection).toBe("interview");
  });

  it("increments streak", () => {
    useAppStore.getState().incrementStreak();
    useAppStore.getState().incrementStreak();
    expect(useAppStore.getState().streak).toBe(2);
  });

  it("resets all progress", () => {
    useAppStore.getState().markSeen("test_1");
    useAppStore.getState().toggleFavorite("fav_1");
    useAppStore.getState().setLastSection("backstage");
    useAppStore.getState().incrementStreak();

    useAppStore.getState().resetProgress();

    const state = useAppStore.getState();
    expect(state.seenCards).toEqual([]);
    expect(state.favorites).toEqual([]);
    expect(state.lastSection).toBeNull();
    expect(state.streak).toBe(0);
  });
});
