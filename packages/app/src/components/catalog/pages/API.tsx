import {EntityLayoutWrapper} from "../contents/EntityLayoutWrapper";
import {EntityLayout} from "@backstage/plugin-catalog";
import Grid from '@material-ui/core/Grid';
import {EntityApiDefinitionCard} from "@backstage/plugin-api-docs";
import React from "react";
import {apiOverviewContent} from "../contents/overview/ApiOverview";
import {ZallyAPILintContent} from "@internal/plugin-zally-api-lint/src/plugin";

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
        <EntityLayout.Route path="/lint" title="LINT" if={entity => entity.spec?.type === 'openapi'}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ZallyAPILintContent />
                </Grid>
            </Grid>
        </EntityLayout.Route>
    </EntityLayoutWrapper>
);
