var config = require('./jest');
config.testRegex = '(/src/.spec.*|\\.(test|spec))\\.(ts|js)$';
config.collectCoverageFrom.push('!**/*.ispec.(t|j)s');
module.exports = config;
