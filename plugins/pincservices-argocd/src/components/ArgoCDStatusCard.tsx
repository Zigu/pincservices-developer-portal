
import React from 'react';
import {
    Box,
    LinearProgress,
    List,
    ListItem,
    Tooltip,
    Button,
} from '@material-ui/core';
import { Entity } from '@backstage/catalog-model';
import {
    ARGOCD_ANNOTATION_APP_NAME,
    useArgoCDAppData,
} from './useArgoCDAppData';
import {
    ErrorBoundary,
    InfoCard, MissingAnnotationEmptyState,
    Table,
    TableColumn,
} from '@backstage/core-components';
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { isArgocdAvailable } from '../conditions';
import { ArgoCDAppDetails, ArgoCDAppList } from '../types';
import { useAppDetails } from './useAppDetails';
import SyncIcon from '@material-ui/icons/Sync';
import { useEntity } from '@backstage/plugin-catalog-react';
import { DetailsDrawerComponent as detailsDrawerComponent } from './DetailsDrawer';

interface Condition {
    message?: string;
    lastTransitionTime?: string;
    type: string;
}

const MessageComponent = ({
                              conditions,
                          }: {
    conditions: Condition[] | undefined;
}) => {
    return (
        <>
            {conditions ? (
                <List dense>
                    {conditions.map((condition: Condition, index: number) => (
                        <ListItem style={{ padding: 0 }} key={index}>
                            {condition.message}
                        </ListItem>
                    ))}
                </List>
            ) : null}
        </>
    );
};

const State = ({
                   value,
                   conditions,
               }: {
    value: string;
    conditions: Condition[] | undefined;
}) => {
    const colorMap: Record<string, string> = {
        Pending: '#dcbc21',
        Synced: 'green',
        Healthy: 'green',
        Inactive: 'black',
        Failed: 'red',
    };
    if (conditions !== undefined) {
        return (
            <Tooltip
                title={<MessageComponent conditions={conditions} />}
                placement="bottom-start"
            >
                <Box display="flex" alignItems="center">
                    <Button style={{ paddingLeft: '0px' }}>
            <span
                style={{
                    display: 'block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: colorMap[value] || '#dcbc21',
                    marginRight: '5px',
                }}
            />
                        {value}
                    </Button>
                </Box>
            </Tooltip>
        );
    }
    return (
        <Box display="flex" alignItems="center">
      <span
          style={{
              display: 'block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: colorMap[value] || '#dcbc21',
              marginRight: '5px',
          }}
      />
            {value}
        </Box>
    );
};

type OverviewComponentProps = {
    data: ArgoCDAppList;
    extraColumns: TableColumn[];
    retry: () => void;
};

const OverviewComponent = ({
                               data,
                               extraColumns,
                               retry,
                           }: OverviewComponentProps) => {
    const configApi = useApi(configApiRef);
    const baseUrl = configApi.getOptionalString('argocd.baseUrl');
    const supportsMultipleArgoInstances: boolean = Boolean(
        configApi.getOptionalConfigArray('argocd.appLocatorMethods')?.length,
    );

    const getBaseUrl = (row: any): string | undefined => {
        if (supportsMultipleArgoInstances && !baseUrl) {
            return configApi
                .getConfigArray('argocd.appLocatorMethods')
                .find(value => value.getOptionalString('type') === 'config')
                ?.getOptionalConfigArray('instances')
                ?.find(
                    value =>
                        value.getOptionalString('name') === row.metadata?.instance?.name,
                )
                ?.getOptionalString('url');
        }
        return baseUrl;
    };

    const columns: TableColumn[] = [
        {
            title: 'Name',
            highlight: true,
            render: (row: any): React.ReactNode =>
                detailsDrawerComponent(row, getBaseUrl(row)),
        },
        {
            title: 'Health Status',
            render: (row: any): React.ReactNode => (
                <State value={row.status.health.status} conditions={undefined} />
            ),
        }
    ];

    if (supportsMultipleArgoInstances) {
        columns.splice(1, 0, {
            title: 'Instance',
            render: (row: any): React.ReactNode => row.metadata?.instance?.name,
        });
    }

    return (
        <Table
            title="ArgoCD overview"
            options={{
                paging: false,
                search: false,
                sorting: false,
                draggable: false,
                padding: 'dense',
            }}
            data={data.items || []}
            columns={columns.concat(extraColumns)}
            actions={[
                {
                    icon: () => <SyncIcon />,
                    tooltip: 'Refresh',
                    isFreeAction: true,
                    onClick: () => retry(),
                },
            ]}
        />
    );
};

const ArgoCDStatus = ({
                           entity,
                           extraColumns,
                       }: {
    entity: Entity;
    extraColumns: TableColumn[];
}) => {
    const { url, appName, appSelector, appNamespace, projectName } = useArgoCDAppData({
        entity,
    });
    const { loading, value, error, retry } = useAppDetails({
        url,
        appName,
        appSelector,
        appNamespace,
        projectName,
    });
    if (loading) {
        return (
            <InfoCard title="ArgoCD overview">
                <LinearProgress />
            </InfoCard>
        );
    }
    if (error) {
        return (
            <InfoCard title="ArgoCD overview">
                Error occurred while fetching data. {error.name}: {error.message}
            </InfoCard>
        );
    }
    if (value) {
        if ((value as ArgoCDAppList).items !== undefined) {
            return (
                <OverviewComponent
                    data={value as ArgoCDAppList}
                    retry={retry}
                    extraColumns={extraColumns}
                />
            );
        }
        if (Array.isArray(value)) {
            const wrapped: ArgoCDAppList = {
                items: value as Array<ArgoCDAppDetails>,
            };
            return (
                <OverviewComponent
                    data={wrapped}
                    retry={retry}
                    extraColumns={extraColumns}
                />
            );
        }
        const wrapped: ArgoCDAppList = {
            items: [value as ArgoCDAppDetails],
        };
        return (
            <OverviewComponent
                data={wrapped}
                retry={retry}
                extraColumns={extraColumns}
            />
        );
    }
    return null;
};

type Props = {
    /** @deprecated The entity is now grabbed from context instead */
    entity?: Entity;
    extraColumns?: TableColumn[];
};

export const ArgoCDStatusCard = (props: Props) => {
    const { entity } = useEntity();
    return !isArgocdAvailable(entity) ? (
        <MissingAnnotationEmptyState annotation={ARGOCD_ANNOTATION_APP_NAME} />
    ) : (
        <ErrorBoundary>
            <ArgoCDStatus entity={entity} extraColumns={props.extraColumns || []} />
        </ErrorBoundary>
    );
};
