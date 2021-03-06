import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import { ProviderFactory } from '@findable/editor-common';
import Editor from '../../../../src/ui/Appearance/FullPage';

describe('@findable/editor-core/editor/plugins/FullPage', () => {
  const providerFactory = new ProviderFactory();

  it('should have Editor component defined', () => {
    const editor = mount(
      <Editor editorDOMElement={<div />} providerFactory={providerFactory} />,
    );
    expect(editor).to.not.equal(undefined);
    editor.unmount();
    providerFactory.destroy();
  });
});
