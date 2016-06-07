class ClientController {

    constructor (browserService) {
        this.isSupported = browserService.isSupported;
    }

}

module.exports = ClientController;
