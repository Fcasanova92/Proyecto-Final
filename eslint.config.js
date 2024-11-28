import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest', // Usa la versión más reciente de ECMAScript
        sourceType: 'module', // Usa el tipo de módulo
      },
    },
    plugins: {
      prettier: eslintPluginPrettier, // Integra Prettier con ESLint
    },
    rules: {
      // Regla para Prettier
      'prettier/prettier': [
        'error',
        {
          semi: true, // Usar punto y coma
          singleQuote: true, // Usar comillas simples
          trailingComma: 'es5', // Trailing commas en objetos y arrays en ES5
          arrowParens: 'always', // Siempre usar paréntesis en funciones flecha
          endOfLine: 'auto', // El tipo de salto de línea se ajusta automáticamente al sistema
          tabWidth: 2, // Establece el tamaño de tabulación en 2 espacios
          useTabs: false, // Usar espacios, no tabulaciones
        },
      ],
      // Desactivamos la regla de indentación en ESLint porque Prettier la maneja
      indent: 'off',
      semi: ['error', 'always'], // Siempre usar punto y coma
      quotes: ['error', 'single'], // Comillas simples
      'no-console': 'warn', // Advertencia si se usa console.log
      'no-unused-vars': ['warn'], // Advertencia si hay variables no utilizadas
    },
  },
];
