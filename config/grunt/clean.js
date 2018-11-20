module.exports = {
    runtime: [
        'build/analog4all-client/runtime.*.js'
    ],
    scripts: [
        'build/analog4all-client/!(ngsw-worker).js'
    ],
    styles: [
        'build/analog4all-client/**.css'
    ]
};
