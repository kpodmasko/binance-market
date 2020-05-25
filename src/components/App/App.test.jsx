import React from 'react';
import {render} from '@testing-library/react';
import puppeteer from 'puppeteer';

import App from '.';
import {testIds} from "../../utils/constants";

test('renders app', () => {
    const {getByTestId} = render(<App/>);
    const appElement = getByTestId(testIds.app);
    expect(appElement).toBeInTheDocument();
});

// first practise of e2e; so, sorry for this :)
test('star adding', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--proxy-server=https://www.binance.com/', '--proxy-auto-detect']
    });
    const page = await browser.newPage();

    await page.goto('http://localhost:3000/');

    await page.evaluate(() => localStorage.setItem("stars", ''))
    await page.waitForSelector(`[data-testid="${testIds.table.cell}"]`);

    await page.$eval(`[data-testid="${testIds.category}"]:nth-child(3)`, bnbCategory => bnbCategory.click());
    await page.$eval(`.table__cell--name:first-child .table__star .icon`, tableStar => tableStar.click());

    const tableCellContent = await page.$eval(
            `.table__cell--name:first-child`,
            tableCell => tableCell.textContent.replace('5x', '').replace('/', '')
    );
    await page.$eval(`[data-testid="${testIds.category}"]:first-child`, starCategory => starCategory.click());

    const rows = await page.$eval('.table > div', div => parseInt(div.getAttribute('aria-rowcount'), 10));

    expect(rows).toBe(1);
    await expect(await page.evaluate(() => localStorage.getItem("stars"))).toBe(tableCellContent);
    browser.close();
})