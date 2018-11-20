module.exports = {
    404: {
        files: [
            {
                cwd: 'src/',
                dest: 'build/analog4all-client/',
                expand: true,
                src: [ '404.html' ]
            }
        ]
    },
    scripts: {
        files: [
            {
                cwd: 'build/analog4all-client/',
                dest: 'build/analog4all-client/scripts/',
                expand: true,
                src: [ '**/!(ngsw-worker).js' ]
            }
        ]
    },
    styles: {
        files: [
            {
                cwd: 'build/analog4all-client/',
                dest: 'build/analog4all-client/styles/',
                expand: true,
                src: [ '**/*.css' ]
            }
        ]
    }
};
