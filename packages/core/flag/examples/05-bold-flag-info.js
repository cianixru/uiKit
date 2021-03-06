// @flow

import React from 'react';
import { colors } from '@findable/theme';
import InfoIcon from '@findable/icon/glyph/info';
import Flag, { FlagGroup } from '../src';

export default () => (
  <FlagGroup>
    <Flag
      appearance="info"
      icon={<InfoIcon label="Info" secondaryColor={colors.N500} />}
      id="info"
      key="info"
      title="Connecting"
      description="We are talking to the interwebs, please hold."
      actions={[{ content: 'Good luck', onClick: () => {} }]}
    />
  </FlagGroup>
);
