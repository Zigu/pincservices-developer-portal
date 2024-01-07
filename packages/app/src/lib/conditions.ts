import {Entity} from "@backstage/catalog-model";

export const areLinksAvailable = (entity: Entity) =>
    Boolean(entity.metadata.links && entity.metadata.links.length > 0);


// changelog-file-ref

export const isChangelogFileRefAvailable = (entity: Entity) =>
    Boolean(entity.metadata.annotations?.['changelog-file-ref']);
