module.exports = {
  extends: ['eslint:recommended', 'prettier', "plugin:chai-expect/recommended"],
  plugins: [
    "import",
    "jsx-a11y",
    'prettier',
    'prefer-arrow'
  ],
  rules: {
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "should|expect"
      }
    ],
    'no-undef': 2,
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        singleQuote: true, 
        trailingComma: 'all',
        semi: true,
      },
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      globalReturn: true,
      generators: false,
      objectLiteralDuplicateProperties: false,
      experimentalObjectRestSpread: true,
      jsx: true
    },
    ecmaVersion: 2017,
    sourceType: "module"
  },
  env: {
    mocha: true,
    node: true,
    es6: true
  },
  globals: {
    $: true,
    require: true,
    process: true
  },
  root: true
};