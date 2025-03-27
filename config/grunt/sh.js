module.exports = () => {
    return {
        'analyze': {
            cmd: `npx ng build --configuration production --source-map --stats-json && \
                webpack-bundle-analyzer build/analog4all-client/stats.json`
        },
        'build': {
            cmd: 'npx ng build --base-href /analog4all-client/ --configuration production --subresource-integrity'
        },
        'continuous': {
            cmd: 'npx ng test'
        },
        'e2e': {
            cmd: `npx playwright install --with-deps && \
                npx playwright test --config config/playwright/config.ts`
        },
        'monitor': {
            cmd: 'npx ng serve'
        },
        'preview': {
            cmd: 'npx ng serve --configuration production'
        },
        'rimraf-source-maps': {
            cmd: 'rimraf build/analog4all-client/browser/**.map'
        },
        'smoke': {
            cmd: `npx playwright install --with-deps && \
                IS_SMOKE_TEST=true npx playwright test --config config/playwright/config.ts && \
                npx hint --telemetry=off https://chrisguttandin.github.io/analog4all-client`
        },
        'test': {
            cmd: 'npx ng test --watch false'
        },
        'verify': {
            cmd: `npx bundle-buddy build/analog4all-client/browser/*.js.map && \
                grep -r build/analog4all-client/browser/*.js.map -e '/environments/environment.ts'; test $? -eq 1`
        }
    };
};
