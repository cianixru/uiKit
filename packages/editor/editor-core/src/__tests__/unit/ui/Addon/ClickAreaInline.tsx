import * as React from 'react';
import { mount } from 'enzyme';
import { createEditorFactory, doc, p } from '@findable/editor-test-helpers';
import { ClickAreaInline } from '../../../../ui/Addon';

describe('ClickAreaInline', () => {
  const createEditor = createEditorFactory();
  const editor = (doc: any) =>
    createEditor({
      doc,
    });

  it('should create empty terminal empty paragraph when clicked', () => {
    const { editorView } = editor(doc(p('Hello world')));
    const clickArea = mount(<ClickAreaInline editorView={editorView} />);
    clickArea.simulate('click');
    expect(editorView.state.doc).toEqualDocument(doc(p('Hello world'), p('')));
  });

  it('should not create empty terminal empty paragraph if it is already present at end', () => {
    const { editorView } = editor(doc(p('Hello world'), p('')));
    const clickArea = mount(<ClickAreaInline editorView={editorView} />);
    clickArea.simulate('click').simulate('click');
    expect(editorView.state.doc).toEqualDocument(doc(p('Hello world'), p('')));
  });
});
