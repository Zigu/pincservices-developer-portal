import Grid from '@material-ui/core/Grid';
import {Direction, EntityCatalogGraphCard} from "@backstage/plugin-catalog-graph";
import {
    EntityDependsOnComponentsCard,
    EntityDependsOnResourcesCard,
    EntityHasSubcomponentsCard,
} from "@backstage/plugin-catalog";
import {EntityConsumedApisCard, EntityProvidedApisCard} from "@backstage/plugin-api-docs";
import React from "react";
import {minimizedApiEntityColumns, minimizedComponentsEntityColumns, minimizedResourceEntityColumns} from "../../renderingUtils";
import {CustomRenderNode} from "../../CustomRenderNode";


export const componentRelationsContent = (
<Grid container spacing={3}>
    <Grid item xs={12} md={6}>
        <EntityCatalogGraphCard
            variant="gridItem"
            direction={Direction.TOP_BOTTOM}
            height={900} renderNode={CustomRenderNode}/>
    </Grid>

    <Grid item xs={12} md={6} container spacing={1} alignContent="flex-start">
        <Grid item xs={12}>
            <EntityProvidedApisCard variant="gridItem" columns={minimizedApiEntityColumns}/>
        </Grid>
        <Grid item xs={12}>
            <EntityConsumedApisCard variant="gridItem" columns={minimizedApiEntityColumns}/>
        </Grid>
        <Grid item xs={12}>
            <EntityDependsOnComponentsCard variant="gridItem" columns={minimizedComponentsEntityColumns}/>
        </Grid>
        <Grid item xs={12}>
            <EntityDependsOnResourcesCard variant="gridItem" columns={minimizedResourceEntityColumns}/>
        </Grid>
    </Grid>
    <Grid item xs={12}>
        <EntityHasSubcomponentsCard variant="gridItem" />
    </Grid>
</Grid>
);
