// lib/callState.js
import WebSocket from 'ws';

const activeCalls = new Map();

export const startCall = (chatId, callId, initiatorId) => {
    if (activeCalls.has(chatId)) {
        return { error: "A call is already active in this chat" };
    }
    activeCalls.set(chatId, {
        callId,
        initiatorId,
        participants: new Set([initiatorId]),
        startedAt: new Date(),
    });
    return activeCalls.get(chatId);
};

export const joinCall = (chatId, userId) => {
    const call = activeCalls.get(chatId);
    if (!call) return { error: "No active call in this chat" };
    call.participants.add(userId);
    return call;
};

export const leaveCall = (chatId, userId) => {
    const call = activeCalls.get(chatId);
    if (!call) return null;

    call.participants.delete(userId);

    if (call.participants.size === 0) {
        activeCalls.delete(chatId);
        return null;
    }
    return call;
};

export const getCall = (chatId) => {
    return activeCalls.get(chatId) || null;
};

export const endCall = (chatId) => {
    activeCalls.delete(chatId);
};

export const sendCallSignal = (type, { id, content, sender_id, chat_id, target_user_id }, clientsMap) => {
    const targetWs = clientsMap.get(target_user_id);
    if (targetWs?.readyState === WebSocket.OPEN) {
        targetWs.send(JSON.stringify({ type, id, content, sender_id, chat_id }));
    }
};