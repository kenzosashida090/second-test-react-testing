import { defineConfig } from "vitest/config";

export default defineConfig({
    test:{
        reporters: ['verbose', 'json'],
        environment:'jsdom',// indicate the server node that we using dom element with this library
        globals:true, // avoid to import basics testing-library/react like (it)
        setupFiles:[ 'test/setup.ts'], //avoid importing library import "@testing-library/jest-dom/vitest" in all test files
        outputFile: {
            junit: './junit-report.xml',
            json: './json-report.json',
    },
    }
})