var fs = require('fs');

export const client = {
    controller: 'ClientController as vm',
    template: fs.readFileSync(__dirname + '/../views/client.html', 'utf8')
};
