const cspBuilder = require('content-security-policy-builder');
const cspProductionConfig = require('../csp/production');
const crypto = require('crypto');
const fs = require('fs');

// eslint-disable-next-line padding-line-between-statements
const computeHashOfFile = (filename, algorithm, encoding) => {
    const content = fs.readFileSync(filename, 'utf-8');

    return computeHashOfString(content, algorithm, encoding);
};
const computeHashOfString = (string, algorithm, encoding) => {
    return crypto
        .createHash(algorithm)
        .update(string)
        .digest(encoding);
};
const replaceHashInMatch = (grunt, match, prefix, index) => {
    const filename = grunt.file.expand({ cwd: 'build/analog4all-client/scripts' }, `${ prefix }.*.js`)[0];

    if (filename === undefined) {
        return match;
    }

    const hash = `sha384-${ computeHashOfFile(`build/analog4all-client/scripts/${ filename }`, 'sha384', 'base64') }`;
    const chunkExpression = new RegExp(`${ index }:"sha384-[a-zA-Z0-9+/]{64}"`);

    return match.replace(chunkExpression, `${ index }:"${ hash }"`);
};

module.exports = (grunt) => {
    return {
        'bundle': {
            files: {
                './': [
                    'build/analog4all-client/main*.js'
                ]
            },
            options: {
                patterns: [ {
                    match: /"\/ngsw-worker\.js"/g,
                    replacement: '"/analog4all-client/ngsw-worker.js"'
                } ]
            }
        },
        'chunks': {
            files: {
                './': [
                    'build/analog4all-client/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /""\+\({[^}]*}\[e]\|\|e\)\+"(?:-es(?:2015|5))?\."\+{(?:\d+:"[\da-f]{20}",?)+}/g,
                    replacement: (match) => match.replace(/^""/g, '"scripts/"')
                }, {
                    match: /{(?:[1-9]\d*:"sha384-[\d+/A-Za-z]{64}",?)+}/g,
                    replacement: (match) => {
                        let updatedMatch = replaceHashInMatch(grunt, match, 'common', 1);

                        const offset = (match === updatedMatch) ? 4 : 5;
                        const numberOfHashes = match
                            .split(/sha384-/)
                            .length;

                        for (let i = offset; i < numberOfHashes; i += 1) {
                            updatedMatch = replaceHashInMatch(grunt, updatedMatch, `${ i }`, i);
                        }

                        return updatedMatch;
                    }
                } ]
            }
        },
        'csp-production': {
            files: {
                'build/analog4all-client/index.html': [
                    'build/analog4all-client/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /<meta\shttp-equiv="content-security-policy">/,
                    replacement: () => {
                        const html = fs.readFileSync('build/analog4all-client/index.html', 'utf-8');
                        const regex = /<script[^>]*?>(?<script>.*?)<\/script>/gm;
                        const scriptHashes = [];

                        let result = regex.exec(html);

                        while (result !== null) {
                            scriptHashes.push(`'sha256-${ computeHashOfString(result.groups.script, 'sha256', 'base64') }'`);

                            result = regex.exec(html);
                        }

                        const cspConfig = {
                            ...cspProductionConfig,
                            directives: {
                                ...cspProductionConfig.directives,
                                'script-src': ('script-src' in cspProductionConfig.directives)
                                    ? (Array.isArray(cspProductionConfig.directives['script-src']))
                                        ? [ ...cspProductionConfig.directives['script-src'], ...scriptHashes ]
                                        : [ cspProductionConfig.directives['script-src'], ...scriptHashes ]
                                    : [ ...scriptHashes ]
                            }
                        };
                        const cspString = cspBuilder(cspConfig);

                        return `<meta content="${ cspString }" http-equiv="content-security-policy">`;
                    }
                } ]
            }
        },
        'images': {
            files: {
                './': [
                    'build/analog4all-client/index.html',
                    'build/analog4all-client/**/*.css',
                    'build/analog4all-client/**/*.js'
                ]
            },
            options: {
                patterns: [ {
                    match: /assets\/(?<filename>[\d\-a-z]+)\.(?<extension>ico|jpg|png)/g,
                    replacement: (_, filename, extension) => grunt.file.expand({ cwd: 'build/analog4all-client' }, `assets/*.${ filename }.${ extension }`)[0]
                } ]
            }
        },
        'manifest': {
            files: {
                './': [
                    'build/analog4all-client/ngsw.json'
                ]
            },
            options: {
                patterns: [ {
                    match: /assets\/(?<filename>[\d\-a-z]+)\.(?<extension>ico|jpg|png)/g,
                    replacement: (_, filename, extension) => grunt.file.expand({ cwd: 'build/analog4all-client' }, `assets/*.${ filename }.${ extension }`)[0]
                }, {
                    match: /\/(?<filename>[\d\-a-z]+\.[\da-z]*\.css)"/g,
                    replacement: (_, filename) => `/styles/${ filename }"`
                }, {
                    match: /\/(?<filename>[\d\-a-z]*\.[\da-z]*\.js)"/g,
                    replacement: (_, filename) => `/scripts/${ filename }"`
                }, {
                    match: /\s*"\/analog4all-client(?:\/scripts)?\/runtime(?:-es(?:2015|5))?.[\da-z]*\.js",/g,
                    replacement: ''
                }, {
                    match: /\s*"\/analog4all-client(?:\/scripts)?\/runtime(?:-es(?:2015|5))?.[\da-z]*\.js":\s"[\da-z]+",/g,
                    replacement: ''
                }, {
                    // Replace the hash value inside of the hashTable for "/scripts/main-es*.js" because it was modified before.
                    match: /"\/analog4all-client(?<filename>\/scripts\/main(?:-es(?:2015|5))?.[\da-z]+.js)":\s"[\da-z]+"/g,
                    replacement: (_, filename) => {
                        return `"/analog4all-client${ filename }": "${ computeHashOfFile(`build/analog4all-client${ filename }`, 'sha1', 'hex') }"`;
                    }
                }, {
                    // Replace the hash value inside of the hashTable for "/styles/styles*.css" because it was modified before.
                    match: /"\/analog4all-client(?<filename>\/styles\/styles\.[\da-z]*\.css)":\s"[\da-z]+"/g,
                    replacement: (_, filename) => {
                        return `"/analog4all-client${ filename }": "${ computeHashOfFile(`build/analog4all-client${ filename }`, 'sha1', 'hex') }"`;
                    }
                }, {
                    // Replace the hash value inside of the hashTable for "/(index|start).html" because it was modified before.
                    match: /"\/analog4all-client\/(?<filename>index|start)\.html":\s"[\da-z]+"/g,
                    replacement: (_, filename) => {
                        return `"/analog4all-client/${ filename }.html": "${ computeHashOfFile(`build/analog4all-client/${ filename }.html`, 'sha1', 'hex') }"`;
                    }
                } ]
            }
        },
        'runtime': {
            files: {
                './': [
                    'build/analog4all-client/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /<script\ssrc="(?<filename>runtime(?:-es(?:2015|5))?.[\da-z]*\.js)"\scrossorigin="anonymous"(?<moduleAttribute>\s(?:nomodule|type="module"))?\sdefer\sintegrity="sha384-[\d+/A-Za-z]+=*"><\/script>/g,
                    replacement: (match, filename, moduleAttribute) => {
                        if (moduleAttribute === undefined) {
                            return `<script>${ fs.readFileSync(`build/analog4all-client/${ filename }`) }</script>`;
                        }

                        return `<script${ moduleAttribute }>${ fs.readFileSync(`build/analog4all-client/${ filename }`) }</script>`;
                    }
                } ]
            }
        },
        'scripts': {
            files: {
                './': [
                    'build/analog4all-client/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /<script\ssrc="(?<filename>[\d\-a-z]+\.[\da-z]+\.js)"\scrossorigin="anonymous"(?<moduleAttribute>\s(?:nomodule|type="module"))?\sdefer\sintegrity="(?<initialHash>sha384-[\d+/A-Za-z]+=*)"><\/script>/g,
                    replacement: (match, filename, moduleAttribute, initialHash) => {
                        const updatedHash = (/main(?:-es(?:2015|5))?\.[\da-z]+\.js/.test(filename)) ?
                            `sha384-${ computeHashOfFile(`build/analog4all-client/scripts/${ filename }`, 'sha384', 'base64') }` :
                            initialHash;

                        if (moduleAttribute === undefined) {
                            return `<script src="scripts/${ filename }" crossorigin="anonymous" defer integrity="${ updatedHash }"></script>`;
                        }

                        return `<script src="scripts/${ filename }" crossorigin="anonymous"${ moduleAttribute } defer integrity="${ updatedHash }"></script>`;
                    }
                } ]
            }
        },
        'styles': {
            files: {
                './': [
                    'build/analog4all-client/index.html'
                ]
            },
            options: {
                patterns: [ {
                    match: /<link\srel="stylesheet"\shref="(?<filename>styles\.[\da-z]+\.css)"\scrossorigin="anonymous"\sintegrity="sha384-[\d+/A-Za-z]+=*">/g,
                    replacement: (match, filename) => {
                        const hash = `sha384-${ computeHashOfFile(`build/analog4all-client/styles/${ filename }`, 'sha384', 'base64') }`;

                        return `<link href="styles/${ filename }" rel="stylesheet" crossorigin="anonymous" integrity="${ hash }">`;
                    }
                } ]
            }
        }
    };
};
