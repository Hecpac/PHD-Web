import { beforeEach, describe, expect, it } from "vitest";
import { _clearStoreForTesting, checkRateLimit } from "./rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    _clearStoreForTesting();
  });

  it("allows requests up to the limit", () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit("contact:1.2.3.4").allowed).toBe(true);
    }
  });

  it("blocks the request that exceeds the limit", () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit("contact:1.2.3.4");
    }
    const result = checkRateLimit("contact:1.2.3.4");
    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.retryAfterMs).toBeGreaterThan(0);
    }
  });

  it("tracks separate counters per key (different IPs are independent)", () => {
    for (let i = 0; i < 5; i++) {
      checkRateLimit("contact:1.2.3.4");
    }
    // Exhausted for IP A — IP B should still be allowed
    expect(checkRateLimit("contact:9.9.9.9").allowed).toBe(true);
  });
});
