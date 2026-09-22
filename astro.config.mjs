// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://winmaildatopener.com',
	i18n: {
		locales: ['en', 'de', 'es', 'ja'],
		defaultLocale: 'en',
		prefixDefaultLocale: false,
	},
	integrations: [
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en-US',
					de: 'de-DE',
					es: 'es-ES',
					ja: 'ja-JP',
				},
			},
		}),
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
