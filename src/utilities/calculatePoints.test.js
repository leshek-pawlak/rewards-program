import calculatePoints from "./calculatePoints";

describe("calculatePoints", () => {
  test("returns 0 points for amounts less than or equal to 50", () => {
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(30)).toBe(0);
  });

  test("returns points equal to amount - 50 for amounts between 51 and 100", () => {
    expect(calculatePoints(75)).toBe(25);
    expect(calculatePoints(100)).toBe(50);
  });

  test("returns points equal to 2 * (amount - 100) + 50 for amounts greater than 100", () => {
    expect(calculatePoints(120)).toBe(90);
    expect(calculatePoints(200)).toBe(250);
  });
});
