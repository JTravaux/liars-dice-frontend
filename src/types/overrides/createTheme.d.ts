// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as createTheme from '@mui/material/styles';
import { customShadows } from '../../theme/shadows';

declare module '@mui/material/styles' {
    export interface ThemeOptions {
        customShadows?: customShadows;
        customization?: TypographyOptions | ((palette: Palette) => TypographyOptions);
        darkTextSecondary?: string;
        textDark?: string;
        darkTextPrimary?: string;
        grey500?: string;
    }
    interface Theme {
        customShadows: customShadows;
        customization: Typography;
        darkTextSecondary: string;
        textDark: string;
        grey500: string;
        darkTextPrimary: string;
    }
}
