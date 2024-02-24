import {createBackend} from '@backstage/backend-defaults';
import {
  gitlabPlugin,
  catalogPluginGitlabFillerProcessorModule,
} from '@immobiliarelabs/backstage-plugin-gitlab-backend';
import jiraDashboardPlugin from '@axis-backstage/plugin-jira-dashboard-backend';
import {legacyPlugin} from '@backstage/backend-common';
import {policyExtensionPoint} from "@backstage/plugin-permission-node/alpha";
import {createBackendModule} from '@backstage/backend-plugin-api';
import {GlobalPermissionPolicy} from "./plugins/permissions/GlobalPermissionPolicy";
import {adrModuleCatalogCollator} from "./plugins/searchCollators";
import {odoActionsModule} from "./plugins/scaffolding/odo-actions";

const permissionModuleGlobalPolicy = createBackendModule({
  pluginId: 'permission',
  moduleId: 'global-permission-policy',
  register(reg) {
    reg.registerInit({
      deps: {policy: policyExtensionPoint},
      async init({policy}) {
        policy.setPolicy(new GlobalPermissionPolicy());
      },
    });
  },
});

const backend = createBackend();

backend.add(import('@backstage/plugin-adr-backend'));
backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-unprocessed'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);
// @ts-ignore
backend.add(import('@janus-idp/backstage-plugin-keycloak-backend/alpha'));
backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(import('@backstage/plugin-devtools-backend'));
backend.add(import('@backstage/plugin-kubernetes-backend/alpha'));
backend.add(import('@backstage/plugin-playlist-backend'));
/*
backend.add(
  import('@backstage/plugin-permission-backend-module-allow-all-policy'),
);
 */
backend.add(permissionModuleGlobalPolicy);
backend.add(import('@backstage/plugin-permission-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-gitlab'));
backend.add(odoActionsModule);
backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));
backend.add(adrModuleCatalogCollator);
/*
backend.add(
  import('@backstage/plugin-catalog-backend-module-backstage-openapi'),
);
 */
backend.add(import('@backstage/plugin-search-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));
backend.add(import('@backstage/plugin-sonarqube-backend'));

backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-oidc-provider'));

backend.add(gitlabPlugin);
backend.add(catalogPluginGitlabFillerProcessorModule);
backend.add(legacyPlugin('argocd', import('./plugins/argocd')));
backend.add(legacyPlugin('changelog', import('./plugins/changelog')));
backend.add(jiraDashboardPlugin());
backend.add(legacyPlugin("highlights", import('./plugins/highlights')));

backend.start();
