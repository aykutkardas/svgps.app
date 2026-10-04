/**
 * Contract tests for the public /api routes: query params and response shape
 * must stay the same so existing clients keep working.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

type Row = Record<string, unknown>;

const db = vi.hoisted(() => ({ rows: [] as Row[], calls: [] as unknown[][] }));

vi.mock("src/utils/supabase", () => {
  const builder = (filter: (row: Row) => boolean = () => true) => {
    let range: [number, number] | null = null;
    const api = {
      select: (...args: unknown[]) => (db.calls.push(["select", ...args]), api),
      eq: (key: string, value: unknown) => {
        db.calls.push(["eq", key, value]);
        const prev = filter;
        filter = (row) => prev(row) && row[key] === value;
        return api;
      },
      ilike: (key: string, pattern: string) => {
        db.calls.push(["ilike", key, pattern]);
        const needle = pattern.replaceAll("%", "").toLowerCase();
        const prev = filter;
        filter = (row) =>
          prev(row) && String(row[key]).toLowerCase().includes(needle);
        return api;
      },
      range: (from: number, to: number) => {
        db.calls.push(["range", from, to]);
        range = [from, to];
        return api;
      },
      // The query builder is awaited like supabase-js, so it must be thenable.
      // biome-ignore lint/suspicious/noThenProperty: intentional thenable mock
      then: (resolve: (value: unknown) => void) => {
        const matched = db.rows.filter(filter);
        resolve({
          data: range ? matched.slice(range[0], range[1] + 1) : matched,
          count: matched.length,
          error: null,
        });
      },
    };
    return api;
  };
  return { default: { from: () => builder() } };
});

import { GET as getIconSet } from "src/app/api/icon-set/route";
import { GET as getIconSearch } from "src/app/api/icon-search/route";

const row = (i: number, iconSetName = "feather") => ({
  id: i,
  name: `icon-${i}`,
  iconSetName,
  // Icons are stored as single-quoted JSON strings in the database.
  icon: `{'paths': ['M${i} 0'], 'width': 1024}`,
  properties: `{'name': 'icon-${i}'}`,
});

beforeEach(() => {
  db.rows = [];
  db.calls = [];
});

describe("GET /api/icon-set", () => {
  it("returns a page of parsed icons with pagination info", async () => {
    db.rows = [
      ...Array.from({ length: 501 }, (_, i) => row(i)),
      row(999, "other"),
    ];

    const res = await getIconSet(
      new Request("http://localhost/api/icon-set?slug=feather&page=2"),
    );
    const body = await res.json();

    expect(Object.keys(body).sort()).toEqual(
      ["count", "icons", "page", "slug", "totalPage"].sort(),
    );
    expect(body).toMatchObject({
      slug: "feather",
      page: "2",
      count: 501,
      totalPage: 2,
    });
    expect(body.icons).toEqual([
      {
        ...row(500),
        icon: { paths: ["M500 0"], width: 1024 },
        properties: { name: "icon-500" },
      },
    ]);
  });
});

describe("GET /api/icon-search", () => {
  it("returns matches with pagination info", async () => {
    db.rows = [row(1), row(2), { ...row(3), name: "arrow" }];

    const res = await getIconSearch(
      new Request("http://localhost/api/icon-search?q=icon&page=1"),
    );
    const body = await res.json();

    expect(Object.keys(body).sort()).toEqual(
      ["count", "icons", "page", "query", "totalPage"].sort(),
    );
    expect(body).toMatchObject({
      query: "icon",
      page: "1",
      count: 2,
      totalPage: 1,
    });
    expect(body.icons.map((i) => i.properties.name)).toEqual([
      "icon-1",
      "icon-2",
    ]);
  });
});
