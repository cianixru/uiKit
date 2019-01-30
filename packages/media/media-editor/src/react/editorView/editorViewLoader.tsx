import * as React from 'react';
import { ModalSpinner } from '@atlaskit/media-ui';
import EditorViewType, { EditorViewProps } from './editorView';

interface AsyncEditorViewState {
  EditorView?: typeof EditorViewType;
}

export default class AsyncEditorView extends React.PureComponent<
  EditorViewProps & AsyncEditorViewState,
  AsyncEditorViewState
> {
  static displayName = 'AsyncEditorView';
  static EditorView?: typeof EditorViewType;

  state = {
    // Set state value to equal to current static value of this class.
    EditorView: AsyncEditorView.EditorView,
  };

  componentWillMount() {
    if (!this.state.EditorView) {
      import(/* webpackChunkName:"@atlaskit-internal_media-editor-view" */
      './editorView').then(module => {
        AsyncEditorView.EditorView = module.default;
        this.setState({ EditorView: module.default });
      });
    }
  }

  render() {
    if (!this.state.EditorView) {
      return <ModalSpinner mode="dark" />;
    }

    return <this.state.EditorView {...this.props} />;
  }
}
