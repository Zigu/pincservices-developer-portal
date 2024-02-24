import Grid from "@material-ui/core/Grid";
import {
    EntityAboutCard,
    EntityHasSystemsCard,
    EntityLinksCard, EntitySwitch,
} from "@backstage/plugin-catalog";
import React from "react";
import {entityWarningContent} from "../EntityWarning";
import {Direction, EntityCatalogGraphCard} from "@backstage/plugin-catalog-graph";
import {
    RELATION_DEPENDENCY_OF,
    RELATION_DEPENDS_ON,
    RELATION_HAS_PART,
    RELATION_PART_OF
} from "@backstage/catalog-model";
import {areLinksAvailable} from "../../../../lib/conditions";
import {CustomRenderNode} from "../../CustomRenderNode";

export const domainOverviewContent = (
    <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12}>
            {entityWarningContent}
        </Grid>

        { /* Generic info section */ }
        <Grid item container spacing={3} xs={12} md={5} lg={5}>
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
        <Grid item container spacing={3} xs={12} md={7} lg={7}>
            <Grid item xs={12}>
                <EntityCatalogGraphCard
                    variant="gridItem"
                    height={400}
                    direction={Direction.TOP_BOTTOM}
                    relations={[
                        RELATION_PART_OF,
                        RELATION_HAS_PART,
                        RELATION_DEPENDENCY_OF,
                        RELATION_DEPENDS_ON,
                    ]}
                    renderNode={CustomRenderNode}
                />
            </Grid>

            <Grid item xs={12}>
                <EntityHasSystemsCard variant="gridItem"/>
            </Grid>
        </Grid>
    </Grid>
)
