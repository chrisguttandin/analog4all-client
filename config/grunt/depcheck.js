module.exports = {
    default: {
        options: {
            failOnUnusedDeps: true,
            ignoreDirs: ['build'],
            ignoreMatches: [
                // @todo midi-json-parser is actually used but gets detected as unused for some reason.
                'midi-json-parser',
                // @todo midi-json-parser-worker is actually used but gets detected as unused for some reason.
                'midi-json-parser-worker',
                // @todo midi-player is actually used but gets detected as unused for some reason.
                'midi-player',
                'tslib',
                '@angular/cli',
                '@angular/compiler-cli',
                '@angular/language-service',
                '@angular-devkit/build-angular',
                '@commitlint/cli',
                '@commitlint/config-angular',
                '@hint/*',
                '@ngrx/store-devtools',
                '@nrwl/nx',
                '@types/*',
                'axe-core',
                'bundle-buddy',
                'commitizen',
                'deep-freeze-strict',
                'eslint',
                'eslint-config-holy-grail',
                'grunt-*',
                'hint',
                'htmlhint',
                'husky',
                'jasmine-core',
                'jasmine-marbles',
                'karma*',
                'ngrx-store-freeze',
                'prettier',
                'pretty-quick',
                'stylelint-config-holy-grail',
                'tsconfig-holy-grail',
                'tslint',
                'tslint-config-holy-grail',
                'typescript',
                'webpack-bundle-analyzer',
                'webpack-stats-duplicates'
            ]
        },
        src: './'
    }
};
