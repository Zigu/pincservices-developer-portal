import {EntityLayoutWrapper} from "../contents/EntityLayoutWrapper";
import {EntityLayout} from "@backstage/plugin-catalog";

import React from "react";
import {domainOverviewContent} from "../contents/overview/DomainOverview";
import {techdocsContent} from "../contents/TechDocs";

export const domainPage = (
    <EntityLayoutWrapper>
        <EntityLayout.Route path="/" title="Overview">
            {domainOverviewContent}
        </EntityLayout.Route>

        <EntityLayout.Route path="/docs" title="Docs">
            {techdocsContent}
        </EntityLayout.Route>
    </EntityLayoutWrapper>
);
