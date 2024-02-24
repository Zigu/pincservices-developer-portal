import React from 'react';
import { AppTheme } from '@backstage/core-plugin-api';
import { UnifiedThemeProvider } from '@backstage/theme';
import LightIcon from '@material-ui/icons/WbSunny';
import DarkIcon from '@material-ui/icons/Brightness2';
import { customLightTheme } from './lightTheme';
import { useUpdateTheme } from '../hooks/useUpdateTheme';
import { customDarkTheme } from './darkTheme';

const developerPortalThemes: (Partial<AppTheme> & Omit<AppTheme, 'theme'>)[] = [
    {
        id: 'light',
        title: 'Light Theme',
        variant: 'light',
        icon: <LightIcon />,
        Provider: ({ children }) => {
            const themeColors = useUpdateTheme('light');
            return (
                <UnifiedThemeProvider
                    theme={customLightTheme(themeColors)}
                    children={children}
                />
            );
        },
    },
    {
        id: 'dark',
        title: 'Dark Theme',
        variant: 'dark',
        icon: <DarkIcon />,
        Provider: ({ children }) => {
            const themeColors = useUpdateTheme('dark');
            return (
                <UnifiedThemeProvider
                    theme={customDarkTheme(themeColors)}
                    children={children}
                />
            );
        },
    },
];

export default developerPortalThemes;
