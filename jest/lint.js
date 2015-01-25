const path = require('path');
const utils = require('../@tunnckocore/utils/src');

const ROOT = path.dirname(__dirname);
const { alias, exts, workspaces } = utils.createAliases(ROOT, 'src');

module.exports = {
  rootDir: ROOT,
  displayName: 'lint',
  testMatch: workspaces.map((ws) => `<rootDir>/${ws}/*/src/**/*`),
  testPathIgnorePatterns: [
    /node_modules/.toString(),
    /(?:__)?(?:fixtures?|supports?|shared)(?:__)?/.toString(),
  ],
  moduleNameMapper: alias,
  moduleFileExtensions: exts,
  runner: path.join(ROOT, '@tunnckocore/jest-runner-eslint/src/index.js'),
};