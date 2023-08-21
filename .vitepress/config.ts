import { defineConfig } from "vitepress"
import { katex } from "@mdit/plugin-katex"
import { Feed } from "feed"
import { createBlogLoader } from "../blogLoader"
import { writeFileSync } from "fs"
import * as path from "path"

const hostname = "https://www.simonberens.dev"
const authorTwitter = "https://twitter.com/sberens1"

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Simon Berens",
    description: "Simon Berens' Blog",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {
                text: "Non-Technical Writing",
                link: "https://www.simonberens.com/",
            },
        ],
        socialLinks: [
            { icon: "twitter", link: authorTwitter },
            { icon: "github", link: "https://github.com/SimonBerens" },
            {
                icon: {
                    svg: '<svg role="img" viewBox="-3 -3 28 28" xmlns="http://www.w3.org/2000/svg"><title>RSS</title><path d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z"/></svg>',
                },
                link: "/rss",
            },
        ],
    },

    head: [
        [
            "link",
            {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css",
                integrity:
                    "sha384-3UiQGuEI4TTMaFmGIZumfRPtfKQ3trwQE2JgosJxCnGmQpL/lJdjpcHkaaFwHlcI",
                crossorigin: "anonymous",
            },
        ],
        ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
        [
            "link",
            {
                rel: "preconnect",
                href: "https://fonts.gstatic.com",
                crossorigin: "anonymous",
            },
        ],
        [
            "link",
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
                crossorigin: "anonymous",
            },
        ],
    ],
    markdown: {
        config: (md) => {
            md.use(katex)
        },
    },
    buildEnd: async (config) => {
        const feed = new Feed({
            title: "Simon Berens",
            description: "My technical blog",
            id: hostname,
            link: hostname,
            language: "en",
            favicon: `${hostname}/favicon.ico`,
            copyright: "Copyright (c) 2023-present, Simon Berens",
        })

        const posts = await createBlogLoader().load()

        for (const { url, title, date } of posts) {
            feed.addItem({
                title,
                id: `${hostname}/${title}`,
                link: `${hostname + url}`,
                author: [
                    {
                        name: "Simon Berens",
                        email: "simon@simonberens.me",
                        link: authorTwitter,
                    },
                ],
                date: new Date(date.time),
            })
        }

        writeFileSync(path.join(config.outDir, "rss"), feed.rss2())
    },
})
