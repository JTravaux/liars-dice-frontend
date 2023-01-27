import { ConfigProps } from '../types/config';

export const borderRadius = 8;
export const BASE_PATH = '';
export const DASHBOARD_PATH = '/';
export const WEBSOCKET_URL = 'http://localhost:8080/ws';

const config: ConfigProps = {
    fontFamily: `'Inter', sans-serif`,
    themeMode: 'dark' // light, dark
};

export default config;
