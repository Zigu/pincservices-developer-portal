import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ARGOCD_ANNOTATION_APP_NAME } from './components/useArgoCDAppData';
import { MissingAnnotationEmptyState } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';
import { ArgoCDHistoryCard } from './components/ArgoCDHistoryCard';
import { isArgocdAvailable } from './conditions';

export const Router = () => {
    const { entity } = useEntity();
    return !isArgocdAvailable(entity) ? (
        <MissingAnnotationEmptyState annotation={ARGOCD_ANNOTATION_APP_NAME} />
) : (
        <Routes>
            <Route path="/" element={<ArgoCDHistoryCard />} />
    </Routes>
);
};
