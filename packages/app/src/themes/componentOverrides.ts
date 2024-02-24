import { UnifiedThemeOptions } from '@backstage/theme';

const robotoFont = {
  fontFamily: 'Roboto flex, sans-serif',
  fontWeight: 'light',
  letterSpacing: 0,
  paragraphSpacing: 0,
  paragraphIndent: 0,
  textCase: 'none',
  textDecoration: 'none'
};

export const components: UnifiedThemeOptions['components'] = {
    MuiTypography: {
        styleOverrides: {
            root: robotoFont
        },
    },
    MuiCssBaseline: {
        styleOverrides: {
            '@global': {
                '@font-face': robotoFont
            }
        }
    }
};
