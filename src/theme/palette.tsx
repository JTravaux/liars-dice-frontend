import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import theme from '../assets/scss/_theme.module.scss';

const Palette = (mode: PaletteMode) => {
    return createTheme({
        palette: {
            mode,
            common: {
                black: theme.darkPaper
            },
            primary: {
                light: mode === 'dark' ? theme.darkPrimaryLight : theme.primaryLight,
                main: mode === 'dark' ? theme.darkPrimaryMain : theme.primaryMain,
                dark: mode === 'dark' ? theme.darkPrimaryDark : theme.primaryDark,
                200: mode === 'dark' ? theme.darkPrimary200 : theme.primary200,
                800: mode === 'dark' ? theme.darkPrimary800 : theme.primary800
            },
            secondary: {
                light: mode === 'dark' ? theme.darkSecondaryLight : theme.secondaryLight,
                main: mode === 'dark' ? theme.darkSecondaryMain : theme.secondaryMain,
                dark: mode === 'dark' ? theme.darkSecondaryDark : theme.secondaryDark,
                200: mode === 'dark' ? theme.darkSecondary200 : theme.secondary200,
                800: mode === 'dark' ? theme.darkSecondary800 : theme.secondary800
            },
            error: {
                light: theme.errorLight,
                main: theme.errorMain,
                dark: theme.errorDark
            },
            orange: {
                light: theme.orangeLight,
                main: theme.orangeMain,
                dark: theme.orangeDark
            },
            warning: {
                light: theme.warningLight,
                main: theme.warningMain,
                dark: theme.warningDark
            },
            success: {
                light: theme.successLight,
                200: theme.success200,
                main: theme.successMain,
                dark: theme.successDark
            },
            grey: {
                50: theme.grey50,
                100: theme.grey100,
                500: mode === 'dark' ? theme.darkTextSecondary : theme.grey500,
                600: mode === 'dark' ? theme.darkTextTitle : theme.grey900,
                700: mode === 'dark' ? theme.darkTextPrimary : theme.grey700,
                900: mode === 'dark' ? theme.darkTextPrimary : theme.grey900
            },
            dark: {
                light: theme.darkTextPrimary,
                main: theme.darkLevel1,
                dark: theme.darkLevel2,
                800: theme.darkBackground,
                900: theme.darkPaper
            },
            info: {
                light: '#03a9f4',
                main: '#086496',
                dark: '#01579b'
            },
            text: {
                primary: mode === 'dark' ? theme.darkTextPrimary : theme.grey700,
                secondary: mode === 'dark' ? theme.darkTextSecondary : theme.grey500,
                dark: mode === 'dark' ? theme.darkTextPrimary : theme.grey900,
                hint: theme.grey100
            },
            divider: mode === 'dark' ? theme.darkTextPrimary : theme.grey200,
            background: {
                paper: mode === 'dark' ? theme.darkLevel2 : theme.paper,
                default: mode === 'dark' ? theme.darkPaper : theme.paper
            }
        }
    });
};

export default Palette;
