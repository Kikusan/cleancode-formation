const config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  testRegex: '.*\\.(spec|ispec)\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s', '!**/tests/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage',
  testEnvironment: 'node',
};

process.env.TZ = 'Europe/Paris';

module.exports = config;
