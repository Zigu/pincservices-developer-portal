import React from 'react';
import { Route } from 'react-router-dom';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import { TechRadarPage } from '@backstage/plugin-tech-radar';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import {apis, keycloakAuthApiRef} from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';

import {AlertDisplay, OAuthRequestDialog, SignInPage} from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import {catalogEntityCreatePermission, catalogEntityReadPermission} from '@backstage/plugin-catalog-common/alpha';
import { CatalogUnprocessedEntitiesPage } from '@backstage/plugin-catalog-unprocessed-entities';
import { DevToolsPage } from '@backstage/plugin-devtools';
import {CustomDevToolsPage} from "./components/devtools/CustomDevToolsPage";
import {HomePage} from "./components/home/HomePage";
import {HomepageCompositionRoot} from "@backstage/plugin-home";
import {PlaylistIndexPage, PlaylistPage} from "@backstage/plugin-playlist";

// Additional system icons

import CodeIcon from '@mui/icons-material/Code'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewListIcon from '@mui/icons-material/ViewList';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RadarIcon from '@mui/icons-material/Radar';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import {GitlabIcon} from "./components/customIcons/GitlabIcon";
import {ConfluenceIcon} from "./components/customIcons/ConfluenceIcon";
import {JiraIcon} from "./components/customIcons/JiraIcon";
import {ConfluenceSmallIcon} from "./components/customIcons/ConfluenceSmallIcon";

const app = createApp({
  apis,
  components: {
    SignInPage: props => (
      <SignInPage
        {...props}
        provider={{
          id: 'keycloak-auth-provider',
          title: 'Keycloak',
          message: 'Sign in using Keycloak',
          apiRef: keycloakAuthApiRef
        }}
      />
    )
  },
  icons: {
    code: CodeIcon as any,
    addCircleOutline: AddCircleOutlineIcon as any,
    viewList: ViewListIcon as any,
    factCheck: FactCheckIcon as any,
    radar: RadarIcon as any,
    trackChanges: TrackChangesIcon as any,
    gitlab: GitlabIcon as any,
    confluence: ConfluenceIcon as any,
    confluenceSmall: ConfluenceSmallIcon as any,
    jira: JiraIcon as any
  },
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<HomepageCompositionRoot/>}>
      <HomePage/>
    </Route>
    <Route path="/catalog" element={<RequirePermission permission={catalogEntityReadPermission} resourceRef="*"><CatalogIndexPage/></RequirePermission>}/>
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/tech-radar"
      element={<TechRadarPage width={1500} height={800} />}
    />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
    <Route
      path="/catalog-unprocessed-entities"
      element={<CatalogUnprocessedEntitiesPage />}
    />;
    <Route path="/infos" element={<DevToolsPage />} > {CustomDevToolsPage}</Route>
    <Route path="/playlist" element={<PlaylistIndexPage />} />
    <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);