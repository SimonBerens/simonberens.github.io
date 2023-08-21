import { createContentLoader } from "vitepress"

export interface Post {
    title: string
    url: string
    date: {
        time: number
        string: string
    }
}

function removeIndexHtmlFromUrl(url) {
    const badSuffix = "/index.html"
    if (url.endsWith(badSuffix)) {
        return url.slice(0, -badSuffix.length) + "/"
    }
    return url
}

export const createBlogLoader = () =>
    createContentLoader("blog/*/index.md", {
        transform(raw): Post[] {
            return raw
                .map(({ url, frontmatter }) => ({
                    title: frontmatter.title,
                    url: removeIndexHtmlFromUrl(url),
                    date: formatDate(frontmatter.date),
                }))
                .sort((a, b) => b.date.time - a.date.time)
        },
    })

function formatDate(raw: string): Post["date"] {
    const date = new Date(raw)
    date.setUTCHours(12)
    return {
        time: +date,
        string: date.toISOString().substring(0, 10),
    }
}
