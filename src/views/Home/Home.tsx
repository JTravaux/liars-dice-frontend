import { Box, Button, styled, Typography } from '@mui/material';
import DiceLoader from 'components/DiceLoader/DiceLoader';

const PageCentered = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw'
}));

const ActionsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2)
}));

const Home = () => {
    return (
        <PageCentered>
            <Typography variant="subtitle1">Welcome to...</Typography>
            <Typography variant="h1">Liar's Dice</Typography>

            <Box sx={{ my: 5 }}>
                <DiceLoader />
            </Box>

            <ActionsContainer>
                <Typography variant="subtitle1">Ready to Lie?</Typography>
                <Button variant="outlined" fullWidth color="secondary" sx={{ mx: 1 }}>
                    Create Game
                </Button>
                <Button variant="outlined" fullWidth color="secondary" sx={{ mx: 1 }}>
                    Join Game
                </Button>
            </ActionsContainer>
        </PageCentered>
    );
};

export default Home;
