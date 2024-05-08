module.exports = {
    // The directory where Jest should store its cached dependency information
    cacheDirectory: './.tmp/jest',

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage/jest',

    // A list of reporter names that Jest uses when writing coverage reports
    // Add 'text' to show the output in the console.
    coverageReporters: ['json', 'lcovonly'],

    // An array of directory names to be searched recursively up from the requiring module's location
    // Keep this in sync with resolve.modules in the webpack config!
    moduleDirectories: ['node_modules'],

    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.js',
        'regenerator-runtime/runtime',
    ],

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(jest).[tj]s?(x)'],

    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },

    // A map from regular expressions to paths to transformers
    transform: {
        '\\.tsx?$': 'ts-jest',
        '\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                // ts-jest config options go here
                packageJson: 'package.json',
                // Add other ts-jest options here as needed
            },
        ],
    },
};
