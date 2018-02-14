import styled from 'styled-components';
import { akColorN30, akBorderRadius } from '@atlaskit/util-shared-styles';
import { Wrapper as WrapperDefault, padding } from '../styles';

export const Wrapper = styled(WrapperDefault)`
  margin: 12px 0;
`;

export const Header = styled.div`
  cursor: pointer;
  padding: ${padding / 2}px ${padding / 2}px ${padding / 4}px;
  vertical-align: middle;
`;

// tslint:disable-next-line:variable-name
export const Content = styled.div`
  padding: ${padding}px;
  background: white;
  border: 1px solid ${akColorN30};
  border-radius: ${akBorderRadius};
`;

// tslint:disable-next-line:variable-name
export const ContentWrapper = styled.div`
  padding: 0 ${padding}px ${padding}px;
`;
