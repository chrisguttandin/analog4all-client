var fs = require('fs');

module.exports = {
    controller: 'ClientController as vm',
    template: fs.readFileSync(__dirname + '/../views/client.html', 'utf8')
};
