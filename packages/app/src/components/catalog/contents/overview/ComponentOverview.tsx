import Grid from '@material-ui/core/Grid';
import {
  EntityAboutCard,
  EntityLabelsCard,
  EntityLinksCard,
  EntitySwitch,
  hasLabels,
  isComponentType
} from "@backstage/plugin-catalog";
import React from "react";
import {entityWarningContent} from "../EntityWarning";
import {EntitySonarQubeCard} from "@backstage/plugin-sonarqube";
import {isSonarQubeAvailable} from "@backstage/plugin-sonarqube-react";
import {
  EntityGitlabLanguageCard,
  EntityGitlabReleasesCard,
  isGitlabAvailable
} from "@immobiliarelabs/backstage-plugin-gitlab";
import {EntityJiraOverviewCard, isJiraAvailable} from "@roadiehq/backstage-plugin-jira";
import {EntityArgoCDOverviewCard, isArgocdAvailable} from "@roadiehq/backstage-plugin-argo-cd";
import {areLinksAvailable, isChangelogFileRefAvailable} from "../../../../lib/conditions";
import {EntityChangelogCard} from "@rsc-labs/backstage-changelog-plugin";
import {EntityEndOfLifeCard, isEndOfLifeAvailable} from "@dweber019/backstage-plugin-endoflife";
import {EntityProvidedApisCard} from "@backstage/plugin-api-docs";
import {minimizedApiEntityColumns} from "../../renderingUtils";
import {EntityHighlightsCard} from "@rsc-labs/backstage-highlights-plugin";

export const componentOverviewContent = (
  <Grid container spacing={3}>

    <Grid item xs={12}>
      {entityWarningContent}
    </Grid>

    <Grid item container xs={12} md={5} lg={5} spacing={3} alignContent="flex-start">
      { /* Generic info section */}

      <Grid item xs={12}>
        <EntityAboutCard/>
      </Grid>

      <EntitySwitch>
        <EntitySwitch.Case if={areLinksAvailable}>
          <Grid item xs={12}>
            <EntityLinksCard/>
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>

      <EntitySwitch>
        <EntitySwitch.Case if={hasLabels}>
          <Grid item xs={12}>
            <EntityLabelsCard/>
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>

      <EntitySwitch>
        <EntitySwitch.Case if={isGitlabAvailable}>
          <Grid item xs={12}>
            <EntityGitlabLanguageCard/>
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>

      <Grid item xs={12}>
        <EntityHighlightsCard />
      </Grid>

      { /* Quality section */}
      <EntitySwitch>
        <EntitySwitch.Case if={isSonarQubeAvailable}>
          <Grid item xs={12}>
            <EntitySonarQubeCard variant="gridItem"/>
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>

      { /* End of Life section */}
      <EntitySwitch>
        <EntitySwitch.Case if={isEndOfLifeAvailable}>
          <Grid item xs={12}>
            <EntityEndOfLifeCard />
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>

    </Grid>

    <Grid item container xs={12} md={7} lg={7} spacing={3} alignContent="flex-start">

      <EntitySwitch>
        <EntitySwitch.Case if={isComponentType('service')}>
          <Grid item xs={12}>
            <EntityProvidedApisCard variant="gridItem" columns={minimizedApiEntityColumns}/>
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>

      { /* Releases section */}
      <EntitySwitch>
        <EntitySwitch.Case if={isArgocdAvailable}>
          <Grid item xs={12}>
            <EntityArgoCDOverviewCard/>
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>

      <EntitySwitch>
        <EntitySwitch.Case if={isGitlabAvailable}>
          <Grid item xs={12}>
            <EntityGitlabReleasesCard/>
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>

      <EntitySwitch>
        <EntitySwitch.Case if={isChangelogFileRefAvailable}>
          <Grid item xs={12}>
            <EntityChangelogCard/>
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>

      { /* Issue tracking section */}
      <EntitySwitch>
        <EntitySwitch.Case if={isJiraAvailable}>
          <Grid item xs={12}>
            <EntityJiraOverviewCard/>
          </Grid>
        </EntitySwitch.Case>
      </EntitySwitch>
    </Grid>
  </Grid>
);
