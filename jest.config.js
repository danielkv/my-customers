const path = require('path');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputName: 'junit-TEST.xml',
            },
        ],
    ],
    coverageThreshold: {
        global: {
            statements: 50,
            branches: 90,
            functions: 0,
            lines: 0,
        },
    },
    setupFiles: [path.resolve(__dirname, 'packages', 'server', 'src', 'setup', 'jest.setup.ts')],
};
