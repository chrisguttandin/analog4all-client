module.exports = {
    directives: {
        // @todo The child-src directive is deprecated but still necessary in Safari (v11) because Safari does not implement the worker-src directive yet.
        'child-src': 'blob:',
        'connect-src': [
            "'self'",
            'https://w8flhge089.execute-api.eu-west-1.amazonaws.com',
            'wss://sock.cat'
        ],
        'default-src': "'none'",
        'font-src': 'https://fonts.gstatic.com',
        'img-src': "'self'",
        'media-src': [
            'https://analog4all-samples.s3.eu-west-1.amazonaws.com',
            'https://analog4all-samples.s3-eu-west-1.amazonaws.com',
            'https://w8flhge089.execute-api.eu-west-1.amazonaws.com'
        ],
        'script-src': [ "'self'", "'unsafe-eval'" ],
        'style-src': [ 'https://fonts.googleapis.com', "'self'", "'unsafe-inline'" ],
        'worker-src': [ 'blob:', "'self'" ]
    }
};
