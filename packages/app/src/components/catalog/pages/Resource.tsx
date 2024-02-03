import {EntityLayoutWrapper} from "../contents/EntityLayoutWrapper";
import {EntityLayout} from "@backstage/plugin-catalog";
import React from "react";
import {resourceOverviewContent} from "../contents/overview/ResourceOverview";
import {techdocsContent} from "../contents/TechDocs";
import {cicdContent} from "../contents/CICD";
import {resourceRelationsContent} from "../contents/relations/ResourceRelations";
import {EntityKubernetesContent} from "@backstage/plugin-kubernetes";
import {TopologyPage} from "@janus-idp/backstage-plugin-topology";

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

    <EntityLayout.Route path="/kubernetes" title="Kubernetes">
      <EntityKubernetesContent refreshIntervalMs={30000}/>
    </EntityLayout.Route>

    <EntityLayout.Route path="/topology" title="Topology">
      <TopologyPage />
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
      {techdocsContent}
    </EntityLayout.Route>
  </EntityLayoutWrapper>
);
