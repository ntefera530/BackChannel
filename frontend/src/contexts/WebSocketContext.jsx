import { createContext, useContext, useEffect, useRef } from "react";

const WebSocketContext = createContext(null);

export default function WebSocketProvider({children}){

    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection

        const ws = new WebSocket('ws://localhost:8080');
        socketRef.current = ws;

        ws.onopen = () => console.log('Connected to WS server');
        ws.onclose = () => console.log('Disconnected from WS server');
        ws.onerror = (err) => console.error("WS error", err);

        return () => ws.close();

    }, []);



    return (
        <WebSocketContext.Provider value={socketRef}>
            {children}
        </WebSocketContext.Provider>
    )
}

export function useWebSocket(){
    return useContext(WebSocketContext);
}