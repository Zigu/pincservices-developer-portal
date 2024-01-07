import {
    TechRadarApi,
    TechRadarLoaderResponse,
} from '@backstage/plugin-tech-radar';
import {DiscoveryApi, FetchApi} from "@backstage/core-plugin-api";

export class TechRadarClient implements TechRadarApi {

    private readonly discoveryApi: DiscoveryApi;
    private readonly fetchApi: FetchApi;

    constructor(options: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) {
        this.discoveryApi = options.discoveryApi;
        this.fetchApi = options.fetchApi;
    }
    async load(): Promise<TechRadarLoaderResponse> {
        // if needed id prop can be used to fetch the correct data

        const proxyUrl = `${await this.discoveryApi.getBaseUrl('proxy',)}/techradar`
        const apiResponse = await this.fetchApi.fetch(`${proxyUrl}/data.json`);
        if (!apiResponse.ok) {
            throw new Error('Failed fetching techradar data');
        }

        const data = await apiResponse.json();

        // For example, this converts the timeline dates into date objects
        return {
            ...data,
            entries: data.entries.map((entry: { timeline: any[]; }) => {
                return ({
                    ...entry,
                    timeline: entry.timeline.map(timeline => ({
                        ...timeline,
                        date: new Date(timeline.date),
                    })),
                });
            }),
        };
    }
}
