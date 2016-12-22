module.exports = {
    deploy: {
        ifTrue: [ 'deploy' ],
        options: {
            test: () => {
                console.log(process.env.TRAVIS, process.env.TRAVIS_PULL_REQUEST, process.env.TRAVIS_SECURE_ENV_VARS, process.env.TRAVIS_TAG); // eslint-disable-line no-console

                return (process.env.TRAVIS === 'true' &&
                    process.env.TRAVIS_PULL_REQUEST === 'false' &&
                    process.env.TRAVIS_SECURE_ENV_VARS === 'true' &&
                    process.env.TRAVIS_TAG !== '');
            }
        }
    }
};
