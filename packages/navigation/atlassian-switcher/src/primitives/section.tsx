import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { gridSize, typography } from '@atlaskit/theme';
import styled from 'styled-components';
import {
  analyticsAttributes,
  withAnalyticsContextData,
} from '../utils/analytics';

const SectionContainer = styled.section`
  padding: ${gridSize()}px 0;
`;

const SectionTitle = styled.h1`
  ${typography.h100};
  text-transform: uppercase;
  margin-bottom: ${gridSize()}px;
  margin-left: ${gridSize()}px;
`;

type SectionProps = {
  sectionId: string;
  title: React.ReactElement<FormattedMessage>;
  children?: React.ReactNode;
};

type SectionAnalyticsContext = {
  attributes: {
    group: string;
    groupItemsCount: number;
  };
};

const Section = (props: SectionProps) => {
  const { title, children } = props;

  return React.Children.count(children) ? (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionContainer>
  ) : null;
};

export default withAnalyticsContextData<SectionProps, SectionAnalyticsContext>(
  props =>
    analyticsAttributes({
      group: props.sectionId,
      groupItemsCount: React.Children.count(props.children),
    }),
)(Section);
