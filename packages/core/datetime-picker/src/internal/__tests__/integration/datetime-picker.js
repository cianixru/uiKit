// @flow
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

const urlDateTimePicker = getExampleUrl('core', 'datetime-picker', 'basic');
/* Css used for the test */
const datepickerDefault = 'label[for="react-select-datepicker-1--input"] + div';
const datepickerMenu = '[aria-label="calendar"]';
const date =
  '[aria-label="calendar"] > table > tbody > tr:nth-child(5) > td:nth-child(6)';
const datepickerInput = '#react-select-datepicker-2-input';
const dateValue = `${datepickerDefault} > div > div > div`;
const timepickerDefault = 'label[for="react-select-timepicker-4--input"] + div';
const timePickerMenu = '.timepicker-select__menu-list';
const timeInput = '#react-select-timepicker-4-input';
const timeValue = `${timepickerDefault} > div > div > div`;
const timeOption = '[role="option"]';
const dateTime = 'label[for="react-select-datetimepicker-1--input"]';
const dateTimePicker = `${dateTime} + div > div`;
const dateTimePickerDateInput = '#react-select-datetimepicker-1-input';
const dateTimeValues = `${dateTimePicker} > div > div > div`;

BrowserTestCase(
  'datetime-picker.js: When DatePicker is focused & backspace pressed, the input should be cleared',
  async client => {
    const dateTimePickerTest = new Page(client);
    await dateTimePickerTest.goto(urlDateTimePicker);
    await dateTimePickerTest.click(datepickerDefault);
    await dateTimePickerTest.waitForSelector(datepickerMenu);
    await dateTimePickerTest.click(date);
    const previousDate = await dateTimePickerTest.getText(dateValue);
    if (
      dateTimePickerTest.browser.desiredCapabilities.browserName === 'firefox'
    ) {
      // Focus on the input - `type` will do it for you
      await dateTimePickerTest.type(datepickerInput, [
        'Backspace',
        'Backspace',
      ]);
    } else {
      await dateTimePickerTest.keys(['Backspace']);
    }
    expect(await dateTimePickerTest.getText(dateValue)).not.toBe(previousDate);
    await dateTimePickerTest.checkConsoleErrors();
  },
);

BrowserTestCase(
  'datetime-picker.js: When choosing another day in a Datetime picker focused, the date should be updated to the new value',
  async client => {
    const dateTimePickerTest = new Page(client);
    await dateTimePickerTest.goto(urlDateTimePicker);
    await dateTimePickerTest.click(datepickerDefault);
    await dateTimePickerTest.waitForSelector(datepickerMenu);
    await dateTimePickerTest.click(date);
    const previousDate = await dateTimePickerTest.getText(dateValue);
    await dateTimePickerTest.click(datepickerDefault);
    if (
      dateTimePickerTest.browser.desiredCapabilities.browserName === 'firefox'
    ) {
      // Focus on the input - `type` will do it for you
      await dateTimePickerTest.type(datepickerInput, [
        'ArrowLeft',
        'ArrowLeft',
        'ArrowLeft',
      ]);
      await dateTimePickerTest.type(datepickerInput, ['Enter']);
    } else {
      await dateTimePickerTest.keys(['ArrowLeft']);
      await dateTimePickerTest.keys(['ArrowLeft']);
      await dateTimePickerTest.keys(['Enter']);
    }
    expect(await dateTimePickerTest.getText(dateValue)).not.toBe(previousDate);
    await dateTimePickerTest.checkConsoleErrors();
  },
);

BrowserTestCase(
  'datetime-picker.js: When entering a new time in Timepicker Editable, the time should be updated to the new value',
  { skip: ['ie'] }, // IE has an issue AK-5570, AK-5492
  async client => {
    const timePicker = new Page(client);
    await timePicker.goto(urlDateTimePicker);
    await timePicker.waitForSelector(timepickerDefault);
    await timePicker.click(timepickerDefault);
    await timePicker.waitForSelector(timePickerMenu);
    const previousTime = await timePicker.getText(timeValue);
    if (timePicker.browser.desiredCapabilities.browserName === 'firefox') {
      // Focus on the input - `type` will do it for you
      await timePicker.type(timeInput, ['12:45pm']);
      await timePicker.waitForSelector(timeOption);
      await timePicker.type(timeInput, ['Enter']);
    } else {
      timePicker.keys(['12:45pm']);
      await timePicker.waitForSelector(timeOption);
      // There is small issue there about the Key ENTER pressed too fast
      timePicker.keys(['Enter']);
    }
    expect(await timePicker.getText(timeValue)).not.toBe(previousTime);
    expect((await timePicker.getText(timeValue))[0].trim()).toContain(
      '12:45pm',
    );
    await timePicker.checkConsoleErrors();
  },
);

BrowserTestCase(
  'datetime-picker.js: When DateTimePicker is focused & backspace pressed, the date value should be cleared but the time value should not be affected',
  { skip: ['safari', 'ie'] }, // Safari and IE drivers have issues - AK-5570, AK-5492
  async client => {
    const dateTimePickerTest = new Page(client);
    await dateTimePickerTest.goto(urlDateTimePicker);
    await dateTimePickerTest.click(dateTimePicker);
    await dateTimePickerTest.waitForSelector(datepickerMenu);
    await dateTimePickerTest.click(date);
    const previousDate = (await dateTimePickerTest.getText(dateTimeValues))[0];
    const previousTime = (await dateTimePickerTest.getText(dateTimeValues))[1];
    await dateTimePickerTest.type(dateTimePickerDateInput, ['Backspace']);
    const AfterDate = (await dateTimePickerTest.getText(dateTimeValues))[0];
    const AfterTime = (await dateTimePickerTest.getText(dateTimeValues))[1];
    expect(AfterDate).not.toBe(previousDate);
    expect(previousTime).toBe(AfterTime);
    await dateTimePickerTest.checkConsoleErrors();
  },
);
