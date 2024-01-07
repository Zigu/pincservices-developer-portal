import {EntityLayoutWrapper} from "../contents/EntityLayoutWrapper";
import {EntityLayout} from "@backstage/plugin-catalog";
import React from "react";
import {templateOverviewContent} from "../contents/overview/TemplateOverview";
import {techdocsContent} from "../contents/TechDocs";

export const templatePage = (
    <EntityLayoutWrapper>
        <EntityLayout.Route path="/" title="Overview">
            {templateOverviewContent}
        </EntityLayout.Route>
        <EntityLayout.Route path="/docs" title="Docs">
            {techdocsContent}
        </EntityLayout.Route>
    </EntityLayoutWrapper>
);
