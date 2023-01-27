import SockJS from 'sockjs-client';
import { useEffect, useRef, useState } from 'react';
import { ActivationState, Client, Message, StompSubscription } from '@stomp/stompjs';

interface IUseWebsocketProps {
    url: string;
    debug?: boolean;
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

export const useWebsocket = ({ url, debug }: IUseWebsocketProps) => {
    const [userId, setUserId] = useState<string>('');
    const [subscriptions, setSubscriptions] = useState<StompSubscription[]>([]);
    const [connectionState, setConnectionState] = useState<ActivationState>(ActivationState.INACTIVE);

    const client = useRef<Client>(
        new Client({
            reconnectDelay: 0, // no reconnect, not sure if this best just yet.

            webSocketFactory: () => new SockJS(url),
            debug: (str) => debug && console.log(str),
            onChangeState: (state) => setConnectionState(state),
            onConnect: (frame) => setUserId(frame.headers['user-name']),
            onWebSocketClose: () => setConnectionState(ActivationState.INACTIVE),

            onWebSocketError: (err) => console.error('onWebSocketError: ', err),
            onStompError: (frame) => console.error('onStompError: ', frame.headers.message)
        })
    );

    useEffect(() => client.current.activate(), []);

    const send = ({ gameId, body }: ISendMessageProps) => {
        if (client.current.connected) {
            client.current.publish({
                destination: '/game/' + gameId,
                body: typeof body === 'string' ? body : JSON.stringify(body),
                headers: { priority: '9' } // just an example
            });
        }
    };

    const sendPrivateMessage = (body: string | object) => {
        if (client.current.connected) {
            client.current.publish({
                destination: '/game/private-message',
                body: typeof body === 'string' ? body : JSON.stringify(body),
                headers: { priority: '9' } // just an example
            });
        }
    };

    const connect = () => {
        if (client.current.connected) return false;

        client.current.activate();
        return true;
    };

    const disconnect = () => {
        if (!client.current.connected) return false;

        subscriptions.forEach((subscription) => subscription.unsubscribe());
        client.current.deactivate();
        return true;
    };

    const subscribe = ({ gameId, onMessage, onPrivateMessage }: IWebsocketSubscribeProps) => {
        if (!client.current.connected) return false;

        const gameSubscription = client.current.subscribe('/game/' + gameId, onMessage);
        const privateSubscription = client.current.subscribe('/game/private-message', onPrivateMessage);

        setSubscriptions([...subscriptions, gameSubscription, privateSubscription]);
        return true;
    };

    const unsubscribe = (subscriptionId: string) => {
        const subscription = subscriptions.find((sub) => sub.id === subscriptionId);
        if (!subscription) return false;

        subscription.unsubscribe();
        setSubscriptions(subscriptions.filter((sub) => sub.id !== subscriptionId));
        return true;
    };

    return {
        userId,
        subscriptions,
        hasActiveSubscriptions: subscriptions.length > 0,
        connected: connectionState === ActivationState.ACTIVE,

        send,
        sendPrivateMessage,

        connect,
        disconnect,

        subscribe,
        unsubscribe
    };
};
