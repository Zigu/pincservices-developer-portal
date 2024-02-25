import Grid from '@material-ui/core/Grid';
import {EntityAboutCard, EntityLinksCard, EntitySwitch,} from "@backstage/plugin-catalog";
import React from "react";
import {entityWarningContent} from "../EntityWarning";
import {EntitySonarQubeCard} from "@backstage/plugin-sonarqube";
import {isSonarQubeAvailable} from "@backstage/plugin-sonarqube-react";
import {EntityJiraOverviewCard, isJiraAvailable} from "@roadiehq/backstage-plugin-jira";
import {EntityArgoCDOverviewCard, isArgocdAvailable} from "@roadiehq/backstage-plugin-argo-cd";
import {EntityGitlabReleasesCard, isGitlabAvailable} from "@immobiliarelabs/backstage-plugin-gitlab";
import {areLinksAvailable} from "../../../../lib/conditions";


export const systemOverviewContent = (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            {entityWarningContent}
        </Grid>
        {/*
        <Grid item md={12} xs={12}>
            <EntityHighlightsCard/>
        </Grid>
        */}

        <Grid item container spacing={3} xs={12} md={5} lg={5} alignContent="flex-start">
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

            { /* Quality section */ }
            <EntitySwitch>
                <EntitySwitch.Case if={isSonarQubeAvailable}>
                    <Grid item xs={12}>
                        <EntitySonarQubeCard variant="gridItem" />
                    </Grid>
                </EntitySwitch.Case>
            </EntitySwitch>
        </Grid>

        <Grid item container spacing={3} xs={12} md={7} lg={7} alignContent="flex-start">
            { /* Releases section */ }
            <EntitySwitch>
                <EntitySwitch.Case if={isArgocdAvailable}>
                    <Grid item xs={12}>
                        <EntityArgoCDOverviewCard />
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
)
