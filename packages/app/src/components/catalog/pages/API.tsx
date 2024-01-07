import {EntityLayoutWrapper} from "../contents/EntityLayoutWrapper";
import {EntityLayout} from "@backstage/plugin-catalog";
import Grid from "@mui/material/Grid";
import {EntityApiDefinitionCard} from "@backstage/plugin-api-docs";
import React from "react";
import {apiOverviewContent} from "../contents/overview/ApiOverview";

export const apiPage = (
    <EntityLayoutWrapper>
        <EntityLayout.Route path="/" title="Overview">
            {apiOverviewContent}
        </EntityLayout.Route>

        <EntityLayout.Route path="/definition" title="Definition">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <EntityApiDefinitionCard />
                </Grid>
            </Grid>
        </EntityLayout.Route>
    </EntityLayoutWrapper>
);
