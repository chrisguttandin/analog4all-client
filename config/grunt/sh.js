module.exports = () => {
    return {
        'analyze': {
            cmd: `npx ng build --configuration production --source-map --stats-json && \
                webpack-bundle-analyzer build/analog4all-client/stats.json`
        },
        'build': {
            cmd: 'npx ng build --base-href /analog4all-client/ --configuration production --subresource-integrity'
        },
        'rimraf-source-maps': {
            cmd: 'rimraf build/analog4all-client/browser/**.map'
        },
        'verify': {
            cmd: `npx bundle-buddy build/analog4all-client/browser/*.js.map && \
                grep -r build/analog4all-client/browser/*.js.map -e '/environments/environment.ts'; test $? -eq 1`
        }
    };
};
