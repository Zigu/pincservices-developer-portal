
import { configApiRef, errorApiRef, useApi } from '@backstage/core-plugin-api';
import { useAsyncRetry } from 'react-use';
import { argoCDApiRef } from '../api';
import { ArgoCDAppDetails } from '../types';

export const useAppDetails = ({
                                  appName,
                                  appSelector,
                                  appNamespace,
                                  projectName,
                                  url,
                              }: {
    appName?: string;
    appSelector?: string;
    appNamespace?: string;
    projectName?: string;
    url: string;
}) => {
    const api = useApi(argoCDApiRef);
    const errorApi = useApi(errorApiRef);
    const configApi = useApi(configApiRef);

    const getRevisionHistoryDetails = async (
        appDetails: ArgoCDAppDetails,
        app: string,
        instanceName?: string | undefined,
    ) => {
        const promises: Promise<void>[] | undefined =
            appDetails.status?.history?.map(async (historyRecord: any) => {
                const revisionID = historyRecord.revision;
                if (historyRecord.source?.chart !== undefined) {
                    historyRecord.revision = { revisionID: revisionID };
                    return;
                }
                const revisionDetails = await api.getRevisionDetails({
                    url,
                    app,
                    appNamespace: appDetails.metadata.namespace,
                    revisionID,
                    instanceName,
                });
                historyRecord.revision = { revisionID: revisionID, ...revisionDetails };
            });
        await Promise.all(promises as readonly unknown[] | []);
        return appDetails;
    };

    const { loading, value, error, retry } = useAsyncRetry(async () => {
        const argoSearchMethod: boolean = Boolean(
            configApi.getOptionalConfigArray('argocd.appLocatorMethods')?.length,
        );
        try {
            if (!argoSearchMethod && appName) {
                const appDetails = await api.getAppDetails({
                    url,
                    appName,
                    appNamespace,
                });
                if (
                    appDetails &&
                    appDetails?.status &&
                    appDetails?.status?.history &&
                    appDetails?.status?.history.length > 0
                ) {
                    return getRevisionHistoryDetails(appDetails, appName);
                }

                return appDetails;
            }
            if (argoSearchMethod && appName) {
                const kubeInfo = await api.serviceLocatorUrl({
                    appName: appName as string,
                    appNamespace: appNamespace,
                });
                if (kubeInfo instanceof Error) return kubeInfo;
                const promises = kubeInfo.map(async (instance: any) => {
                    const apiOut = await api.getAppDetails({
                        url,
                        appName,
                        appNamespace,
                        instance: instance.name,
                    });
                    if (!apiOut.metadata) {
                        return {
                            status: {
                                history: [],
                                sync: { status: 'Missing' },
                                health: { status: 'Missing' },
                                operationState: {},
                            },
                            metadata: { name: appName, instance: instance.name },
                        };
                    }
                    apiOut.metadata.instance = instance;
                    if (
                        apiOut &&
                        apiOut?.status &&
                        apiOut?.status?.history &&
                        apiOut?.status?.history.length > 0
                    ) {
                        return getRevisionHistoryDetails(apiOut, appName, instance.name);
                    }
                    return apiOut;
                });
                return await Promise.all(promises);
            }
            if (argoSearchMethod && appSelector) {
                const kubeInfo = await api.serviceLocatorUrl({
                    appSelector: appSelector as string,
                    appNamespace,
                });
                if (kubeInfo instanceof Error) return kubeInfo;
                const promises = kubeInfo.map(async (instance: any) => {
                    const apiOut = await api.getAppListDetails({
                        url,
                        appSelector,
                        appNamespace,
                        instance: instance.name,
                    });
                    return apiOut;
                });
                const output = await Promise.all(promises);
                const items = {
                    items: output
                        .flatMap(argoCdAppList => argoCdAppList.items)
                        .filter(item => item !== null),
                };
                const getRevisionHistroyPromises = items.items.map(
                    async (item: any) => {
                        if (item?.status.history && item?.status.history.length > 0) {
                            return getRevisionHistoryDetails(
                                item,
                                item.metadata.name,
                                item.metadata.instance.name,
                            );
                        }
                        return item;
                    },
                );
                return Promise.all(getRevisionHistroyPromises).then(result =>
                    result.filter(n => n),
                );
            }
            if (appSelector || projectName) {
                const result = await api.listApps({ url, appSelector, appNamespace, projectName });
                if (result.items && result.items.length > 0) {
                    const apps = {
                        items: result.items.filter(item => item !== null),
                    };
                    const getRevisionHistroyPromises = apps.items.map(
                        async (item: any) => {
                            if (item?.status.history && item?.status.history.length > 0) {
                                return getRevisionHistoryDetails(item, item.metadata.name);
                            }
                            return item;
                        },
                    );
                    return Promise.all(getRevisionHistroyPromises).then(output =>
                        output.filter(n => n),
                    );
                }
                return result;
            }
            return Promise.reject('Neither appName nor appSelector provided');
        } catch (e: any) {
            errorApi.post(new Error('Something went wrong'));
            return Promise.reject(e);
        }
    });
    return {
        loading,
        value,
        error,
        retry,
    };
};
