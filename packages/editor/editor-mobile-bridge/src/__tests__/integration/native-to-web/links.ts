import { BrowserTestCase } from '@findable/webdriver-runner/runner';
import Page from '@findable/webdriver-runner/wd-wrapper';
import * as constant from 'lodash.constant';
import * as times from 'lodash.times';

import {
  callNativeBridge,
  editor,
  editable,
  getDocFromElement,
  skipBrowsers as skip,
} from '../_utils';

BrowserTestCase(
  `links.ts: Insert link on empty content`,
  { skip },
  async client => {
    const browser = new Page(client);

    await browser.goto(editor.path);
    await browser.waitForSelector(editable);

    await callNativeBridge(
      browser,
      'onLinkUpdate',
      'Atlassian',
      'https://www.atlassian.com',
    );

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  `links.ts: Insert link on existing text node`,
  // Safari has issues with key events
  { skip: skip.concat('safari') },
  async client => {
    const browser = new Page(client);

    await browser.goto(editor.path);
    await browser.waitForSelector(editable);

    await browser.type(editable, 'This is a text');
    await browser.type(editable, [...times(4, constant('ArrowLeft'))]);

    await callNativeBridge(
      browser,
      'onLinkUpdate',
      'link',
      'https://www.atlassian.com',
    );

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  `links.ts: Insert link with text selection`,
  // Safari has issues with key events
  { skip: skip.concat('safari') },
  async client => {
    const browser = new Page(client);

    await browser.goto(editor.path);
    await browser.waitForSelector(editable);

    await browser.type(editable, 'This is a link with trailing text');
    await browser.type(editable, [
      ...times(23, constant('ArrowLeft')),
      ...times(4, constant(['Shift', 'ArrowRight'])),
    ]);

    await callNativeBridge(
      browser,
      'onLinkUpdate',
      'link',
      'https://www.atlassian.com',
    );

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  `links.ts: change link text`,
  // Safari has issues with key events
  { skip: skip.concat('safari') },
  async client => {
    const browser = new Page(client);

    await browser.goto(editor.path);
    await browser.waitForSelector(editable);

    await callNativeBridge(
      browser,
      'onLinkUpdate',
      'Atlassian',
      'https://www.atlassian.com',
    );

    await browser.type(editable, [...times(4, constant('ArrowLeft'))]);

    await callNativeBridge(
      browser,
      'onLinkUpdate',
      'This is Atlassian',
      'https://www.atlassian.com',
    );

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  `links.ts: change link href`,
  // Safari has issues with key events
  { skip: skip.concat('safari') },
  async client => {
    const browser = new Page(client);

    await browser.goto(editor.path);
    await browser.waitForSelector(editable);

    await callNativeBridge(
      browser,
      'onLinkUpdate',
      'Google',
      'https://www.atlassian.com',
    );

    await browser.type(editable, [...times(4, constant('ArrowLeft'))]);

    await callNativeBridge(
      browser,
      'onLinkUpdate',
      'Google',
      'https://www.google.com',
    );

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);

BrowserTestCase(
  `links.ts: Remove link`,
  // Safari has issues with key events
  { skip: skip.concat('safari') },
  async client => {
    const browser = new Page(client);

    await browser.goto(editor.path);
    await browser.waitForSelector(editable);

    await browser.type(editable, 'This is a link');
    await browser.type(editable, [
      ...times(4, constant('ArrowLeft')),
      ...times(4, constant(['Shift', 'ArrowRight'])),
    ]);

    await callNativeBridge(
      browser,
      'onLinkUpdate',
      'link',
      'https://www.atlassian.com',
    );

    await browser.type(editable, [
      'ArrowLeft',
      ...times(4, constant(['Shift', 'ArrowRight'])),
    ]);

    await callNativeBridge(browser, 'onLinkUpdate', 'text', '');

    const doc = await browser.$eval(editable, getDocFromElement);
    expect(doc).toMatchDocSnapshot();
  },
);
