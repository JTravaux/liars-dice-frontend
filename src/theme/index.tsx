import { useMemo, ReactNode } from 'react';

// Material UI import
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider, Theme } from '@mui/material/styles';

// project import
import Palette from './palette';
import customShadows from './shadows';
import Typography from './typography';
import useConfig from 'hooks/useConfig';
import componentStyleOverrides from './compStyleOverride';

// types
import { BORDER_RADIUS } from 'util/constants';
import { CustomShadowProps } from 'types/theme';
import { TypographyOptions } from '@mui/material/styles/createTypography';

export default function ThemeCustomization({ children }: { children: ReactNode }) {
    const { fontFamily, themeMode } = useConfig();
    const theme: Theme = useMemo<Theme>(() => Palette(themeMode), [themeMode]);

    const themeTypography: TypographyOptions = useMemo<TypographyOptions>(() => Typography(theme, fontFamily), [theme, fontFamily]);
    const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => customShadows(themeMode, theme), [themeMode, theme]);

    const themeOptions: ThemeOptions = useMemo(
        () => ({
            palette: theme.palette,
            typography: themeTypography,
            customShadows: themeCustomShadows
        }),
        [theme, themeCustomShadows, themeTypography]
    );

    const themes: Theme = createTheme(themeOptions);
    themes.components = useMemo(() => componentStyleOverrides(themes, BORDER_RADIUS), [themes]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
