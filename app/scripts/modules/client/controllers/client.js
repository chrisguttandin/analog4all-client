export class ClientController {

    constructor (browserService) {
        this.isSupported = browserService.isSupported;
    }

}
