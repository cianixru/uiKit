import { ActionDefinition, ActionMarkAttributes } from '@findable/adf-schema';
import { applyMark } from '../utils/apply-mark';
import { WithMark } from '../types';

export const action = (attrs: ActionMarkAttributes) => (
  maybeNode: WithMark | string,
) => applyMark<ActionDefinition>({ type: 'action', attrs }, maybeNode);
