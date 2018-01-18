// @flow

import styled, { css, injectGlobal, keyframes } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import type { SpinnerPhases } from '../types';
import { SIZES_MAP } from './constants';

type StyleParams = {
  invertColor: boolean,
  phase: SpinnerPhases,
  size: number,
};

const getStrokeWidth = (size: number) => Math.round(size / 10);

const getStrokeCircumference = (size: number) => {
  const strokeWidth = getStrokeWidth(size);
  const strokeRadius = size / 2 - strokeWidth / 2;
  return Math.PI * strokeRadius * 2;
};

export const keyframeNames = {
  noop: 'atlaskitSpinnerNoop',
  rotate: 'atlaskitSpinnerRotate',
  enter_stroke_small: 'atlaskitSpinnerEnterStrokeSmall',
  enter_stroke_medium: 'atlaskitSpinnerEnterStrokeMedium',
  enter_stroke_large: 'atlaskitSpinnerEnterStrokeLarge',
  enter_stroke_xlarge: 'atlaskitSpinnerEnterStrokeXLarge',
};

/* Define keyframes statically to prevent a perfomance issue in styled components v1 where the keyframes function
 * does not cache previous values resulting in each spinner injecting the same keyframe definition
 * in the DOM.
 * This can be reverted to use the keyframes fn when we upgrade to styled components v2
 */
// eslint-disable-next-line no-unused-expressions
injectGlobal`
  @keyframes ${keyframeNames.noop} {
    from { opacity: 0; }
    to { opacity: 0; }
  }

  @keyframes ${keyframeNames.rotate} {
    to { transform: rotate(360deg);
  }

  @keyframes ${keyframeNames.enter_stroke_small} {
    from { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.small)}px; }
    to { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.small) *
      0.8}px; }
  }

  @keyframes ${keyframeNames.enter_stroke_medium} {
    from { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.medium)}px; }
    to { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.medium) *
      0.8}px; }
  }

  @keyframes ${keyframeNames.enter_stroke_large} {
    from { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.large)}px; }
    to { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.large) *
      0.8}px; }
  }

  @keyframes ${keyframeNames.enter_stroke_xlarge} {
    from { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.xlarge)}px; }
    to { stroke-dashoffset: ${getStrokeCircumference(SIZES_MAP.xlarge) *
      0.8}px; }
  }
`;

/* If a standard size is used, we can use one of our statically defined keyframes, otherwise
 * we're forced to dynamically create the keyframe and incur a performance cost.
 */
const getEnterStrokeKeyframe = (size: number) => {
  const standardSizeName = Object.keys(SIZES_MAP).find(
    sizeName => size === SIZES_MAP[sizeName],
  );
  if (standardSizeName) {
    return keyframeNames[`enter_stroke_${standardSizeName}`];
  }

  const circumference = getStrokeCircumference(size);
  return keyframes`
    from { stroke-dashoffset: ${circumference}px; }
    to { stroke-dashoffset: ${circumference * 0.8}px; }
  `;
};

const spinnerColor = themed({ light: colors.N500, dark: colors.N0 });
const spinnerColorInverted = themed({ light: colors.N0, dark: colors.N0 });

export const getStrokeColor = ({
  invertColor,
  ...props
}: {
  invertColor?: boolean,
  // $FlowFixMe TEMPORARY
}): string => (invertColor ? spinnerColorInverted(props) : spinnerColor(props));

export const svgStyles = css`
  ${(props: StyleParams) => {
    const circumference = getStrokeCircumference(props.size);

    const idleRotation = `0.86s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite ${
      keyframeNames.rotate
    }`;

    const spinUpStroke = `0.8s ease-in-out ${getEnterStrokeKeyframe(
      props.size,
    )}`;

    const spinUpOpacity = `0.2s ease-in-out akSpinnerContainerLeaveOpacity`;

    const activeAnimations = [idleRotation];
    if (props.phase === 'ENTER') {
      activeAnimations.push(spinUpStroke, spinUpOpacity);
    }

    return css`
      animation: ${activeAnimations.join(', ')};
      fill: none;
      stroke: ${getStrokeColor};
      stroke-dasharray: ${circumference}px;
      stroke-dashoffset: ${circumference * 0.8}px;
      stroke-linecap: round;
      stroke-width: ${getStrokeWidth(props.size)}px;
      transform-origin: center;
    `;
  }};
`;

const Svg = styled.svg`
  ${svgStyles};
`;
Svg.displayName = 'SpinnerSvg';
export default Svg;
