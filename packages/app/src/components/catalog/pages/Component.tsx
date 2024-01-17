import {
  EntityLayout,
  EntitySwitch,
  isComponentType
} from "@backstage/plugin-catalog";
import React from "react";
import {EntityLayoutWrapper} from "../contents/EntityLayoutWrapper";
import {cicdContent} from "../contents/CICD";
import {defaultEntityPage} from "./DefaultEntity";
import {techdocsContent} from "../contents/TechDocs";
import {componentOverviewContent} from "../contents/overview/ComponentOverview";
import {componentRelationsContent} from "../contents/relations/ComponentRelations";
import {EntityAdrContent, isAdrAvailable} from "@backstage/plugin-adr";
import {EntityKubernetesContent} from "@backstage/plugin-kubernetes";
import {TopologyPage} from "@janus-idp/backstage-plugin-topology";
import {EntityJiraDashboardContent, isJiraDashboardAvailable} from "@axis-backstage/plugin-jira-dashboard";

const serviceEntityPage = (
  <EntityLayoutWrapper>
    <EntityLayout.Route path="/" title="Overview">
      {componentOverviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      {cicdContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/relations" title="Relations">
      {componentRelationsContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/kubernetes" title="Kubernetes">
      <EntityKubernetesContent refreshIntervalMs={30000}/>
    </EntityLayout.Route>

    <EntityLayout.Route path="/topology" title="Topology">
      <TopologyPage/>
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
      {techdocsContent}
    </EntityLayout.Route>

    <EntityLayout.Route if={isAdrAvailable} path="/adrs" title="ADRs">
      <EntityAdrContent/>
    </EntityLayout.Route>

    <EntityLayout.Route
      if={isJiraDashboardAvailable}
      path="/jira-dashboard"
      title="Jira Dashboard"
    >
      <EntityJiraDashboardContent />
    </EntityLayout.Route>
  </EntityLayoutWrapper>
);


const websiteEntityPage = (
  <EntityLayoutWrapper>
    <EntityLayout.Route path="/" title="Overview">
      {componentOverviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      {cicdContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/relations" title="Relations">
      {componentRelationsContent}
    </EntityLayout.Route>


    <EntityLayout.Route path="/kubernetes" title="Kubernetes">
      <EntityKubernetesContent refreshIntervalMs={30000}/>
    </EntityLayout.Route>

    <EntityLayout.Route path="/topology" title="Topology">
      <TopologyPage/>
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
      {techdocsContent}
    </EntityLayout.Route>

    <EntityLayout.Route if={isAdrAvailable} path="/adrs" title="ADRs">
      <EntityAdrContent/>
    </EntityLayout.Route>

    <EntityLayout.Route
      if={isJiraDashboardAvailable}
      path="/jira-dashboard"
      title="Jira Dashboard"
    >
      <EntityJiraDashboardContent />
    </EntityLayout.Route>
  </EntityLayoutWrapper>
);


const libraryEntityPage = (
  <EntityLayoutWrapper>
    <EntityLayout.Route path="/" title="Overview">
      {componentOverviewContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/ci-cd" title="CI/CD">
      {cicdContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/relations" title="Relations">
      {componentRelationsContent}
    </EntityLayout.Route>

    <EntityLayout.Route path="/docs" title="Docs">
      {techdocsContent}
    </EntityLayout.Route>

    <EntityLayout.Route if={isAdrAvailable} path="/adrs" title="ADRs">
      <EntityAdrContent/>
    </EntityLayout.Route>
  </EntityLayoutWrapper>
);

export const componentPage = (
  <EntitySwitch>
    <EntitySwitch.Case if={isComponentType('service')}>
      {serviceEntityPage}
    </EntitySwitch.Case>

    <EntitySwitch.Case if={isComponentType('website')}>
      {websiteEntityPage}
    </EntitySwitch.Case>

    <EntitySwitch.Case if={isComponentType('library')}>
      {libraryEntityPage}
    </EntitySwitch.Case>

    <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
  </EntitySwitch>
);
