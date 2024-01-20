import { Grid } from '@material-ui/core';
import {entityWarningContent} from "../EntityWarning";
import {EntityAboutCard, EntityLinksCard, EntitySwitch} from "@backstage/plugin-catalog";
import React from "react";
import {areLinksAvailable} from "../../../../lib/conditions";

export const locationOverviewContent = (
    <Grid container spacing={3}>
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
                <EntityAboutCard variant="gridItem"/>
            </Grid>
        </Grid>
    </Grid>
);
