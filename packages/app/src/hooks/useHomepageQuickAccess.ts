import { useState, useCallback, useEffect } from 'react';
import { QuickAccessLinks } from '../types/types';
import {useApi} from "@backstage/core-plugin-api";
import {homepageQuickAccessApiRef} from "../apis";
import {useAsync} from "react-use";

export const useHomepageQuickAccess = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<QuickAccessLinks[]>();
    const [error, setError] = useState<any>();

    const client = useApi(homepageQuickAccessApiRef);
    const { value, error: apiError, loading} = useAsync(() => client.load());

    const fetchData = useCallback(async () => {
        const res = await fetch('/homepage/data.json');
        const qsData = await res.json();
        setData(qsData);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (apiError) {
            setError(apiError);
            fetchData().catch(err => {
                setError(err);
                setIsLoading(false);
            });
        } else if (!loading && value) {
            setData(value);
            setIsLoading(false);
        }

    }, [apiError, fetchData, loading, setData, value]);

    return { data, error, isLoading };
};
