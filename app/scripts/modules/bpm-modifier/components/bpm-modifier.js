var fs = require('fs');

export const bpmModifier = {
    bindings: {
        json: '<',
        onChange: '&'
    },
    controller: 'BpmModifierController as vm',
    template: fs.readFileSync(__dirname + '/../views/bpm-modifier.html', 'utf8')
};
