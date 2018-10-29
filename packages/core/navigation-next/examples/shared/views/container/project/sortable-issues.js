// @flow

import React, { Component } from 'react';
import { JiraWordmark as JiraWordmarkLogo } from '@atlaskit/logo';

import {
  SortableItem,
  ViewController,
  ViewControllerSubscriber,
} from '../../../../../src';

import { LinkItem } from '../../../components';
import SortableItemState from '../../../providers/sortable-item-state';
import type { ItemsByGroup } from '../../../providers/sortable-item-state/types';
import defaultGetAnalyticsAttributes from '../../common/get-analytics-attributes';
import type { ViewComponentProps } from '../../common/types';

type SortableIssuesViewProps = ViewComponentProps & {
  setItems: ItemsByGroup => void,
  sortableItems: ItemsByGroup,
  viewController: ViewController,
  onDragEnd: (dropResult: *) => void,
};

const initialSortableIssueItems: ItemsByGroup = {
  'starred-filters-group': [
    {
      type: 'SortableItem',
      id: 'older-than-90-days',
      text: 'Older than 90 days',
    },
    { type: 'SortableItem', id: 'critical-bugs', text: 'Critical bugs' },
  ],
  'other-filters-group': [
    {
      type: 'SortableItem',
      id: 'my-open-issues',
      text: 'My open issues',
    },
    {
      type: 'SortableItem',
      id: 'reported-by-me',
      text: 'Reported by me',
    },
    { type: 'SortableItem', id: 'all-issues', text: 'All issues' },
    { type: 'SortableItem', id: 'open-issues', text: 'Open issues' },
    { type: 'SortableItem', id: 'done-issues', text: 'Done issues' },
    {
      type: LinkItem,
      id: 'go-to-root',
      to: '/',
      text: 'Go to root',
      itemComponent: SortableItem,
    },
  ],
};

const getSortableIssues = ({ sortableItems, onDragEnd }: *) => () => [
  {
    id: 'container/project/sortable-issues:header',
    type: 'HeaderSection',
    items: [
      { type: 'Wordmark', wordmark: JiraWordmarkLogo, id: 'jira-wordmark' },
      {
        type: 'BackItem',
        goTo: 'container/project/index',
        id: 'back',
        text: 'Back to Jira',
      },
    ],
  },
  {
    id: 'container/project/sortable-issues:menu',
    nestedGroupKey: 'menu',
    parentId: 'container/project/index:menu',
    type: 'MenuSection',
    alwaysShowScrollHint: true,
    items: [
      {
        type: 'SectionHeading',
        id: 'section-heading',
        text: 'Sortable Issues and filters',
      },
      {
        type: LinkItem,
        id: 'search-issues',
        text: 'Search issues',
        to: '/issues/search',
      },
      {
        type: 'SortableSection',
        id: 'section-filters',
        onDragEnd,
        items: [
          {
            type: 'SortableGroup',
            id: 'starred-filters-group',
            heading: 'Starred filters',
            items: sortableItems['starred-filters-group'],
          },
          {
            type: 'SortableGroup',
            id: 'other-filters-group',
            heading: 'Other filters',
            items: sortableItems['other-filters-group'],
          },
        ],
      },
    ],
  },
];

class SortableIssuesViewBase extends Component<SortableIssuesViewProps> {
  componentDidMount() {
    this.props.setItems(initialSortableIssueItems);
    this.registerView();
  }

  componentDidUpdate(prevProps: SortableIssuesViewProps) {
    if (prevProps.sortableItems !== this.props.sortableItems) {
      this.registerView();
    }
  }

  registerView = () => {
    const {
      viewController,
      sortableItems,
      getItemsFactory,
      viewId,
      type,
      getAnalyticsAttributes,
    } = this.props;
    const { onDragEnd } = this;

    const getItems = getItemsFactory({
      sortableItems,
      onDragEnd,
    });

    viewController.addView({
      getAnalyticsAttributes,
      getItems,
      id: viewId,
      type,
    });
  };

  onDragEnd = (dropResult: *) => {
    if (this.props.onDragEnd) {
      this.props.onDragEnd(dropResult);
    }
  };

  render() {
    return null;
  }
}

const SortableIssuesView = () => (
  <ViewControllerSubscriber>
    {viewController => (
      <SortableItemState>
        {({ sortableItems, onDragEnd, setItems }) => (
          <SortableIssuesViewBase
            sortableItems={sortableItems}
            onDragEnd={onDragEnd}
            setItems={setItems}
            viewController={viewController}
            getAnalyticsAttributes={defaultGetAnalyticsAttributes}
            getItemsFactory={getSortableIssues}
            type="container"
            viewId="container/project/sortable-issues"
          />
        )}
      </SortableItemState>
    )}
  </ViewControllerSubscriber>
);

export default SortableIssuesView;
