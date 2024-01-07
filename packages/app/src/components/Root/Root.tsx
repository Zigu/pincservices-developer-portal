import React, { PropsWithChildren } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import LayersIcon from '@mui/icons-material/Layers';
import ExtensionIcon from '@mui/icons-material/Extension';
import RadarIcon from '@mui/icons-material/Radar';
import InfoIcon from '@mui/icons-material/InfoOutlined'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import CreateComponentIcon from '@mui/icons-material/AddCircleOutline';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
  Link
} from '@backstage/core-components';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {catalogEntityCreatePermission, catalogEntityReadPermission} from "@backstage/plugin-catalog-common/alpha";
import {usePermission} from "@backstage/plugin-permission-react";
import {makeStyles} from 'tss-react/mui';
import LibraryBooks from "@mui/icons-material/LibraryBooks";

const useSidebarLogoStyles = makeStyles()(() => ({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
    marginLeft: 24
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  }
}));

const SidebarLogo = () => {
  const { classes }  = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link to="/" underline="none" className={classes.link} aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};
export const Root = ({ children }: PropsWithChildren<{}>) => {
  const { allowed: entityCreationAllowed } = usePermission({
    permission: catalogEntityCreatePermission
  });
  const { allowed: entityReadAllowed } = usePermission({
    permission: catalogEntityReadPermission,
    resourceRef: "*"
  });

  return (<SidebarPage>
        <Sidebar>
          <SidebarLogo />
          <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
            <SidebarSearchModal />
          </SidebarGroup>
          <SidebarDivider />
          <SidebarGroup label="Menu" icon={<MenuIcon />}>
            {/* Global nav, not org-specific */}
            <SidebarItem icon={HomeIcon as any} to="/" text="Home" />
            {entityReadAllowed && <SidebarItem icon={LayersIcon as any} to="catalog" text="Catalog" />}
            {entityReadAllowed && <SidebarItem icon={ExtensionIcon as any} to="api-docs" text="APIs" />}
            <SidebarItem icon={LibraryBooks as any} to="docs" text="Docs" />
            {entityCreationAllowed && <SidebarItem icon={CreateComponentIcon as any} to="create" text="Create..." />}
            {/* End global nav */}
            <SidebarDivider />
            <SidebarScrollWrapper>
              <SidebarItem icon={PlaylistPlayIcon as any} to="playlist" text="Entity Playlists" />
              <SidebarItem icon={RadarIcon as any} to="tech-radar" text="Tech Radar" />
            </SidebarScrollWrapper>
          </SidebarGroup>
          <SidebarSpace />
          <SidebarDivider />
          <SidebarGroup
            label="Settings"
            icon={<UserSettingsSignInAvatar />}
            to="/settings"
          >
            <SidebarSettings />
            <SidebarItem icon={InfoIcon as any} to="infos" text="Infos" />
          </SidebarGroup>
        </Sidebar>
        {children}
      </SidebarPage>
    )
};
