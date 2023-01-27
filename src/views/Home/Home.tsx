import { Button, styled, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import MainCard from '../../components/MainCard';
import { useWebsocket } from '../../hooks/useWebsocket';
import { WEBSOCKET_URL } from '../../util/constants';

const ConnectionCardContent = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-end',
    gap: theme.spacing(2),
    flexDirection: 'column'
}));

const FlexRow = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2)
}));

const Home = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { send, subscribe, sendPrivateMessage, userId, hasActiveSubscriptions } = useWebsocket({ url: WEBSOCKET_URL /*, debug: true*/ });

    const [message, setMessage] = useState('');
    const [gameCode, setGameCode] = useState('');

    const connect = () => {
        const result = subscribe({
            gameId: gameCode,
            onMessage: (msg) => {
                console.log('INCOMING ALL', msg, JSON.parse(msg.body));
            },
            onPrivateMessage: (msg) => {
                console.log('INCOMING PRIVATE /game/private-message', msg);
            }
        });

        if (result) {
            enqueueSnackbar('Successfully connected to ' + gameCode, { variant: 'success' });
        } else {
            enqueueSnackbar('Failed to connect to ' + gameCode, { variant: 'error' });
        }
    };

    const sendMessage = () => {
        send({
            gameId: gameCode,
            body: JSON.stringify({
                gameId: gameCode,
                playerId: userId,
                type: 'GAME_PLAYER_JOIN',
                data: message
            })
        });
    };

    const sendPrivate = () => {
        sendPrivateMessage({
            gameId: gameCode,
            body: JSON.stringify({
                gameId: gameCode,
                playerId: userId,
                type: 'GAME_PLAYER_JOIN',
                data: message
            })
        });
    };

    return (
        <div>
            <MainCard
                sx={{
                    m: 3,
                    maxWidth: 500
                }}
                title={!hasActiveSubscriptions ? 'Connection Test' : 'Connected to ' + gameCode}
            >
                {!hasActiveSubscriptions && (
                    <ConnectionCardContent>
                        <TextField
                            label="Game Code"
                            fullWidth
                            value={gameCode}
                            onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                            inputProps={{
                                maxLength: 4
                            }}
                        />
                        <Button variant="contained" disabled={gameCode.length !== 4} onClick={connect}>
                            Connect
                        </Button>
                    </ConnectionCardContent>
                )}

                {hasActiveSubscriptions && (
                    <div>
                        <ConnectionCardContent>
                            <TextField label="Message" fullWidth value={message} onChange={(e) => setMessage(e.target.value)} />

                            <FlexRow>
                                <Button variant="contained" onClick={sendMessage}>
                                    Send All
                                </Button>
                                <Button variant="contained" onClick={sendPrivate}>
                                    Send Personal
                                </Button>
                            </FlexRow>
                        </ConnectionCardContent>
                        <Typography variant="body2" align="left" sx={{ mt: 2 }}>
                            Your user id is: {userId}
                        </Typography>
                    </div>
                )}
            </MainCard>
        </div>
    );
};

export default Home;
