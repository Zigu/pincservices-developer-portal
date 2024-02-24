import {EntityLayoutWrapper} from "../contents/EntityLayoutWrapper";
import {EntityLayout, EntityLinksCard, EntitySwitch} from "@backstage/plugin-catalog";
import Grid from '@material-ui/core/Grid';
import {EntityGroupProfileCard, EntityMembersListCard, EntityOwnershipCard} from "@backstage/plugin-org";
import React from "react";
import {entityWarningContent} from "../contents/EntityWarning";
import {areLinksAvailable} from "../../../lib/conditions";

export const groupPage = (
    <EntityLayoutWrapper>
        <EntityLayout.Route path="/" title="Overview">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {entityWarningContent}
                </Grid>
                <Grid item container spacing={3} xs={12} md={6} lg={6}>
                    <Grid item xs={12}>
                        <EntityGroupProfileCard variant="gridItem"/>
                    </Grid>
                    <Grid item xs={12}>
                        <EntityMembersListCard/>
                    </Grid>
                    <EntitySwitch>
                        <EntitySwitch.Case if={areLinksAvailable}>
                            <Grid item xs={12}>
                                <EntityLinksCard />
                            </Grid>
                        </EntitySwitch.Case>
                    </EntitySwitch>

                </Grid>
                <Grid item container spacing={3} xs={12} md={6} lg={6}>
                    <Grid item xs={12}>
                        <EntityOwnershipCard variant="gridItem"/>
                    </Grid>
                </Grid>
            </Grid>
        </EntityLayout.Route>
    </EntityLayoutWrapper>
);
