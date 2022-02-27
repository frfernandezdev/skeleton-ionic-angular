module.exports = {
  moduleNameMapper: {},
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
};
