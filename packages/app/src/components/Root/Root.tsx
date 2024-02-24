import React, { PropsWithChildren } from 'react';

import HomeIcon from '@material-ui/icons/Home';
import LayersIcon from '@material-ui/icons/Layers';
import ExtensionIcon from '@material-ui/icons/Extension';
import MapIcon from '@material-ui/icons/Map';
import InfoIcon from '@material-ui/icons/InfoOutlined'
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutlined';
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import GroupIcon from '@material-ui/icons/People';
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
import {catalogEntityCreatePermission, catalogEntityReadPermission} from "@backstage/plugin-catalog-common/alpha";
import {usePermission} from "@backstage/plugin-permission-react";
import makeStyles from '@material-ui/core/styles/makeStyles';
import {MyGroupsSidebarItem} from "@backstage/plugin-org";

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const SidebarLogo = () => {
  const classes  = useSidebarLogoStyles();
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
            <MyGroupsSidebarItem
                     singularTitle="My Squad"
                     pluralTitle="My Squads"
                     icon={GroupIcon}
                   />
            {entityReadAllowed && <SidebarItem icon={LayersIcon as any} to="catalog" text="Catalog" />}
            {entityReadAllowed && <SidebarItem icon={ExtensionIcon as any} to="api-docs" text="APIs" />}
            <SidebarItem icon={LibraryBooks as any} to="docs" text="Docs" />
            {entityCreationAllowed && <SidebarItem icon={CreateComponentIcon as any} to="create" text="Create..." />}
            {/* End global nav */}
            <SidebarDivider />
            <SidebarScrollWrapper>
              <SidebarItem icon={PlaylistPlayIcon as any} to="playlist" text="Entity Playlists" />
              <SidebarItem icon={MapIcon as any} to="tech-radar" text="Tech Radar" />
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
