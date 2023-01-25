import { useMemo, ReactNode } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider, Theme } from '@mui/material/styles';

// project import
import Palette from './palette';
import Typography from './typography';
import useConfig from '../hooks/useConfig';

import componentStyleOverrides from './compStyleOverride';
import customShadows from './shadows';

// types
import { borderRadius } from '../util/constants';
import { CustomShadowProps } from '../types/theme';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export default function ThemeCustomization({ children }: { children: ReactNode }) {
    const { fontFamily, themeMode } = useConfig();
    const theme: Theme = useMemo<Theme>(() => Palette(themeMode), [themeMode]);

    const themeTypography: TypographyOptions = useMemo<TypographyOptions>(() => Typography(theme, borderRadius, fontFamily), [theme, fontFamily]);
    const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => customShadows(themeMode, theme), [themeMode, theme]);

    const themeOptions: ThemeOptions = useMemo(
        () => ({
            direction: 'ltr',
            palette: theme.palette,
            mixins: {
                toolbar: {
                    minHeight: '48px',
                    padding: '16px',
                    '@media (min-width: 600px)': {
                        minHeight: '48px'
                    }
                }
            },
            typography: themeTypography,
            customShadows: themeCustomShadows
        }),
        [theme, themeCustomShadows, themeTypography]
    );

    const themes: Theme = createTheme(themeOptions);
    themes.components = useMemo(() => componentStyleOverrides(themes, borderRadius), [themes]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
