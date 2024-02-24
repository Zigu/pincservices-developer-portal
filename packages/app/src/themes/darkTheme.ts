import { createUnifiedTheme, themes } from '@backstage/theme';
import { components } from './componentOverrides';
import { pageTheme } from './pageTheme';
import { ThemeColors } from '../types/types';
import {typography} from "./typography";

export const customDarkTheme = (themeColors: ThemeColors) =>
    createUnifiedTheme({
        palette: {
            ...themes.dark.getTheme('v4')?.palette,
            ...(themeColors.primaryColor && {
                primary: {
                    ...themes.dark.getTheme('v4')?.palette.primary,
                    main: themeColors.primaryColor,
                },
            }),
            navigation: {
                background: '#0f1214',
                indicator: themeColors.navigationIndicatorColor || '#009596',
                color: '#d0d0d0',
                selectedColor: '#ffffff',
                navItem: {
                    hoverBackground: '#030303',
                },
            },
        },
        typography,
        defaultPageTheme: 'home',
        pageTheme: pageTheme(themeColors),
        components,
    });
