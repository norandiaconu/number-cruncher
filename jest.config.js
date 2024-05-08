module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    testMatch: ["**/*.component.spec.ts"],
    collectCoverage: true
};
