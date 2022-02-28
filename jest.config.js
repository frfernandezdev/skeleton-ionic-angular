module.exports = {
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: ["<rootDir>/cypress/"],
};
