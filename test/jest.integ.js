var config = require('./jest');
config.testRegex = '(/src/.ispec.*|\\.(itest|ispec))\\.(ts|js)$';
config.collectCoverageFrom.push('!**/*.spec.(t|j)s');
module.exports = config;
