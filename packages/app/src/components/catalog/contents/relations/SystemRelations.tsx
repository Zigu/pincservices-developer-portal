import Grid from '@material-ui/core/Grid';
import {Direction, EntityCatalogGraphCard} from "@backstage/plugin-catalog-graph";
import {EntityHasComponentsCard, EntityHasResourcesCard} from "@backstage/plugin-catalog";
import {EntityHasApisCard} from "@backstage/plugin-api-docs";
import React from "react";
import {
  RELATION_API_CONSUMED_BY,
  RELATION_API_PROVIDED_BY,
  RELATION_CONSUMES_API,
  RELATION_DEPENDENCY_OF,
  RELATION_DEPENDS_ON,
  RELATION_HAS_PART,
  RELATION_PART_OF,
  RELATION_PROVIDES_API
} from "@backstage/catalog-model";
import {minimizedApiEntityColumns} from "../../renderingUtils";
import {CustomRenderNode} from "../../CustomRenderNode";


export const systemRelationsContent = (

    <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
            <EntityCatalogGraphCard
                variant="gridItem"
                direction={Direction.LEFT_RIGHT}
                height={900}
                relations={[
                    RELATION_PART_OF,
                    RELATION_HAS_PART,
                    RELATION_API_CONSUMED_BY,
                    RELATION_API_PROVIDED_BY,
                    RELATION_CONSUMES_API,
                    RELATION_PROVIDES_API,
                    RELATION_DEPENDENCY_OF,
                    RELATION_DEPENDS_ON,
                ]}
                unidirectional={false}
                renderNode={CustomRenderNode}
            />
        </Grid>

        <Grid item xs={12} md={6} container spacing={1} alignContent="flex-start">
            <Grid item xs={12}>
                <EntityHasApisCard variant="gridItem" columns={minimizedApiEntityColumns}/>
            </Grid>

            <Grid item xs={12}>
                <EntityHasComponentsCard variant="gridItem"/>
            </Grid>

            <Grid item xs={12}>
                <EntityHasResourcesCard variant="gridItem"/>
            </Grid>
        </Grid>
    </Grid>
);
