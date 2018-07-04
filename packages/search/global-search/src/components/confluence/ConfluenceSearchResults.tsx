import * as React from 'react';
import { ResultItemGroup } from '@atlaskit/quick-search';
import SearchIcon from '@atlaskit/icon/glyph/search';
import { Result } from '../../model/Result';
import SearchError from '../SearchError';
import NoRecentActivity from '../NoRecentActivity';
import NoResults from '../NoResults';
import {
  renderResults,
  searchConfluenceItem,
  searchPeopleItem,
  take,
  isEmpty,
  getConfluenceAdvancedSearchLink,
} from '../SearchResultsUtil';

const renderObjectsGroup = (title: string, results: Result[], query: string) =>
  results.length > 0 ? (
    <ResultItemGroup title={title} key="objects">
      {renderResults(results)}
    </ResultItemGroup>
  ) : null;

const renderSpacesGroup = (title: string, results: Result[], query: string) =>
  results.length > 0 ? (
    <ResultItemGroup title={title} key="spaces">
      {renderResults(results)}
    </ResultItemGroup>
  ) : null;

const renderPeopleGroup = (title: string, results: Result[], query: string) =>
  results.length > 0 ? (
    <ResultItemGroup title={title} key="people">
      {renderResults(results)}
    </ResultItemGroup>
  ) : null;

const renderSearchConfluenceItem = (query: string, text: string) =>
  searchConfluenceItem({
    query: query,
    icon: <SearchIcon size="medium" label="Advanced search" />,
    text: text,
    showKeyboardLozenge: true,
  });

const renderSearchPeopleItem = (query: string) =>
  searchPeopleItem({
    query: query,
    icon: <SearchIcon size="medium" label="Search People" />,
    text: 'Search in People',
  });

const renderNoResults = (query: string) => [
  <NoResults key="no-results" />,
  <ResultItemGroup title="" key="advanced-search">
    {renderSearchConfluenceItem(query, 'Advanced search with filters')}
    {renderSearchPeopleItem(query)}
  </ResultItemGroup>,
];

const renderAdvancedSearchGroup = (query: string) => {
  const text =
    query.length === 0 ? 'Advanced search' : `Advanced search for "${query}"`;

  return (
    <ResultItemGroup key="advanced-search">
      {renderSearchPeopleItem(query)}
      {renderSearchConfluenceItem(query, text)}
    </ResultItemGroup>
  );
};

export interface Props {
  query: string;
  isError: boolean;
  isLoading: boolean;
  retrySearch();
  recentlyViewedPages: Result[];
  recentlyViewedSpaces: Result[];
  recentlyInteractedPeople: Result[];
  objectResults: Result[];
  spaceResults: Result[];
  peopleResults: Result[];
}

const renderRecentActivities = (
  query: string,
  recentlyViewedPages: Result[],
  recentlyViewedSpaces: Result[],
  recentlyInteractedPeople: Result[],
) => [
  renderObjectsGroup(
    'Recent pages and blogs',
    take(recentlyViewedPages, 8),
    query,
  ),
  renderSpacesGroup('Recent spaces', take(recentlyViewedSpaces, 3), query),
  renderPeopleGroup(
    'Recently worked with',
    take(recentlyInteractedPeople, 3),
    query,
  ),
  renderAdvancedSearchGroup(query),
];

const renderSearchResults = (
  query: string,
  objectResults: Result[],
  spaceResults: Result[],
  peopleResults: Result[],
) => {
  return [
    renderObjectsGroup(
      'Pages, blogs and attachments',
      take(objectResults, 8),
      query,
    ),
    renderSpacesGroup('Spaces', take(spaceResults, 3), query),
    renderPeopleGroup('People', take(peopleResults, 3), query),
    renderAdvancedSearchGroup(query),
  ];
};

const renderNoQuery = (
  query: string,
  recentlyViewedPages: Result[],
  recentlyViewedSpaces: Result[],
  recentlyInteractedPeople: Result[],
) => {
  if (
    [recentlyInteractedPeople, recentlyViewedPages, recentlyViewedSpaces].every(
      isEmpty,
    )
  ) {
    return (
      <NoRecentActivity advancedSearchUrl={getConfluenceAdvancedSearchLink()} />
    );
  }
  return renderRecentActivities(
    query,
    recentlyViewedPages,
    recentlyViewedPages,
    recentlyInteractedPeople,
  );
};
export default (props: Props) => {
  const {
    query,
    isError,
    objectResults,
    spaceResults,
    peopleResults,
    isLoading,
    recentlyViewedPages,
    recentlyViewedSpaces,
    recentlyInteractedPeople,
    retrySearch,
  } = props;

  if (isError) {
    return <SearchError onRetryClick={retrySearch} />;
  }

  if (query.length === 0) {
    return renderNoQuery(
      query,
      recentlyViewedPages,
      recentlyViewedSpaces,
      recentlyInteractedPeople,
    );
  }

  const noSearchResult = [objectResults, spaceResults, peopleResults].every(
    isEmpty,
  );
  if (noSearchResult) {
    return isLoading
      ? renderRecentActivities(
          query,
          recentlyViewedPages,
          recentlyViewedSpaces,
          recentlyInteractedPeople,
        )
      : renderNoResults(query);
  }

  return renderSearchResults(query, objectResults, spaceResults, peopleResults);
};
