module.exports = {
    'runtime': [
        'build/analog4all-client/runtime-es*.js'
    ],
    'scripts': [
        'build/analog4all-client/!(ngsw-worker).js'
    ],
    'source-maps': [
        'build/analog4all-client/**.map'
    ],
    'styles': [
        'build/analog4all-client/**.css'
    ]
};
