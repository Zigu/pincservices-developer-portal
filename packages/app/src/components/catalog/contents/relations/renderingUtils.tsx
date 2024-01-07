import {TableColumn} from "@backstage/core-components";
import {ApiEntity} from "@backstage/catalog-model";
import {EntityTable} from "@backstage/plugin-catalog-react";
import {ApiTypeTitle} from "@backstage/plugin-api-docs";
import React from "react";

export function createSpecApiTypeColumn(): TableColumn<ApiEntity> {
    return {
        title: 'Type',
        field: 'spec.type',
        render: entity => <ApiTypeTitle apiEntity={entity} />,
    };
}

export const minimizedApiEntityColumns: TableColumn<ApiEntity>[] = [
    EntityTable.columns.createEntityRefColumn({ defaultKind: 'API' }),
    EntityTable.columns.createSystemColumn(),
    EntityTable.columns.createSpecLifecycleColumn(),
    createSpecApiTypeColumn()
];
