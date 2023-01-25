import './home.css';
import useConfig from '../../hooks/useConfig';
import { Button, Card, Typography } from '@mui/material';

const Home = () => {
    const { onChangeTheme, themeMode } = useConfig();

    const handleThemeChange = () => {
        onChangeTheme(themeMode === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="App">
            <header className="App-header">
                <Card sx={{ p: 2 }}>
                    <Typography>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </Typography>
                </Card>
                <br />
                <Button variant="contained" onClick={handleThemeChange}>
                    Change to {themeMode === 'light' ? 'dark' : 'light'} Theme
                </Button>
            </header>
        </div>
    );
};

export default Home;
