export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json', // Certifique-se de que esse arquivo existe
      },
    },
  };  