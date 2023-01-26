import SockJS from 'sockjs-client';
import { useEffect, useState } from 'react';
import { ActivationState, Client, IFrame, Message, StompSubscription } from '@stomp/stompjs';

interface IUseWebsocketProps {
    /** The URL of the websocket endpoint. */
    url: string;

    /** If true, debug logs will be printed to the console. */
    debug?: boolean;

    /** All subscribes must be done is this callback. This is needed because this will be executed after a (re)connect. */
    onConnect?: (frame: IFrame) => void;

    /**
     * Will be invoked in case of error encountered at Broker.
     * Bad login/passcode typically will cause an error.
     * Complaint brokers will set `message` header with a brief message. Body may contain details.
     * Compliant brokers will terminate the connection after any error
     */
    onStompError?: (frame: IFrame) => void;
}

interface IWebsocketSubscribeProps {
    gameId: string;
    onMessage: (message: Message) => void;
    onPrivateMessage: (message: Message) => void;
}

interface ISendMessageProps {
    gameId: string;
    body: string | object;
}

export const useWebsocket = ({ url, debug, onConnect, onStompError }: IUseWebsocketProps) => {
    const [client, setClient] = useState<Client>();
    const [userId, setUserId] = useState<string>('');
    const [subscriptions, setSubscriptions] = useState<StompSubscription[]>([]);
    const [connectionState, setConnectionState] = useState<ActivationState>(ActivationState.INACTIVE);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(url),
            debug: debug
                ? (str) => {
                      console.log('debug: ', str);
                  }
                : () => {},
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });

        client.onConnect = (frame) => {
            setUserId(frame.headers['user-name']);
            onConnect?.(frame);
        };

        if (onStompError) client.onStompError = onStompError;
        client.onChangeState = (state) => setConnectionState(state);

        client.activate();
        setClient(client);
    }, [url, onConnect, onStompError]);

    const send = ({ gameId, body }: ISendMessageProps) => {
        if (!client || !client.connected) return false;

        client.publish({
            destination: '/game/' + gameId,
            body: typeof body === 'string' ? body : JSON.stringify(body),
            headers: { priority: '9' }, // just an example
            skipContentLengthHeader: true // unsure if needed yet
        });
    };

    const sendPrivateMessage = (body: string | object) => {
        if (!client || !client.connected) return false;

        client.publish({
            destination: '/game/private-message',
            body: typeof body === 'string' ? body : JSON.stringify(body),
            headers: { priority: '9' }, // just an example
            skipContentLengthHeader: true // unsure if needed yet
        });
    };

    const subscribe = ({ gameId, onMessage, onPrivateMessage }: IWebsocketSubscribeProps): boolean => {
        if (!client || !client.connected) return false;

        const gameSubscription = client.subscribe('/game/' + gameId, onMessage);
        const privateSubscription = client.subscribe('/game/private-message', onPrivateMessage);

        setSubscriptions([...subscriptions, gameSubscription, privateSubscription]);
        return true;
    };

    const disconnect = () => {
        subscriptions.forEach((subscription) => subscription.unsubscribe());
        client?.deactivate();
    };

    const unsubscribe = (subscriptionId: string) => {
        const subscription = subscriptions.find((sub) => sub.id === subscriptionId);
        if (subscription) subscription.unsubscribe();
    };

    return {
        userId,
        subscriptions,
        hasActiveSubscriptions: subscriptions.length > 0,
        connected: connectionState === ActivationState.ACTIVE,

        send,
        sendPrivateMessage,

        subscribe,
        disconnect,
        unsubscribe
    };
};
