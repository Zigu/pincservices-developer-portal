import Router from 'express-promise-router';
import {
  createServiceBuilder,
  loadBackendConfig,
  getRootLogger,
  useHotMemoize,
  notFoundHandler,
  CacheManager,
  DatabaseManager,
  HostDiscovery,
  UrlReaders,
  ServerTokenManager,
} from '@backstage/backend-common';
import { TaskScheduler } from '@backstage/backend-tasks';
import { Config } from '@backstage/config';
import app from './plugins/app';
import auth from './plugins/auth';
import catalog from './plugins/catalog';
import scaffolder from './plugins/scaffolder';
import proxy from './plugins/proxy';
import techdocs from './plugins/techdocs';
import search from './plugins/search';
import kubernetes from './plugins/kubernetes';
import argocd from './plugins/argocd';
import devTools from './plugins/devtools';
import gitlab from './plugins/gitlab';
import adr from './plugins/adr';
import sonarqube from './plugins/sonarqube';
import changelog from './plugins/changelog';
import playlist from './plugins/playlist';
import permission from './plugins/permission';
import { PluginEnvironment } from './types';
import { ServerPermissionClient } from '@backstage/plugin-permission-node';
import { DefaultIdentityClient } from '@backstage/plugin-auth-node';


function makeCreateEnv(config: Config) {
  const root = getRootLogger();
  const reader = UrlReaders.default({ logger: root, config });
  const discovery = HostDiscovery.fromConfig(config);
  const cacheManager = CacheManager.fromConfig(config);
  const databaseManager = DatabaseManager.fromConfig(config, { logger: root });
  const tokenManager = ServerTokenManager.fromConfig(config, { logger: root });
  const taskScheduler = TaskScheduler.fromConfig(config, { databaseManager });

  const identity = DefaultIdentityClient.create({
    discovery,
  });
  const permissions = ServerPermissionClient.fromConfig(config, {
    discovery,
    tokenManager,
  });

  root.info(`Created UrlReader ${JSON.stringify(reader)}`);

  return (plugin: string): PluginEnvironment => {
    const logger = root.child({ type: 'plugin', plugin });
    const database = databaseManager.forPlugin(plugin);
    const cache = cacheManager.forPlugin(plugin);
    const scheduler = taskScheduler.forPlugin(plugin);
    return {
      logger,
      database,
      cache,
      config,
      reader,
      discovery,
      tokenManager,
      scheduler,
      permissions,
      identity,
    };
  };
}

async function main() {
  const config = await loadBackendConfig({
    argv: process.argv,
    logger: getRootLogger(),
  });
  const createEnv = makeCreateEnv(config);

  const catalogEnv = useHotMemoize(module, () => createEnv('catalog'));
  const scaffolderEnv = useHotMemoize(module, () => createEnv('scaffolder'));
  const authEnv = useHotMemoize(module, () => createEnv('auth'));
  const proxyEnv = useHotMemoize(module, () => createEnv('proxy'));
  const techdocsEnv = useHotMemoize(module, () => createEnv('techdocs'));
  const searchEnv = useHotMemoize(module, () => createEnv('search'));
  const kubernetesEnv = useHotMemoize(module, () => createEnv('kubernetes'));
  const argocdEnv = useHotMemoize(module, () => createEnv('argocd'));
  const devToolsEnv = useHotMemoize(module, () => createEnv('devtools'));
  const gitlabEnv = useHotMemoize(module, () => createEnv('gitlab'));
  const adrEnv = useHotMemoize(module, () => createEnv('adr'));
  const sonarqubeEnv = useHotMemoize(module, () => createEnv('sonarqube'));
  const changelogEnv = useHotMemoize(module, () => createEnv('changelog'));
  const playlistEnv = useHotMemoize(module, () => createEnv('playlist'));
  const permissionEnv = useHotMemoize(module, () => createEnv('permission'));

  const appEnv = useHotMemoize(module, () => createEnv('app'));

  const apiRouter = Router();
  apiRouter.use('/catalog', await catalog(catalogEnv));
  apiRouter.use('/scaffolder', await scaffolder(scaffolderEnv));
  apiRouter.use('/auth', await auth(authEnv));
  apiRouter.use('/techdocs', await techdocs(techdocsEnv));
  apiRouter.use('/proxy', await proxy(proxyEnv));
  apiRouter.use('/search', await search(searchEnv));
  apiRouter.use('/kubernetes', await kubernetes(kubernetesEnv));
  apiRouter.use('/argocd', await argocd(argocdEnv));
  apiRouter.use('/devtools', await devTools(devToolsEnv));
  apiRouter.use('/gitlab', await gitlab(gitlabEnv));
  apiRouter.use('/adr', await adr(adrEnv));
  apiRouter.use('/sonarqube', await sonarqube(sonarqubeEnv));
  apiRouter.use('/changelog', await changelog(changelogEnv));
  apiRouter.use('/playlist', await playlist(playlistEnv));
  apiRouter.use('/permission', await permission(permissionEnv));

  // Add backends ABOVE this line; this 404 handler is the catch-all fallback
  apiRouter.use(notFoundHandler());

  const service = createServiceBuilder(module)
    .loadConfig(config)
    .addRouter('/api', apiRouter)
    .addRouter('', await app(appEnv));

  await service.start().catch(err => {
    console.log(err);
    process.exit(1);
  });
}

module.hot?.accept();
main().catch(error => {
  console.error('Backend failed to start up', error);
  process.exit(1);
});
