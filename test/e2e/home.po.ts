import { env } from 'process';
import { browser, by, element } from 'protractor';
import { promise } from 'selenium-webdriver'; // tslint:disable-line:no-implicit-dependencies

export class HomePage {

    public getHeadline (): promise.Promise<string> {
        return element(by.css('anc-app h1')).getText();
    }

    public navigateTo (): promise.Promise<any> {
        return browser.get((env.IS_SMOKE_TEST === 'true') ? '/analog4all-client' : '/');
    }

}
