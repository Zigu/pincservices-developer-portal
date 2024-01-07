import React from 'react';

import {
  EntitySwitch,
  isKind,
} from '@backstage/plugin-catalog';

import {systemPage} from "./pages/System";
import {templatePage} from "./pages/Template";
import {domainPage} from "./pages/Domain";
import {resourcePage} from "./pages/Resource";
import {groupPage} from "./pages/Group";
import {userPage} from "./pages/User";
import {apiPage} from "./pages/API";
import {componentPage} from "./pages/Component";
import {defaultEntityPage} from "./pages/DefaultEntity";
import {locationPage} from "./pages/Location";

export const entityPage = (
  <EntitySwitch>
    <EntitySwitch.Case if={isKind('component')} children={componentPage}/>
    <EntitySwitch.Case if={isKind('resource')} children={resourcePage}/>
    <EntitySwitch.Case if={isKind('api')} children={apiPage}/>
    <EntitySwitch.Case if={isKind('group')} children={groupPage}/>
    <EntitySwitch.Case if={isKind('user')} children={userPage}/>
    <EntitySwitch.Case if={isKind('system')} children={systemPage}/>
    <EntitySwitch.Case if={isKind('domain')} children={domainPage}/>
    <EntitySwitch.Case if={isKind('template')} children={templatePage}/>
    <EntitySwitch.Case if={isKind('location')} children={locationPage}/>

    <EntitySwitch.Case>{defaultEntityPage}</EntitySwitch.Case>
  </EntitySwitch>
);
