const config = {
  verbose: true,
  testEnvironment: "node",
  testMatch: ["**/test/makeHtmlTest/*.js?(x)"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js", "test/**/*.js"],
};

module.exports = config;
