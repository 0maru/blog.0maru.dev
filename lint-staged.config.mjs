export default {
  '*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc,astro}': [
    'biome check --write --no-errors-on-unmatched',
  ],
  '*.{md,yml,yaml}': ['prettier --write'],
};
