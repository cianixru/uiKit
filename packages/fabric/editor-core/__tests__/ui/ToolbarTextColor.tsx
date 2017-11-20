import { mount } from 'enzyme';
import * as React from 'react';
import * as sinon from 'sinon';
import textColorPlugin, { TextColorState } from '../../src/plugins/text-color';
import ToolbarButton from '../../src/ui/ToolbarButton';
import ToolbarTextColor from '../../src/ui/ToolbarTextColor';
import { doc, code_block, p, makeEditor, defaultSchema } from '@atlaskit/editor-test-helpers';
import { analyticsService } from '../../src/analytics';

describe('ToolbarTextColor', () => {
  const editor = (doc: any) => makeEditor<TextColorState>({
    doc,
    plugins: textColorPlugin(defaultSchema),
  });

  describe('when plugin is enabled', () => {
    it('sets disabled to false', () => {
      const { editorView, pluginState } = editor(doc(p('text')));
      const toolbarTextColor = mount(
        <ToolbarTextColor
          pluginState={pluginState}
          editorView={editorView}
        />
      );

      expect(toolbarTextColor.state('disabled')).toBe(false);
      toolbarTextColor.unmount();
    });
  });

  describe('when plugin is not enabled', () => {
    it('sets disabled to true', () => {
      const { editorView, pluginState } = editor(doc(code_block()('text')));
      const toolbarTextColor = mount(
        <ToolbarTextColor
          pluginState={pluginState}
          editorView={editorView}
        />
      );

      expect(toolbarTextColor.state('disabled')).toBe(true);
      toolbarTextColor.unmount();
    });
  });

  it('should make isOpen true when toolbar textColor button is clicked', () => {
    const { pluginState, editorView } = editor(doc(p('text')));
    const toolbarTextColor = mount(
      <ToolbarTextColor
        pluginState={pluginState}
        editorView={editorView}
      />
    );

    expect(toolbarTextColor.state('isOpen')).toBe(false);
    toolbarTextColor.find('button').simulate('click');
    expect(toolbarTextColor.state('isOpen')).toBe(true);
    toolbarTextColor.unmount();
  });

  it('should make isOpen false when a color is clicked', () => {
    const { pluginState, editorView } = editor(doc(p('text')));
    const toolbarTextColor = mount(
      <ToolbarTextColor
        pluginState={pluginState}
        editorView={editorView}
      />
    );

    toolbarTextColor.find('button').simulate('click');
    expect(toolbarTextColor.state('isOpen')).toBe(true);
    toolbarTextColor.find('ColorPalette button').first().simulate('click');
    expect(toolbarTextColor.state('isOpen')).toBe(false);
    toolbarTextColor.unmount();
  });

  it('should render disabled ToolbarButton if disabled property is true', () => {
    const { editorView, pluginState } = editor(doc(p('text')));
    const toolbarTextColor = mount(
      <ToolbarTextColor
        disabled={true}
        pluginState={pluginState}
        editorView={editorView}
      />
    );

    expect(toolbarTextColor.find(ToolbarButton).prop('disabled')).toBe(true);
    toolbarTextColor.unmount();
  });

  describe('analytics', () => {
    it('should trigger analyticsService.trackEvent when a color is clicked', () => {
      let trackEvent = sinon.spy();
      analyticsService.trackEvent = trackEvent;
      const { editorView, pluginState } = editor(doc(p('text')));
      const toolbarOption = mount(
        <ToolbarTextColor
          pluginState={pluginState}
          editorView={editorView}
        />
      );
      toolbarOption.find('button').simulate('click');
      toolbarOption.find('ColorPalette button').first().simulate('click');
      expect(trackEvent.calledWith('atlassian.editor.format.textcolor.button')).toBe(true);
      toolbarOption.unmount();
    });
  });
});
