import {EntityLayoutWrapper} from "../contents/EntityLayoutWrapper";
import {EntityLayout} from "@backstage/plugin-catalog";
import React from "react";
import {resourceOverviewContent} from "../contents/overview/ResourceOverview";
import {techdocsContent} from "../contents/TechDocs";
import {cicdContent} from "../contents/CICD";
import {resourceRelationsContent} from "../contents/relations/ResourceRelations";

export const resourcePage = (
    <EntityLayoutWrapper>
        <EntityLayout.Route path="/" title="Overview">
            {resourceOverviewContent}
        </EntityLayout.Route>

        <EntityLayout.Route path="/ci-cd" title="CI/CD">
            {cicdContent}
        </EntityLayout.Route>

        <EntityLayout.Route path="/relations" title="Relations">
            {resourceRelationsContent}
        </EntityLayout.Route>

        <EntityLayout.Route path="/docs" title="Docs">
            {techdocsContent}
        </EntityLayout.Route>
    </EntityLayoutWrapper>
);
