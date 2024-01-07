import { createRouter } from '../../../../plugins/pincservices-argocd-backend';
import { PluginEnvironment } from '../types';

export default async function createPlugin({logger, config}: PluginEnvironment) {
    return await createRouter({ logger, config });
}
