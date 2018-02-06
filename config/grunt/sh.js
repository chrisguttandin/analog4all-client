module.exports = {
    analyze: {
        cmd: 'ng build --aot --build-optimizer --prod --sourcemaps --stats-json && (bundle-buddy build/*.map & webpack-bundle-analyzer build/stats.json)'
    },
    build: {
        cmd: 'ng build --aot --base-href /analog4all-client/index.html --deploy-url /analog4all-client --build-optimizer --no-sourcemaps --prod --stats-json && webpack-stats-duplicates build/stats.json && rm build/stats.json'
    },
    continuous: {
        cmd: 'ng test'
    },
    e2e: {
        cmd: 'ng e2e --aot'
    },
    lint: {
        cmd: 'ng lint --type-check'
    },
    monitor: {
        cmd: 'ng serve --aot --port 6699'
    },
    preview: {
        cmd: 'ng serve --aot --build-optimizer --port 6699 --prod'
    },
    smoke: {
        cmd: 'IS_SMOKE_TEST=true ng e2e --serve false && sonarwhal https://chrisguttandin.github.io/analog4all-client && rm cdp.pid'
    },
    test: {
        cmd: 'ng test --watch false'
    }
};
