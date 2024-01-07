import { useState, useEffect } from 'react';
import {useApi} from "@backstage/core-plugin-api";
import {DefaultEntityFilters, useEntityList} from "@backstage/plugin-catalog-react";
import {TechInsightsApi, techInsightsApiRef} from "@backstage/plugin-tech-insights";
import {Entity, getCompoundEntityRef} from "@backstage/catalog-model";
import { EntityFacts } from '../components/techInsights/types';

export function getRows(techInsightsApi: TechInsightsApi, entities: Entity[]) : Promise<EntityFacts[]> {
    return Promise.all(entities.map(async entity => {
        const facts= await techInsightsApi.getFacts(getCompoundEntityRef(entity),  ['entityCodeQualityFactRetriever']);
        return { id: getCompoundEntityRef(entity), entity: entity, facts: facts};
    }));
}

export const useEntityCodeQualityFacts = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<EntityFacts[]>([]);
    const [filters, setFilters] = useState<DefaultEntityFilters>();
    const [error, setError] = useState<any>();

    const techInsightsApi = useApi(techInsightsApiRef);
    const { entities, filters: entityFilters, error: entityError, loading: entityLoading} = useEntityList();

    useEffect(() => {
        if (entityError) {
            setError(entityError);
            setLoading(false);
        } else if (!entityLoading && entities) {
            setFilters(entityFilters);
            getRows(techInsightsApi, entities).then(rows => {
                setData(rows);
                setLoading(false);
            }).catch(factsError => {
                setError(factsError);
                setLoading(false);
            })
        }
    }, [entityError, techInsightsApi, entityLoading, setData, entities, entityFilters]);

    return { data, error, loading, filters };
};
