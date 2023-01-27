import Home from 'views/Home/Home';
import ThemeCustomization from 'theme';
import { useRoutes } from 'react-router-dom';

const App = () => {
    const Routes = () =>
        useRoutes([
            {
                path: '/',
                element: <Home />
            },
            {
                path: '*',
                element: (
                    <div>
                        <h1>Not Found</h1>
                    </div>
                )
            }
        ]);

    return (
        <ThemeCustomization>
            <Routes />
        </ThemeCustomization>
    );
};

export default App;
