import React from "react";
import {EntityTechdocsContent, isTechDocsAvailable} from "@backstage/plugin-techdocs";
import {TechDocsAddons} from "@backstage/plugin-techdocs-react";
import {ReportIssue} from "@backstage/plugin-techdocs-module-addons-contrib";
import {EntityGitlabReadmeCard, isGitlabAvailable} from "@immobiliarelabs/backstage-plugin-gitlab";

import {EntitySwitch} from "@backstage/plugin-catalog";
import {MissingAnnotationEmptyState} from "@backstage/plugin-catalog-react";

const TECHDOCS_ANNOTATION = 'backstage.io/techdocs-ref';

export const techdocsContent = (
    <EntitySwitch>
        <EntitySwitch.Case if={isTechDocsAvailable}>
            <EntityTechdocsContent>
                <TechDocsAddons>
                    <ReportIssue />
                </TechDocsAddons>
            </EntityTechdocsContent>
        </EntitySwitch.Case>
        <EntitySwitch.Case if={isGitlabAvailable}>
            <EntityGitlabReadmeCard />
        </EntitySwitch.Case>
        <EntitySwitch.Case>
            <MissingAnnotationEmptyState annotation={TECHDOCS_ANNOTATION} />
        </EntitySwitch.Case>
    </EntitySwitch>
);
