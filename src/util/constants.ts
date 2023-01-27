import { ConfigProps } from 'types/config';

export const BASE_PATH = '';
export const BORDER_RADIUS = 8;
export const WEBSOCKET_URL = 'http://localhost:8080/ws';

const config: ConfigProps = {
    fontFamily: `'Inter', sans-serif`,
    themeMode: 'dark' // light, dark
};

export default config;
