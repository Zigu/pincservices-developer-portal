import {TableColumn} from "@backstage/core-components";
import {ApiEntity, ComponentEntity, ResourceEntity} from "@backstage/catalog-model";
import {EntityTable} from "@backstage/plugin-catalog-react";
import {ApiTypeTitle} from "@backstage/plugin-api-docs";
import React from "react";
import {CatalogTable, CatalogTableRow} from "@backstage/plugin-catalog";

export function createSpecApiTypeColumn(): TableColumn<ApiEntity> {
    return {
        title: 'Type',
        field: 'spec.type',
        render: entity => <ApiTypeTitle apiEntity={entity} />,
    };
}

export function createSpecApiTypeColumnForExplorer(): TableColumn<CatalogTableRow> {
    return {
        title: 'Type',
        field: 'spec.type',
        render: row => <ApiTypeTitle apiEntity={row.entity as ApiEntity} />,
    };
}

export const minimizedApiEntityColumns: TableColumn<ApiEntity>[] = [
    EntityTable.columns.createEntityRefColumn({ defaultKind: 'API' }),
    EntityTable.columns.createSystemColumn(),
    EntityTable.columns.createSpecLifecycleColumn(),
    createSpecApiTypeColumn()
];

export const catalogIndexColumns: TableColumn<CatalogTableRow>[] = [
    CatalogTable.columns.createTitleColumn({ hidden: true }),
    CatalogTable.columns.createNameColumn(),
    CatalogTable.columns.createSystemColumn(),
    CatalogTable.columns.createOwnerColumn(),
    CatalogTable.columns.createSpecTypeColumn(),
    CatalogTable.columns.createSpecLifecycleColumn(),
    CatalogTable.columns.createTagsColumn()
];

export const apiExplorerColumns: TableColumn<CatalogTableRow>[] = [
    CatalogTable.columns.createTitleColumn({ hidden: true }),
    CatalogTable.columns.createNameColumn({ defaultKind: 'API' }),
    CatalogTable.columns.createSystemColumn(),
    CatalogTable.columns.createOwnerColumn(),
    CatalogTable.columns.createSpecLifecycleColumn(),
    createSpecApiTypeColumnForExplorer()
];

export const minimizedResourceEntityColumns: TableColumn<ResourceEntity>[] = [
    EntityTable.columns.createEntityRefColumn({defaultKind: 'Resource' }),
    EntityTable.columns.createOwnerColumn(),
    EntityTable.columns.createSystemColumn(),
    EntityTable.columns.createSpecTypeColumn()
]

export const minimizedComponentsEntityColumns: TableColumn<ComponentEntity>[] = [
    EntityTable.columns.createEntityRefColumn({defaultKind: 'Component' }),
    EntityTable.columns.createOwnerColumn(),
    EntityTable.columns.createSystemColumn(),
    EntityTable.columns.createSpecTypeColumn(),
]
