import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useUser } from "./UserContext";

const WebSocketContext = createContext(null);

export default function WebSocketProvider({children}){

    const socketRef = useRef(null);
    const { userId } = useUser();
    // wsReady increments each time a new socket is successfully opened,
    // giving consumers a stable value to depend on in their own useEffects.
    const [wsReady, setWsReady] = useState(0);

    useEffect(() => {
        if (!userId) return;

        const ws = new WebSocket('ws://localhost:5001');
        socketRef.current = ws;

        ws.onopen = () => {
            console.log('Connected to WS server');
            setWsReady(n => n + 1); // signal that a fresh socket is ready
        };
        ws.onclose = () => console.log('Disconnected from WS server');
        ws.onerror = (err) => console.error("WS error", err);

        return () => ws.close();

    }, [userId]);



    return (
        <WebSocketContext.Provider value={{ socketRef, wsReady }}>
            {children}
        </WebSocketContext.Provider>
    )
}

export function useWebSocket(){
    return useContext(WebSocketContext);
}