import { PaletteMode } from '@mui/material';

export type ConfigProps = {
    fontFamily: string;
    themeMode: PaletteMode;
};

export type CustomizationProps = {
    fontFamily: string;
    themeMode: PaletteMode;
    onChangeTheme: (themeMode: PaletteMode) => void;
    onChangeFontFamily: (fontFamily: string) => void;
};
