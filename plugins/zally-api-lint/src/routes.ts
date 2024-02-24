import { createRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'zally-api-lint',
});

export const schemaIDRouteRef = createRouteRef({
  id: 'zally-api-lint',
  params: ['*/:id'],
});
