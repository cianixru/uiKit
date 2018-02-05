import * as React from 'react';

import { NotificationIndicator } from '@atlaskit/notification-indicator';

import { NotificationCountResponse } from '../src';
import MockNotificationLogClient from './MockNotificationLogClient';

export default function Example() {
  /**
   * We are using a mock version here because we don't want to call out to the real service to get a working example.
   * Typically this would be:
   *
   * const notificationLogClient = new NotificationLogClient(
   *   'base-url',
   *   'cloud-id',
   * );
   */
  const notificationLogClient = new MockNotificationLogClient();
  const response: NotificationCountResponse = { count: 5 };

  notificationLogClient.setResponse(Promise.resolve(response));

  const providerPromise = Promise.resolve(notificationLogClient);

  return (
    <div>
      <div>Initialise client and render a NotificationIndicator badge.</div>

      <NotificationIndicator notificationLogProvider={providerPromise} />
    </div>
  );
}
