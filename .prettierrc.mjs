/** @type {import("prettier").Config} */
export default {
  useTabs: true,
  trailingComma: "es5",
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.svelte',
      options: {
        parser: 'svelte',
      },
    },
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};