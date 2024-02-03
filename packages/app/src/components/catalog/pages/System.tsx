import {EntityLayout} from "@backstage/plugin-catalog";

import React from "react";
import {EntityLayoutWrapper} from "../contents/EntityLayoutWrapper";
import {systemOverviewContent} from "../contents/overview/SystemOverview";
import {EntityAdrContent, isAdrAvailable} from "@backstage/plugin-adr";
import {techdocsContent} from "../contents/TechDocs";
import {cicdContent} from "../contents/CICD";
import {systemRelationsContent} from "../contents/relations/SystemRelations";
import {EntityKubernetesContent} from "@backstage/plugin-kubernetes";
import {TopologyPage} from "@janus-idp/backstage-plugin-topology";

export const systemPage = (
  <EntityLayoutWrapper>
    <EntityLayout.Route path="/" title="Overview">
      {systemOverviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/kubernetes" title="Kubernetes">
      <EntityKubernetesContent refreshIntervalMs={30000}/>
    </EntityLayout.Route>

    <EntityLayout.Route path="/topology" title="Topology">
      <TopologyPage />
    </EntityLayout.Route>

    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      {cicdContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/relations" title="Relations">
      {systemRelationsContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
      {techdocsContent}
    </EntityLayout.Route>

    <EntityLayout.Route if={isAdrAvailable} path="/adrs" title="ADRs">
      <EntityAdrContent/>
    </EntityLayout.Route>
  </EntityLayoutWrapper>
);
