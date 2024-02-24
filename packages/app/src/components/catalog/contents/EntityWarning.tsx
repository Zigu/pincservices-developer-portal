import {EntityOrphanWarning, EntityProcessingErrorsPanel, EntityRelationWarning, EntitySwitch, hasCatalogProcessingErrors, hasRelationWarnings, isOrphan} from "@backstage/plugin-catalog";
import Grid from '@material-ui/core/Grid';
import React from "react";
import {EntityTipsDialog} from "@dweber019/backstage-plugin-tips";

export const entityWarningContent = (
    <Grid container spacing={3}>
        <EntitySwitch>
            <EntitySwitch.Case if={isOrphan}>
                <Grid item xs={12}>
                    <EntityOrphanWarning/>
                </Grid>
            </EntitySwitch.Case>
        </EntitySwitch>
        <EntitySwitch>
            <EntitySwitch.Case if={hasRelationWarnings}>
                <Grid item xs={12}>
                    <EntityRelationWarning />
                </Grid>
            </EntitySwitch.Case>
        </EntitySwitch>
        <EntitySwitch>
            <EntitySwitch.Case if={hasCatalogProcessingErrors}>
                <Grid item xs={12}>
                    <EntityProcessingErrorsPanel/>
                </Grid>
            </EntitySwitch.Case>
        </EntitySwitch>
        <EntityTipsDialog />
    </Grid>
);
