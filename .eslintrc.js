// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    'react/prop-types': 0,
    'linebreak-style': ['error', 'unix'],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
  },
}
