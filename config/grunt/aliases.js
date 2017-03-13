module.exports = {
    'a11y': [
        'axe-webdriver'
    ],
    'analyze': [
        'sh:build',
        'sh:analyze'
    ],
    'continuous': [
        'sh:continuous'
    ],
    'deploy': [
        'sh:build',
        'copy:404',
        'htmlmin',
        'replace:inline',
        'replace:chunks',
        'replace:csp-production',
        'clean:inline',
        'copy:scripts',
        'replace:scripts',
        'clean:scripts',
        'copy:styles',
        'replace:styles',
        'clean:styles',
        'gh-pages:deploy'
    ],
    'deploy-on-version-updates': [
        'if:deploy'
    ],
    'e2e': [
        'sh:e2e'
    ],
    'lint': [
        'eslint',
        'htmlhint',
        'postcss:lint',
        'sh:lint',
        'depcheck'
    ],
    'monitor': [
        'sh:monitor'
    ],
    'preview': [
        'sh:preview'
    ],
    'test': [
        'sh:test'
    ]
};
