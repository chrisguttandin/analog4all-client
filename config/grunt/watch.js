'use strict';

module.exports = {
    html: {
        files: [
            'app/**/*.html'
        ],
        options: {
            livereload: 35730
        },
        tasks: [
            'js'
        ]
    },
    js: {
        files: [
            'app/scripts/**/*.js',
            '!app/scripts/bundle.js'
        ],
        options: {
            livereload: 35730,
        },
        tasks: [
            'js'
        ]
    }
};
