import { Grid } from '@material-ui/core';
import {
    EntityAboutCard,
    EntityLinksCard,
    EntitySwitch
} from "@backstage/plugin-catalog";
import React from "react";
import {entityWarningContent} from "../EntityWarning";
import {EntitySonarQubeCard} from "@backstage/plugin-sonarqube";
import {isSonarQubeAvailable} from "@backstage/plugin-sonarqube-react";
import {EntityGitlabLanguageCard, EntityGitlabReleasesCard, isGitlabAvailable} from "@immobiliarelabs/backstage-plugin-gitlab";
import {EntityJiraOverviewCard, isJiraAvailable} from "@roadiehq/backstage-plugin-jira";
import {EntityArgoCDStatusCard, isArgocdAvailable} from "@internal/plugin-pincservices-argocd";
import {areLinksAvailable, isChangelogFileRefAvailable} from "../../../../lib/conditions";
import {EntityChangelogCard} from "@rsc-labs/backstage-changelog-plugin";

export const componentOverviewContent = (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            {entityWarningContent}
        </Grid>

        <Grid item container spacing={3} xs={12} md={5} lg={5} >
            { /* Generic info section */ }
            <EntitySwitch>
                <EntitySwitch.Case if={areLinksAvailable}>
                    <Grid item xs={12}>
                        <EntityLinksCard />
                    </Grid>
                </EntitySwitch.Case>
            </EntitySwitch>
            <Grid item xs={12}>
                <EntityAboutCard />
            </Grid>

            <EntitySwitch>
                <EntitySwitch.Case if={isGitlabAvailable}>
                    <Grid item xs={12}>
                        <EntityGitlabLanguageCard />
                    </Grid>
                </EntitySwitch.Case>
            </EntitySwitch>

            { /* Quality section */ }
            <EntitySwitch>
                <EntitySwitch.Case if={isSonarQubeAvailable}>
                    <Grid item xs={12}>
                        <EntitySonarQubeCard variant="gridItem" />
                    </Grid>
                </EntitySwitch.Case>
            </EntitySwitch>

        </Grid>

        <Grid item container spacing={3} xs={12} md={7} lg={7}>
            { /* Releases section */ }
            <EntitySwitch>
                <EntitySwitch.Case if={isArgocdAvailable}>
                    <Grid item xs={12}>
                        <EntityArgoCDStatusCard />
                    </Grid>
                </EntitySwitch.Case>
            </EntitySwitch>

            <EntitySwitch>
                <EntitySwitch.Case if={isGitlabAvailable}>
                    <Grid item xs={12}>
                        <EntityGitlabReleasesCard />
                    </Grid>
                </EntitySwitch.Case>
            </EntitySwitch>

            <EntitySwitch>
                <EntitySwitch.Case if={isChangelogFileRefAvailable}>
                    <Grid item xs={12}>
                        <EntityChangelogCard />
                    </Grid>
                </EntitySwitch.Case>
            </EntitySwitch>

            { /* Issue tracking section */ }
            <EntitySwitch>
                <EntitySwitch.Case if={isJiraAvailable}>
                    <Grid item xs={12}>
                        <EntityJiraOverviewCard />
                    </Grid>
                </EntitySwitch.Case>
            </EntitySwitch>
        </Grid>
    </Grid>
);
