module.exports = {
  testMatch: ['**/?(*.)(spec|test).ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  rootDir: '.',
  transform: {
    '.(ts|tsx)': '@swc/jest',
  },
  moduleNameMapper: {
    '^@utils(.*)$': '<rootDir>/src/utils$1',
  },
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: ['./src/utils/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
  coverageDirectory: './docs/jest-coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  //测试文件的类型
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
};
