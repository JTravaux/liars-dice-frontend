import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BASE_PATH } from 'util/constants';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'context/ConfigContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <SnackbarProvider maxSnack={3} preventDuplicate={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <ConfigProvider>
                <BrowserRouter basename={BASE_PATH}>
                    <App />
                </BrowserRouter>
            </ConfigProvider>
        </SnackbarProvider>
    </React.StrictMode>
);
