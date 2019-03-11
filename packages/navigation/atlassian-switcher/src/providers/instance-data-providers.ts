import { fetchJson, postJson } from '../utils/fetch';
import asDataProvider from './as-data-provider';
import {
  LicenseInformationResponse,
  Permissions,
  RecentContainersResponse,
  UserPermissionResponse,
  WithCloudId,
  XFlowSettingsResponse,
} from '../types';
import { cached } from '../utils/cached';

// Recent activity api
const fetchRecentContainers = ({ cloudId }: WithCloudId) =>
  fetchJson<RecentContainersResponse>(
    `/gateway/api/activity/api/client/recent/containers?cloudId=${cloudId}`,
  );

export const RecentContainersProvider = asDataProvider(fetchRecentContainers);

// License information api
const fetchLicenseInformation = cached(({ cloudId }: WithCloudId) =>
  fetchJson<LicenseInformationResponse>(
    `/gateway/api/xflow/${cloudId}/license-information`,
  ),
);

export const LicenseInformationProvider = asDataProvider(
  fetchLicenseInformation,
  fetchLicenseInformation.cached,
);

// Permissions api
type FetchPermissionParamsType = WithCloudId & {
  permissionId: Permissions;
};
const fetchPermission = cached(
  ({ cloudId, permissionId }: FetchPermissionParamsType) =>
    postJson<UserPermissionResponse>(`/gateway/api/permissions/permitted`, {
      permissionId,
      resourceId: `ari:cloud:platform::site/${cloudId}`,
    }).then(permission => permission.permitted),
);

export const UserPermissionProvider = asDataProvider(
  fetchPermission,
  fetchPermission.cached,
);

// Xflow settings api
const fetchXflowSettings = cached(({ cloudId }: WithCloudId) =>
  fetchJson<XFlowSettingsResponse>(
    `/gateway/api/site/${cloudId}/setting/xflow`,
  ).then(xFlowSettings =>
    xFlowSettings['product-suggestions-enabled'] !== undefined
      ? xFlowSettings['product-suggestions-enabled']
      : true,
  ),
);

export const XFlowSettingsProvider = asDataProvider(
  fetchXflowSettings,
  fetchXflowSettings.cached,
);

export const prefetchAll = ({ cloudId }: WithCloudId) => {
  fetchLicenseInformation.prefetch({ cloudId });
  fetchXflowSettings.prefetch({ cloudId });
  fetchPermission.prefetch({
    cloudId,
    permissionId: Permissions.ADD_PRODUCTS,
  });
  fetchPermission.prefetch({ cloudId, permissionId: Permissions.MANAGE });
};

export const resetAll = () => {
  fetchLicenseInformation.reset();
  fetchXflowSettings.reset();
  fetchPermission.reset();
};
