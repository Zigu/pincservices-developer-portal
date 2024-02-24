import {EntitySwitch} from "@backstage/plugin-catalog";
import {
    EntityGitlabCoverageCard,
    EntityGitlabMergeRequestsTable,
    EntityGitlabMergeRequestStatsCard,
    EntityGitlabPeopleCard,
    EntityGitlabPipelinesTable,
    isGitlabAvailable
} from "@immobiliarelabs/backstage-plugin-gitlab";
import {EntityGithubActionsContent, isGithubActionsAvailable} from "@backstage/plugin-github-actions";
import {EntityGithubInsightsContributorsCard} from "@roadiehq/backstage-plugin-github-insights";
import {EntityGithubDeploymentsCard, isGithubDeploymentsAvailable} from "@backstage/plugin-github-deployments";
import {EntityGithubPullRequestsOverviewCard, EntityGithubPullRequestsTable} from "@roadiehq/backstage-plugin-github-pull-requests";

import {EmptyState} from "@backstage/core-components";
import Button from "@material-ui/core/Button";
import React from "react";
import {EntityArgoCDOverviewCard, isArgocdAvailable} from "@roadiehq/backstage-plugin-argo-cd";
import Grid from '@material-ui/core/Grid';


export const cicdContent = (
    <Grid container spacing={3}>
        <EntitySwitch>
            <EntitySwitch.Case if={isArgocdAvailable}>
                <Grid item xs={12}>
                    <EntityArgoCDOverviewCard />
                </Grid>
            </EntitySwitch.Case>
        </EntitySwitch>

        <EntitySwitch>
            <EntitySwitch.Case if={isGithubDeploymentsAvailable}>
                <Grid item xs={12}>
                    <EntityGithubDeploymentsCard/>
                </Grid>
            </EntitySwitch.Case>
        </EntitySwitch>


        <EntitySwitch>
            <EntitySwitch.Case if={isGithubActionsAvailable}>
                <Grid item xs={12}>
                    <EntityGithubActionsContent/>
                </Grid>
                <Grid item xs={12}>
                    <EntityGithubPullRequestsTable />
                </Grid>
                <Grid item xs={6}>
                    <EntityGithubPullRequestsOverviewCard />
                </Grid>
                <Grid item xs={6}>
                    <EntityGithubInsightsContributorsCard/>
                </Grid>
            </EntitySwitch.Case>
            <EntitySwitch.Case if={isGitlabAvailable}>
                <Grid item md={12}>
                    <EntityGitlabPipelinesTable />
                </Grid>
                <Grid item md={12}>
                    <EntityGitlabMergeRequestsTable />
                </Grid>
                <Grid item md={6}>
                    <EntityGitlabMergeRequestStatsCard />
                </Grid>
                <Grid item md={6}>
                    <EntityGitlabPeopleCard />
                </Grid>
                <Grid item md={6}>
                    <EntityGitlabCoverageCard />
                </Grid>
            </EntitySwitch.Case>

            <EntitySwitch.Case>
                <Grid item xs={12}>
                <EmptyState
                    title="No CI/CD available for this entity"
                    missing="info"
                    description="You need to add an annotation to your component if you want to enable CI/CD for it. You can read more about annotations in Backstage by clicking the button below."
                    action={
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://backstage.io/docs/features/software-catalog/well-known-annotations"
                        >
                            Read more
                        </Button>
                    }
                />
                </Grid>
            </EntitySwitch.Case>
        </EntitySwitch>
    </Grid>
);
