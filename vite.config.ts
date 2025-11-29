import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { cloudflare } from '@cloudflare/vite-plugin'
import svgr from 'vite-plugin-svgr';

const config = defineConfig({
  plugins: [
    devtools(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart({
			prerender: {
				enabled: true,
			},
			sitemap: {
				enabled: true,
				host: 'https://uidb.ambroos.io',
			}
		}),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    svgr(),
  ],
})

export default config
