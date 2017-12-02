module.exports = {
    analyze: {
        cmd: 'ng build --aot --build-optimizer false --prod --sourcemaps --stats-json && (bundle-buddy build/*.map & webpack-bundle-analyzer build/stats.json)'
    },
    build: {
        cmd: 'ng build --aot --base-href /analog4all-client --build-optimizer false --no-sourcemap --prod --stats-json && webpack-stats-duplicates build/stats.json && rm build/stats.json'
    },
    continuous: {
        cmd: 'ng test'
    },
    e2e: {
        cmd: 'ng e2e'
    },
    lint: {
        cmd: 'ng lint --type-check'
    },
    monitor: {
        cmd: 'ng serve --port 6699'
    },
    preview: {
        cmd: 'ng serve --aot --build-optimizer false --port 6699 --prod'
    },
    smoke: {
        cmd: 'IS_SMOKE_TEST=true ng e2e --serve false && sonarwhal https://chrisguttandin.github.io/analog4all-client && rm cdp.pid'
    },
    test: {
        cmd: 'ng test --watch false'
    }
};
