module.exports = {
    default: {
        files: [
            {
                cwd: 'build/analog4all-client',
                dest: 'build/analog4all-client',
                expand: true,
                src: ['**/*.html']
            }
        ],
        options: {
            caseSensitive: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeComments: true
        }
    }
};
