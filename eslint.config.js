import js from '@eslint/js';

export default [
    js.configs.recommended,   // use recommended ESLint rules
    {
        rules: {
            semi: "error",
            quotes: ["error", "double"]
        }
    }
]