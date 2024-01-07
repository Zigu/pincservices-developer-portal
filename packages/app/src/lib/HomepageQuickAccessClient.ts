import {QuickAccessLinks} from "../types/types";
import {DiscoveryApi, FetchApi} from "@backstage/core-plugin-api";

export interface HomepageQuickAccessApi {
    load(): Promise<QuickAccessLinks[]>;
}

export class HomepageQuickAccessClient implements HomepageQuickAccessApi {

    private readonly discoveryApi: DiscoveryApi;
    private readonly fetchApi: FetchApi;

    constructor(options: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) {
        this.discoveryApi = options.discoveryApi;
        this.fetchApi = options.fetchApi;
    }

    async load(): Promise<QuickAccessLinks[]> {

        const proxyUrl = `${await this.discoveryApi.getBaseUrl('proxy',)}/homepage-quickaccess`
        const apiResponse = await this.fetchApi.fetch(`${proxyUrl}/data.json`);
        if (!apiResponse.ok) {
            throw new Error('Failed fetching homepage quickaccess data');
        }

        return await apiResponse.json();
    }
}
