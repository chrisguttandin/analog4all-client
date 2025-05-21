module.exports = {
    default: {
        files: [
            {
                cwd: 'build/analog4all-client/browser',
                dest: 'build/analog4all-client/browser',
                expand: true,
                src: ['**/404.html']
            }
        ],
        options: {
            caseSensitive: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            minifyCSS: true,
            removeComments: true
        }
    }
};
