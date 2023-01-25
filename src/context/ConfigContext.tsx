import { createContext, ReactNode } from 'react';

// project import
import defaultConfig from '../util/constants';

// types
import { PaletteMode } from '@mui/material';
import { CustomizationProps } from '../types/config';
import useLocalStorage from '../hooks/useLocalStorage';

// initial state
const initialState: CustomizationProps = {
    ...defaultConfig,
    onChangeTheme: () => {},
    onChangeFontFamily: () => {}
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
    children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
    const [config, setConfig] = useLocalStorage('config-ts', {
        fontFamily: initialState.fontFamily,
        themeMode: initialState.themeMode
    });

    const onChangeTheme = (themeMode: PaletteMode) => {
        setConfig({
            ...config,
            themeMode
        });
    };

    const onChangeFontFamily = (fontFamily: string) => {
        setConfig({
            ...config,
            fontFamily
        });
    };

    return (
        <ConfigContext.Provider
            value={{
                ...config,
                onChangeTheme,
                onChangeFontFamily
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
}

export { ConfigProvider, ConfigContext };
