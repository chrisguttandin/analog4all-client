import { test, expect, ConsoleMessage } from '@playwright/test';
import { Home } from './home.po';

let home: Home;
let removeListener: () => ConsoleMessage[];

test.afterEach(() => {
    const consoleMessages = removeListener();
    const severeConsoleMessages = consoleMessages.filter(
        (consoleMessage) => !['debug', 'info', 'log', 'warn', 'warning'].includes(consoleMessage.type())
    );

    // eslint-disable-next-line no-console
    severeConsoleMessages.forEach((consoleMessage) => console.log(`${consoleMessage.type()}: ${consoleMessage.text()}`));

    expect(severeConsoleMessages).toEqual([]);
});

test.beforeEach(async ({ page }) => {
    const consoleMessages: ConsoleMessage[] = [];
    const listener = (consoleMessage) => consoleMessages.push(consoleMessage);

    page.addListener('console', listener);

    removeListener = () => {
        page.removeListener('console', listener);

        return consoleMessages;
    };

    home = new Home(page);

    await home.navigateTo();
});

test('should display the correct headline', async () => {
    await expect(home.getHeadline()).toHaveText('Analog4All Client');
});

test('should go to the home page', async ({ page }) => {
    await expect(page).toHaveURL(/\/$/);
});
