const { env } = require('process');
const documentConfig = require('../htmlhint/document');
const templateConfig = require('../htmlhint/template');

// eslint-disable-next-line padding-line-between-statements
const convertConfig = (config) =>
    Object.entries(config)
        .map(([key, value]) => (typeof value === 'string' ? `${key}=${value}` : key))
        .join(',');

module.exports = (grunt) => {
    const fix = grunt.option('fix') === true;

    return {
        'analyze': {
            cmd: `npx ng build --prod --source-map --stats-json && \
                webpack-bundle-analyzer build/analog4all-client/stats.json`
        },
        'build': {
            cmd: 'npx ng build --base-href /analog4all-client/ --prod --subresource-integrity'
        },
        'continuous': {
            cmd: 'npx ng test'
        },
        'e2e': {
            cmd: env.CI ? 'npx ng e2e' : 'webdriver-manager update && npx ng e2e --no-webdriver-update'
        },
        'lint-config': {
            cmd: `eslint --config config/eslint/config.json --ext .js ${fix ? '--fix ' : ''}--report-unused-disable-directives *.js config/`
        },
        'lint-src': {
            cmd: `htmlhint --rules ${convertConfig(documentConfig)} 'src/**/index.html' && \
                htmlhint --rules ${convertConfig(templateConfig)} 'src/app/**/*.component.html' && \
                npx ng lint analog4all-client --type-check`
        },
        'lint-test': {
            cmd: 'npx ng lint analog4all-client --configuration test'
        },
        'monitor': {
            cmd: 'npx ng serve'
        },
        'preview': {
            cmd: 'npx ng serve --prod'
        },
        'smoke': {
            cmd: env.CI
                ? "IS_SMOKE_TEST=true npx ng e2e --dev-server-target '' && hint --telemetry=off https://chrisguttandin.github.io/analog4all-client"
                : "webdriver-manager update && IS_SMOKE_TEST=true npx ng e2e --dev-server-target '' --no-webdriver-update && hint --telemetry=off https://chrisguttandin.github.io/analog4all-client"
        },
        'test': {
            cmd: 'npx ng test --watch false'
        },
        'verify': {
            cmd: `bundle-buddy build/analog4all-client/*.js.map && \
                grep -r build/**/*.map -e '/environments/environment.ts'; test $? -eq 1`
        }
    };
};
