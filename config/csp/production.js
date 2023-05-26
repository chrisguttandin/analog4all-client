module.exports = {
    directives: {
        // @todo The child-src directive is deprecated but still necessary in Safari (v11) because Safari does not implement the worker-src directive yet.
        'child-src': 'blob:',
        'connect-src': ["'self'", 'https://jbnw79pt56.execute-api.eu-west-1.amazonaws.com', 'wss://sock.cat'],
        'default-src': "'none'",
        'font-src': "'self'",
        'img-src': "'self'",
        'media-src': [
            'https://analog4all-samples.s3.eu-west-1.amazonaws.com',
            'https://analog4all-samples.s3-eu-west-1.amazonaws.com',
            'https://jbnw79pt56.execute-api.eu-west-1.amazonaws.com'
        ],
        'script-src': ["'self'", "'unsafe-eval'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'worker-src': ['blob:', "'self'"]
    }
};
