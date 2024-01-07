import {
  ScmIntegrationsApi,
  scmIntegrationsApiRef,
  ScmAuth,
} from '@backstage/integration-react';
import {
  AnyApiFactory,
  ApiRef, BackstageIdentityApi,
  configApiRef,
  createApiFactory,
  createApiRef,
  discoveryApiRef,
  fetchApiRef,
  identityApiRef,
  OAuthApi, oauthRequestApiRef,
  OpenIdConnectApi, ProfileInfoApi, SessionApi,
  storageApiRef,
} from '@backstage/core-plugin-api';
import {TechRadarClient} from "./lib/TechRadarClient";
import {techRadarApiRef} from "@backstage/plugin-tech-radar";
import {HomepageQuickAccessApi, HomepageQuickAccessClient} from "./lib/HomepageQuickAccessClient";
import {visitsApiRef, VisitsStorageApi} from "@backstage/plugin-home";
import {systemModelTips, extraTips, tipsConfigRef} from "@dweber019/backstage-plugin-tips";
import {OAuth2} from "@backstage/core-app-api";

export const keycloakAuthApiRef: ApiRef<OAuthApi & OpenIdConnectApi & ProfileInfoApi & BackstageIdentityApi & SessionApi> = createApiRef({id: 'auth.keycloak'})

export const homepageQuickAccessApiRef: ApiRef<HomepageQuickAccessApi> = createApiRef({id: 'app.homepage.quickaccess'});


export const apis: AnyApiFactory[] = [
  createApiFactory({
    api: scmIntegrationsApiRef,
    deps: { configApi: configApiRef },
    factory: ({ configApi }) => ScmIntegrationsApi.fromConfig(configApi),
  }),
  createApiFactory({
    api: keycloakAuthApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      oauthRequestApi: oauthRequestApiRef,
      configApi: configApiRef
    },
    factory: ({discoveryApi, oauthRequestApi, configApi}) =>
      OAuth2.create({
        configApi,
        discoveryApi,
        oauthRequestApi,
        provider: {
          id: 'keycloak-provider',
          title: 'Keycloak auth provider',
          icon: () => null
        },
        environment: configApi.getOptionalString('auth.environment')
      })
  }),
  createApiFactory({
    api: techRadarApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      fetchApi: fetchApiRef
    }, factory: ({discoveryApi, fetchApi}) => {
      return new TechRadarClient({discoveryApi, fetchApi})
    }
  }),
  createApiFactory({
    api: homepageQuickAccessApiRef,
    deps: {
      discoveryApi: discoveryApiRef,
      fetchApi: fetchApiRef
    }, factory: ({discoveryApi, fetchApi}) => {
      return new HomepageQuickAccessClient({discoveryApi, fetchApi})
    }
  }),
  // Implementation that relies on a provided storageApi
  createApiFactory({
    api: visitsApiRef,
    deps: {
      storageApi: storageApiRef,
      identityApi: identityApiRef,
    },
    factory: ({storageApi, identityApi}) =>
      VisitsStorageApi.create({storageApi, identityApi}),
  }),
  createApiFactory({
    api: tipsConfigRef,
    deps: {},
    factory: () => {
      return {
        tips: [...systemModelTips, ...extraTips],
      };
    },
  }),
  ScmAuth.createDefaultApiFactory(),
];
