import Home from './views/Home/Home';
import ThemeCustomization from './theme';
import { useRoutes } from 'react-router-dom';

const Routes = () => {
    return useRoutes([
        {
            path: '/',
            element: <Home />
        }
    ]);
};

const App = () => {
    return (
        <ThemeCustomization>
            <Routes />
        </ThemeCustomization>
    );
};

export default App;
