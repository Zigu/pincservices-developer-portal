import { Tool } from '@backstage/plugin-home';

export type QuickAccessLinks = {
    title: string;
    onFeatureFlag?: string;
    isExpanded?: boolean;
    links: (Tool & { iconUrl: string })[];
};
