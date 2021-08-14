module.exports = {
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: [
          "tsconfig.*?.json",
          "e2e/tsconfig.json"
        ],
        createDefaultProgram: true
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        'airbnb-typescript/base',
        "prettier",
        'plugin:prettier/recommended'
      ],
      rules: {
        'linebreak-style': 'off',
        "import/prefer-default-export": "off",
        'arrow-parens': 'off',
        'class-methods-use-this': 'off',
        'consistent-return': 'off',
        'prefer-template': 'off',
        'object-curly-newline': 'off',
        'no-mixed-operators': 'off',
        'arrow-body-style': 'off',
        'function-paren-newline': 'off',
        'no-plusplus': 'off',
        'space-before-function-paren': 0,
        'max-len': ['error', 100, 2, { ignoreUrls: true }],
        'no-console': 'error',
        'no-alert': 'off',
        'prettier/prettier': ['error']
      }
    },
    {
      files: ["*.component.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {
        "max-len": ["error", {"code": 140}]
      }
    },
    {
      files: ["*.component.ts"],
      extends: ["plugin:@angular-eslint/template/process-inline-templates"]
    }
  ]
};
