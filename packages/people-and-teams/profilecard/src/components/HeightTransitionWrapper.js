// @flow
import React, { PureComponent, type Node as ReactNode } from 'react';
import styled from 'styled-components';
import {
  fontFamily,
  fontSize,
  borderRadius,
  gridSize,
  math,
  elevation,
} from '@findable/theme';

import { bgColor } from '../styled/constants';

const CardAnimationWrapper = styled.div`
  background-color: ${bgColor};
  border-radius: ${borderRadius}px;
  ${props =>
    props.customElevation && elevation[props.customElevation]
      ? elevation[props.customElevation]
      : elevation.e200};
  cursor: default;
  font-family: ${fontFamily};
  font-size: ${fontSize}px;
  overflow: hidden;
  position: relative;
  transition: height 0.25s ease;
  width: ${math.multiply(gridSize, 45)}px;
`;

type Props = {
  children: ReactNode,
  customElevation?: string,
};

type State = {
  height: string,
};

export default class HeightTransitionWrapper extends PureComponent<
  Props,
  State,
> {
  ref: any;

  state = {
    height: 'auto',
  };

  componentDidMount() {
    this.updateRefHeight();
  }

  componentDidUpdate() {
    this.updateRefHeight();
  }

  // eslint-disable-next-line class-methods-use-this
  preventDefault(event: SyntheticEvent<>) {
    event.persist();
    event.preventDefault();
  }

  updateRefHeight() {
    this.setState({
      height:
        this.ref && this.ref.children.length
          ? this.ref.children[0].offsetHeight
          : 'auto',
    });
  }

  render() {
    const { customElevation } = this.props;

    const inlineHeight = {
      height: this.state.height,
    };

    return (
      <CardAnimationWrapper
        customElevation={customElevation}
        style={inlineHeight}
        innerRef={ref => {
          this.ref = ref;
        }}
        onClick={this.preventDefault}
      >
        {this.props.children}
      </CardAnimationWrapper>
    );
  }
}
