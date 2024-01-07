import {EntityLayoutWrapper} from "../contents/EntityLayoutWrapper";
import {EntityLayout} from "@backstage/plugin-catalog";
import React from "react";
import {locationOverviewContent} from "../contents/overview/LocationOverview";

export const locationPage = (
    <EntityLayoutWrapper>
        <EntityLayout.Route path="/" title="Overview">
            {locationOverviewContent}
        </EntityLayout.Route>
    </EntityLayoutWrapper>
);
