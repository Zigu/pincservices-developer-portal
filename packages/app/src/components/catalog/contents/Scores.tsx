import React from "react";
import {EntityScoreCardContent} from "@oriflame/backstage-plugin-score-card";
import Grid from "@material-ui/core/Grid";

export const scoresContent = (
    <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12}>
            <EntityScoreCardContent/>
        </Grid>
    </Grid>
);
