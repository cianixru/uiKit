/**
 * @jest-environment node
 */
// @flow
import React from 'react';
import { getExamplesFor } from '@findable/build-utils/getExamples';
import ReactDOMServer from 'react-dom/server';

test('Layer manager server side rendering', async () => {
  (await getExamplesFor('layer-manager')).forEach(examples => {
    // $StringLitteral
    const Example = require(examples.filePath).default; // eslint-disable-line import/no-dynamic-require
    expect(() => ReactDOMServer.renderToString(<Example />)).not.toThrowError();
  });
});
