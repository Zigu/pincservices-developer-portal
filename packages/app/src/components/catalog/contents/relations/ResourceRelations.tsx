import Grid from '@material-ui/core/Grid';
import {Direction, EntityCatalogGraphCard} from "@backstage/plugin-catalog-graph";
import {EntityDependsOnComponentsCard, EntityDependsOnResourcesCard,} from "@backstage/plugin-catalog";
import React from "react";
import {CustomRenderNode} from "../../CustomRenderNode";
import {minimizedComponentsEntityColumns, minimizedResourceEntityColumns} from "../../renderingUtils";


export const resourceRelationsContent = (
    <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
            <EntityCatalogGraphCard
                variant="gridItem"
                direction={Direction.TOP_BOTTOM}
                height={900}
                renderNode={CustomRenderNode}
            />
        </Grid>

        <Grid item xs={12} md={6} container spacing={1} alignContent="flex-start">
            <Grid item xs={12}>
                <EntityDependsOnComponentsCard variant="gridItem" columns={minimizedComponentsEntityColumns}/>
            </Grid>

            <Grid item xs={12}>
                <EntityDependsOnResourcesCard variant="gridItem" columns={minimizedResourceEntityColumns}/>
            </Grid>
        </Grid>
    </Grid>
);
