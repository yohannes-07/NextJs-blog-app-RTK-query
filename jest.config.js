module.exports = {
    preset: "ts-jest",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testPathIgnorePatterns: [
      "<rootDir>/.next/",
      "<rootDir>/node_modules/",
    ],
    moduleNameMapper: {
      "^@/(.*)": "<rootDir>/src/$1",
      "\\.(css)$": "identity-obj-proxy",
    },
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    },
    testEnvironment: "jsdom",
  };
