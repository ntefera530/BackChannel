import { useEffect, useRef, useState } from 'react';

export default function useWebSocket(url) {
  const wsRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    wsRef.current.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    wsRef.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      wsRef.current.close();
    };
  }, [url]);

  const sendMessage = (msg) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    }
  };

  return { messages, sendMessage };
}
