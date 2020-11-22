import { env } from 'process';
import { browser, by, element } from 'protractor';

export class HomePage {
    public async getHeadline(): Promise<string> {
        return element(by.css('anc-app h1')).getText();
    }

    public async navigateTo(): Promise<unknown> {
        return browser.get(env.IS_SMOKE_TEST === 'true' ? '/analog4all-client' : '/');
    }
}
