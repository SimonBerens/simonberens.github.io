/** @type {import("prettier").Config} */
const config = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: false,
    singleQuote: false,
    overrides: [
        {
            files: ["*.{yml,yaml,json,css,vue}"],
            options: {
                tabWidth: 2,
            },
        },
    ],
}

export default config
