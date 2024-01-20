import { Grid } from '@material-ui/core';
import {Direction, EntityCatalogGraphCard} from "@backstage/plugin-catalog-graph";
import {
    EntityDependsOnComponentsCard,
    EntityDependsOnResourcesCard,
} from "@backstage/plugin-catalog";
import React from "react";
import {CustomRenderNode} from "../../CustomRenderNode";


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

        <Grid item xs={12} md={6} container spacing={1}>
            <Grid item xs={12}>
                <EntityDependsOnComponentsCard variant="gridItem"/>
            </Grid>

            <Grid item xs={12}>
                <EntityDependsOnResourcesCard variant="gridItem"/>
            </Grid>
        </Grid>
    </Grid>
);
