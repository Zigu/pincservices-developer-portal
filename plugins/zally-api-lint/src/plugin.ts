import {createApiFactory, createPlugin, createRoutableExtension, discoveryApiRef} from '@backstage/core-plugin-api';

import {rootRouteRef} from './routes';
import {ZallyApiClient, zallyApiRef} from "./api";

export const zallyApiLintPlugin = createPlugin({
    id: 'zally-api-lint',
    routes: {
        root: rootRouteRef,
    },
    apis: [
        createApiFactory({
            api: zallyApiRef,
            deps: {discoveryApi: discoveryApiRef},
            factory: ({discoveryApi}) => new ZallyApiClient({discoveryApi}),
        }),
    ],
});

export const ZallyAPILintContent = zallyApiLintPlugin.provide(
    createRoutableExtension({
        name: 'ZallyAPILintContent',
        component: () =>
            import('./components/APILinter').then(m => m.APILinter),
        mountPoint: rootRouteRef,
    }),
);
