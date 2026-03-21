import { describe, it, expect } from "vitest";
import { fisherYatesShuffle } from "@/lib/shuffle";

describe("fisherYatesShuffle", () => {
  it("returns an array of the same length", () => {
    const input = [1, 2, 3, 4, 5];
    const result = fisherYatesShuffle(input);
    expect(result).toHaveLength(input.length);
  });

  it("does not mutate the original array", () => {
    const input = [1, 2, 3, 4, 5];
    const copy = [...input];
    fisherYatesShuffle(input);
    expect(input).toEqual(copy);
  });

  it("contains the same elements", () => {
    const input = [1, 2, 3, 4, 5];
    const result = fisherYatesShuffle(input);
    expect(result.sort()).toEqual(input.sort());
  });

  it("handles empty arrays", () => {
    expect(fisherYatesShuffle([])).toEqual([]);
  });

  it("handles single-element arrays", () => {
    expect(fisherYatesShuffle([42])).toEqual([42]);
  });

  it("produces different orderings over many runs", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set(
      Array.from({ length: 20 }, () => fisherYatesShuffle(input).join(",")),
    );
    expect(results.size).toBeGreaterThan(1);
  });
});
