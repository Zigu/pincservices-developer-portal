import {EntityLayoutWrapper} from "../contents/EntityLayoutWrapper";
import {EntityLayout, EntityLinksCard} from "@backstage/plugin-catalog";
import { Grid } from '@material-ui/core';
import {EntityGroupProfileCard, EntityMembersListCard, EntityOwnershipCard} from "@backstage/plugin-org";
import React from "react";
import {entityWarningContent} from "../contents/EntityWarning";

export const groupPage = (
    <EntityLayoutWrapper>
        <EntityLayout.Route path="/" title="Overview">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {entityWarningContent}
                </Grid>
                <Grid item container spacing={3} xs={12} md={6} lg={6}>
                    <Grid item>
                        <EntityGroupProfileCard variant="gridItem"/>
                    </Grid>
                    <Grid item>
                        <EntityMembersListCard/>
                    </Grid>
                    <Grid item>
                        <EntityLinksCard />
                    </Grid>
                </Grid>
                <Grid item container spacing={3} xs={12} md={6} lg={6}>
                    <Grid item>
                        <EntityOwnershipCard variant="gridItem"/>
                    </Grid>
                </Grid>
            </Grid>
        </EntityLayout.Route>
    </EntityLayoutWrapper>
);
