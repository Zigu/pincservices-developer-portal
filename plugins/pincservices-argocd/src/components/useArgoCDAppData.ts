
import { Entity } from '@backstage/catalog-model';

export const ARGOCD_ANNOTATION_APP_NAME = 'argocd/app-name';
export const ARGOCD_ANNOTATION_APP_SELECTOR = 'argocd/app-selector';
export const ARGOCD_ANNOTATION_APP_NAMESPACE = 'argocd/app-namespace';
export const ARGOCD_ANNOTATION_PROJECT_NAME = 'argocd/project-name';
export const ARGOCD_ANNOTATION_PROXY_URL = 'argocd/proxy-url';

export const useArgoCDAppData = ({ entity }: { entity: Entity }) => {
    const appName =
        entity?.metadata.annotations?.[ARGOCD_ANNOTATION_APP_NAME] ?? '';
    const appSelector =
        entity?.metadata.annotations?.[ARGOCD_ANNOTATION_APP_SELECTOR] ?? '';
    const appNamespace =
        entity?.metadata.annotations?.[ARGOCD_ANNOTATION_APP_NAMESPACE];
    const projectName =
        entity?.metadata.annotations?.[ARGOCD_ANNOTATION_PROJECT_NAME];
    const url =
        entity?.metadata.annotations?.[ARGOCD_ANNOTATION_PROXY_URL] ??
        '/argocd/api';
    if (!(appName || appSelector || projectName)) {
        throw new Error("'argocd' annotation is missing");
    } else if (appName && (appSelector || projectName)) {
        throw new Error(
            "Cannot provide both 'argocd/app-name' and 'argocd-app' annotations",
        );
    }
    return { url, appName, appSelector, appNamespace, projectName };
};
