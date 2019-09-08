module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true
    },
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2019,
        ecmaFeatures: {
            modules: true,
            experimentalObjectRestSpread: true
        }
    },
    extends: [
        "eslint:recommended"
    ],
    rules: {
        'no-unused-vars': 'off',
        camelcase: "off",
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "always"]
    }
};