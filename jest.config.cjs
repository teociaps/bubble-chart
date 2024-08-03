const { pathsToModuleNameMapper } = require('ts-jest');
// const { compilerOptions } = require('./tsconfig');

module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom', // instead of node because d3
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/'}),
  moduleNameMapper: {
    '^d3$': '<rootDir>/node_modules/d3/dist/d3.min.js',
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: 'tsconfig.json',
      }
    ]
  }
};
