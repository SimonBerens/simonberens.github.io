import {defineConfig, HeadConfig} from 'vitepress'
import { katex } from '@mdit/plugin-katex';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Simon Berens",
  description: "Simon Berens' Blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  },

  head: [[
    'link',
    {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css', integrity: 'sha384-3UiQGuEI4TTMaFmGIZumfRPtfKQ3trwQE2JgosJxCnGmQpL/lJdjpcHkaaFwHlcI', crossorigin: 'anonymous'}
  ],[
    'link',
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'}
  ],[
    'link',
    {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'}
  ],[
    'link',
    {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap', crossorigin: 'anonymous'}
  ]],
  markdown: {
    config: md => {
      md.use(katex)
    }
  }
})
