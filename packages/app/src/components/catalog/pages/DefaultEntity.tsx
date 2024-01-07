import Grid from "@mui/material/Grid";
import {EntityAboutCard, EntityLayout, EntityLinksCard} from "@backstage/plugin-catalog";
import {EntityCatalogGraphCard} from "@backstage/plugin-catalog-graph";
import {EntityLayoutWrapper} from "../contents/EntityLayoutWrapper";
import React from "react";
import {entityWarningContent} from "../contents/EntityWarning";
import {CustomRenderNode} from "../CustomRenderNode";

const defaultOverviewContent = (
    <Grid container spacing={3} alignItems="stretch">
        {entityWarningContent}
        <Grid item md={6}>
            <EntityAboutCard variant="gridItem"/>
        </Grid>
        <Grid item md={6}>
            <EntityLinksCard/>
        </Grid>
        <Grid item md={6} xs={12}>
            <EntityCatalogGraphCard variant="gridItem" height={400} renderNode={CustomRenderNode}/>
        </Grid>
    </Grid>
);

export const defaultEntityPage = (
    <EntityLayoutWrapper>
        <EntityLayout.Route path="/" title="Overview">
            {defaultOverviewContent}
        </EntityLayout.Route>

    </EntityLayoutWrapper>
);
