import Grid from "@mui/material/Grid";
import {
    EntityAboutCard,
    EntityLinksCard, EntitySwitch,
} from "@backstage/plugin-catalog";
import React from "react";
import {entityWarningContent} from "../EntityWarning";
import {EntityCatalogGraphCard} from "@backstage/plugin-catalog-graph";
import {EntityConsumingComponentsCard, EntityProvidingComponentsCard} from "@backstage/plugin-api-docs";
import {areLinksAvailable} from "../../../../lib/conditions";
import {CustomRenderNode} from "../../CustomRenderNode";

export const apiOverviewContent = (
    <Grid container spacing={3} alignItems="start">
        <Grid item xs={12}>
            {entityWarningContent}
        </Grid>

        { /* Generic info section */ }
        <Grid item container spacing={3} xs={12} md={5} lg={5} direction="column">
            <EntitySwitch>
                <EntitySwitch.Case if={areLinksAvailable}>
                    <Grid item xs={12}>
                        <EntityLinksCard />
                    </Grid>
                </EntitySwitch.Case>
            </EntitySwitch>
            <Grid item xs={12}>
                <EntityAboutCard />
            </Grid>
        </Grid>

        { /* Relation section */ }
        <Grid item container spacing={3} xs={12} md={7} lg={7} direction="column">
            <Grid item xs={12}>
                <EntityCatalogGraphCard variant="gridItem" height={400} renderNode={CustomRenderNode}/>
            </Grid>

            <Grid item xs={12}>
                <EntityProvidingComponentsCard/>
            </Grid>
            <Grid item xs={12}>
                <EntityConsumingComponentsCard/>
            </Grid>

        </Grid>
    </Grid>
)
