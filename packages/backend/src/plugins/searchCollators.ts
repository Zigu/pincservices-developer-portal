import {DefaultAdrCollatorFactory} from "@backstage/plugin-adr-backend";
import {coreServices, createBackendModule} from "@backstage/backend-plugin-api";
import {searchIndexRegistryExtensionPoint} from "@backstage/plugin-search-backend-node/alpha";
import {cacheToPluginCacheManager, loggerToWinstonLogger} from "@backstage/backend-common";


export const adrModuleCatalogCollator = createBackendModule({
  moduleId: 'adrCollator',
  pluginId: 'search',
  register(env) {
    env.registerInit({
      deps: {
        config: coreServices.rootConfig,
        discovery: coreServices.discovery,
        tokenManager: coreServices.tokenManager,
        scheduler: coreServices.scheduler,
        logger: coreServices.logger,
        cache: coreServices.cache,
        reader: coreServices.urlReader,
        indexRegistry: searchIndexRegistryExtensionPoint,
      },
      async init({
                   config,
                   discovery,
                   tokenManager,
                   scheduler,
                   indexRegistry,
                   logger,
                   cache,
                   reader
                 }) {


        const defaultSchedule = {
          frequency: {minutes: 10},
          timeout: {minutes: 15},
          initialDelay: {seconds: 3},
        };

        indexRegistry.addCollator({
          schedule: scheduler.createScheduledTaskRunner(
            defaultSchedule,
          ),
          factory: DefaultAdrCollatorFactory.fromConfig({
            cache: cacheToPluginCacheManager(cache),
            config: config,
            discovery: discovery,
            logger: loggerToWinstonLogger(logger),
            reader: reader,
            tokenManager: tokenManager,
          }),
        });
      } // init
    })
  }
});

