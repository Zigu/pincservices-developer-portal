import {Grid} from '@material-ui/core';
import {
  EntityAboutCard,
  EntityLinksCard,
  EntitySwitch,
} from "@backstage/plugin-catalog";
import React from "react";
import {entityWarningContent} from "../EntityWarning";
import {EntityArgoCDStatusCard, isArgocdAvailable} from "@internal/plugin-pincservices-argocd";

import {areLinksAvailable} from "../../../../lib/conditions";
import {EntityEndOfLifeCard, isEndOfLifeAvailable} from "@dweber019/backstage-plugin-endoflife";

export const resourceOverviewContent = (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      {entityWarningContent}
    </Grid>

    <Grid item container spacing={3} xs={12} md={5} lg={5}>
      { /* Generic info section */}
      <EntitySwitch>
        <EntitySwitch.Case if={areLinksAvailable}>
          <Grid item xs={12}>
            <EntityLinksCard/>
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>

      <Grid item xs={12}>
        <EntityAboutCard/>
      </Grid>
    </Grid>


    <Grid item container spacing={3} xs={12} md={7} lg={7}>
      { /* Releases section */}
      <EntitySwitch>
        <EntitySwitch.Case if={isArgocdAvailable}>
          <Grid item xs={12}>
            <EntityArgoCDStatusCard/>
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>
    </Grid>

    <Grid item container spacing={3} xs={12}>
      { /* End of Life section */}
      <EntitySwitch>
        <EntitySwitch.Case if={isEndOfLifeAvailable}>
          <Grid item xs={12}>
            <EntityEndOfLifeCard/>
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>
    </Grid>
  </Grid>
)
