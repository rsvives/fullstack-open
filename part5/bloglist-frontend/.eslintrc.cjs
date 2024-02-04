module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    'cypress/globals': true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins:
    ['react-refresh', 'jest', 'cypress'],
  rules: {
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off'
  }
}
