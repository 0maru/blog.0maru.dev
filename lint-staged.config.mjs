export default {
  '*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}': [
    'biome check --write --no-errors-on-unmatched .',
  ],
  '*.{md,yml,yaml,astro}': ['prettier --write .'],
};
