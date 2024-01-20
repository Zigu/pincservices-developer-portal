import React from 'react';
import {
    ComponentAccordion, HomePageRecentlyVisited,
    HomePageStarredEntities,
    HomePageToolkit, HomePageTopVisited,
    WelcomeTitle
} from '@backstage/plugin-home';
import {Content, Header, InfoCard, Page, Progress} from '@backstage/core-components';
import {featureFlagsApiRef, IconComponent, identityApiRef, useApi, useApp} from '@backstage/core-plugin-api';
import {CatalogApi, catalogApiRef, EntityProvider} from '@backstage/plugin-catalog-react';
import {useAsync} from 'react-use';
import {EntityOwnershipCard} from '@backstage/plugin-org';

import {ErrorReport} from '../../common';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import {useHomepageQuickAccess} from '../../hooks/useHomepageQuickAccess';
import {SearchContextProvider} from '@backstage/plugin-search-react';

const useStyles = makeStyles({
    img: {
        height: '30px',
        width: 'auto',
    }
});

const QuickAccess = () => {

    const classes = useStyles();
    const { data, error, isLoading } = useHomepageQuickAccess();
    const featureFlagsApi = useApi(featureFlagsApiRef);
    const app = useApp();


    if (isLoading) {
        return (
            <InfoCard title="Quick Access" noPadding>
                <Progress />
            </InfoCard>
        );
    }

    if (!data) {
        return (
            <ErrorReport title="Could not fetch data." errorText="Unknown error" />
        );
    }

    if (!isLoading && !data && error) {
        return (
            <ErrorReport title="Could not fetch data." errorText={error.toString()} />
        );
    }

    return (
        <InfoCard title="Quick Access" noPadding>
            {data.filter(item => !item.onFeatureFlag || featureFlagsApi.isActive(item.onFeatureFlag)).map(item => (
                <HomePageToolkit
                    key={item.title}
                    title={item.title}
                    tools={item.links.map(link => {
                        if (link.iconUrl) {
                            if (link.iconUrl.startsWith("widget:")) {
                                const iconWidgetKey: string = link.iconUrl.substring(7);
                                const IconWidget: IconComponent | undefined = app.getSystemIcon(iconWidgetKey);
                                return ({
                                    ...link,
                                    // @ts-ignore
                                    icon: <IconWidget />
                                })
                            }
                            return ({
                                ...link,
                                icon: (
                                    <img
                                        className={classes.img}
                                        src={link.iconUrl}
                                        alt={link.label}
                                    />
                                ),
                            })

                        }
                        return ({ ...link })
                    }
                    )}
                    Renderer={
                        item.isExpanded
                            ? props => <ComponentAccordion expanded {...props} />
                            : props => <ComponentAccordion {...props} />
                    }
                />
            ))}
        </InfoCard>
    );
};

export const HomePage = () => {

    const identityApi = useApi(identityApiRef);
    const catalogApi: CatalogApi = useApi(catalogApiRef);

    const response = useAsync(async () => {
        const profile = await identityApi.getBackstageIdentity();
        return await catalogApi.getEntityByRef(profile.userEntityRef);
    }, [identityApi, catalogApi]);

    if (response.loading) {
        return <Progress/>;
    } else if (response.error) {
        return <ErrorReport title="Could not load user" errorText={response.error.message} />;
    }

    const user = response.value;

    if (!user) {
        return <ErrorReport title="Could find user" errorText="No user found. Please log in." />;
    }

    const welcomeLanguages = ["English", "German", "Arabic", "French", "Spanish", "Italian", "Irish", "Australian", "Japanese", "Polish", "Hindi", "Dutch", "Chinese"];

    return (
        <SearchContextProvider>
            <Page themeId="home">
                <Header title={<WelcomeTitle language={welcomeLanguages} />} pageTitleOverride="Home" />
                <Content>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <EntityProvider entity={user}>
                                <EntityOwnershipCard hideRelationsToggle />
                            </EntityProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <QuickAccess />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid item container spacing={3}>
                                <Grid item xs={12}>
                                    <HomePageStarredEntities title='Favourite Entities'/>
                                </Grid>
                                <Grid item xs={12}>
                                    <HomePageRecentlyVisited />
                                </Grid>
                                <Grid item xs={12}>
                                    <HomePageTopVisited />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    </Box>
                </Content>
            </Page>
        </SearchContextProvider>
    );
};
