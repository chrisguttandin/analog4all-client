const { env } = require('process');

module.exports = {
    analyze: {
        cmd: 'ng build --prod --source-map --stats-json && webpack-bundle-analyzer build/analog4all-client/stats.json'
    },
    build: {
        cmd: 'ng build --base-href /analog4all-client/ --prod --subresource-integrity'
    },
    continuous: {
        cmd: 'ng test'
    },
    e2e: {
        cmd: (env.TRAVIS) ?
            'ng e2e' :
            'webdriver-manager update && ng e2e --no-webdriver-update'
    },
    lint: {
        cmd: 'ng lint analog4all-client --type-check && ng lint analog4all-client-e2e --type-check && ng lint analog4all-client-unit --type-check'
    },
    monitor: {
        cmd: 'ng serve --aot'
    },
    preview: {
        cmd: 'ng serve --aot --prod'
    },
    smoke: {
        cmd: (env.TRAVIS) ?
            "IS_SMOKE_TEST=true ng e2e --dev-server-target '' && hint --tracking=off https://chrisguttandin.github.io/analog4all-client && rm cdp.pid" :
            "webdriver-manager update && IS_SMOKE_TEST=true ng e2e --dev-server-target '' --no-webdriver-update && hint --tracking=off https://chrisguttandin.github.io/analog4all-client && rm cdp.pid"
    },
    test: {
        cmd: 'ng test --watch false'
    },
    verify: {
        cmd: "bundle-buddy build/analog4all-client/*.js.map && grep -r build/**/*.map -e '/environments/environment.ts'; test $? -eq 1"
    }
};
