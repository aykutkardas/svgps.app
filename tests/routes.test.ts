/**
 * Store URLs (/store/[iconSet]/[variant]) and the `iconSetName` values queried
 * by /api/icon-set are derived from these slugs, so they must never change.
 */
import { expect, it } from "vitest";

import iconSets, { VARIANTS } from "src/iconSets";

it("keeps icon set and variant slugs stable", () => {
  expect({
    variants: Object.fromEntries(
      Object.entries(VARIANTS).map(([key, { slug }]) => [key, slug]),
    ),
    iconSets: iconSets.map(({ slug, variants }) => ({
      slug,
      variants: variants?.map((variant) => variant.slug),
    })),
  }).toMatchSnapshot();
});
