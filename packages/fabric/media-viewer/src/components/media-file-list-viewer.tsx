import * as React from 'react';
import { Component } from 'react';
import { Context, FileItem } from '@atlaskit/media-core';
import { Subscription } from 'rxjs/Subscription';
import { fetchToken } from '../domain/fetch-token';
import { MediaFileAttributesFactory } from '../domain/media-file-attributes';
import {
  MediaViewerConstructor,
  MediaViewerInterface,
  MediaViewerConfig,
} from '../mediaviewer';
import { MediaViewerItem } from './media-viewer';
import { Observable } from 'rxjs';

export interface MediaFileListViewerProps {
  readonly context: Context;

  readonly selectedItem: MediaViewerItem;
  readonly list: Array<MediaViewerItem>;

  readonly collectionName?: string;

  readonly MediaViewer: MediaViewerConstructor;
  readonly mediaViewerConfiguration?: MediaViewerConfig;
  readonly basePath: string;

  readonly onClose?: () => void;
}

export interface MediaListFileViewerState {
  readonly subscription?: Subscription;
  readonly mediaViewer: MediaViewerInterface;
}

export class MediaFileListViewer extends Component<
  MediaFileListViewerProps,
  MediaListFileViewerState
> {
  constructor(props: MediaFileListViewerProps) {
    super(props);

    const {
      context,
      collectionName,
      basePath,
      MediaViewer,
      mediaViewerConfiguration,
    } = props;

    const config = {
      ...mediaViewerConfiguration,
      isPreviewGenerated: this.isPreviewGenerated,
      generatePreview: this.generatePreview
    }

    const { config: { authProvider } } = context;

    this.state = {
      mediaViewer: new MediaViewer({
        ...config,
        assets: {
          basePath: basePath,
        },
        fetchToken: fetchToken(authProvider, collectionName),
      }),
    };
  }

  componentDidMount(): void {
    const { context, selectedItem, list, collectionName } = this.props;
    const { config } = context;
    const { serviceHost } = config;
    const { mediaViewer } = this.state;

    mediaViewer.on('fv.close', this.onClose);

    const filesToProcess = list.filter(item => item.type === 'file'); // for now we only support files

    const observableFileItems = filesToProcess
      .map(file =>
        context.getMediaItemProvider(file.id, file.type, collectionName),
      )
      .map(provider => provider.observable().map(item => item as FileItem));

    this.state = {
      subscription: Observable.zip(...observableFileItems).subscribe({
        next: fileItems => {
          const filesWithKeys = fileItems.map((file, index) => ({
            ...file,
            occurrenceKey: filesToProcess[index].occurrenceKey,
          }));

          const files = MediaFileAttributesFactory.fromFileItemList(
            filesWithKeys,
            serviceHost,
          );
          mediaViewer.setFiles(files);

          const id = MediaFileAttributesFactory.getUniqueMediaViewerId(
            selectedItem,
          );
          mediaViewer.open({ id });
        },
      }),
      mediaViewer,
    };
  }

  componentWillUnmount(): void {
    const { mediaViewer, subscription } = this.state;
    if (subscription) {
      subscription.unsubscribe();
    }
    mediaViewer.off('fv.close', this.onClose);
  }

  render(): JSX.Element {
    return <div />;
  }

  private isPreviewGenerated = () => {
    return {
      // HACK: this code depends heavily on MediaViewer Classic internals.
      // isPreviewGenerated is only going to be called here when there is not a supported type
      // passed (that will happen when the file is not processed),
      // so we can just return "false" here instead of "file.processed".
      // Since we are in the process of rewritting this component and deprecating MediaViewer Classic and this wrapper,
      // we judged there was not much of a point on dramatically refactoring both components.;p
      pipe: (cb: (isPreviewGenerated: boolean) => Promise<any>) => cb(false)
    };
  }

  private generatePreview = Promise.resolve;

  private onClose = () => {
    const { onClose } = this.props;
    const { subscription } = this.state;
    if (subscription) {
      subscription.unsubscribe();
    }
    if (onClose) {
      onClose();
    }
  };
}
