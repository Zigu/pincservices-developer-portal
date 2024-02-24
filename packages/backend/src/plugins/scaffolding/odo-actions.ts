import {
    coreServices,
    createBackendModule,
} from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import {odoAction, odoInitAction} from "@redhat-developer/plugin-scaffolder-odo-actions";

export const odoActionsModule = createBackendModule({
    pluginId: 'scaffolder',
    moduleId: 'odo',
    register({ registerInit }) {
        registerInit({
            deps: {
                scaffolder: scaffolderActionsExtensionPoint,
                config: coreServices.rootConfig,
            },
            async init({ scaffolder, config }) {

                scaffolder.addActions(
                    odoInitAction(config.getOptionalConfig("odo")),
                    odoAction(config.getOptionalConfig("odo")),
                );
            },
        });
    },
});