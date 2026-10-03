// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";

import api from "src/api/index";
import { updateCollection } from "src/api/collection";

const sentHeaders: Record<string, unknown>[] = [];

beforeEach(() => {
  localStorage.clear();
  sentHeaders.length = 0;
  api.defaults.adapter = async (config) => {
    sentHeaders.push(config.headers.toJSON());
    if (config.method === "put") throw new Error("network down");
    return { data: {}, status: 200, statusText: "OK", headers: {}, config };
  };
});

describe("api client", () => {
  it("sends the current session token on every request", async () => {
    await api.get("/collections");
    localStorage.setItem("session", JSON.stringify({ token: "t1" }));
    await api.get("/collections");

    expect(sentHeaders[0].session).toBeUndefined();
    expect(sentHeaders[1].session).toBe("t1");
  });

  it("returns errors from updateCollection as { error }", async () => {
    const result = await updateCollection("1", { name: "x" });
    expect(result.error).toBeInstanceOf(Error);
  });
});
