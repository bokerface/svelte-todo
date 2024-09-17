const chat = new Map();

export function getChats(userId: string) {
    if (!chat.has(userId)) {
        chat.set(userId, []);
    }

    return chat.get(userId);
}

export function sendChat(userId: string, message: string, receiver: string, from: string) {
    const chats = chat.get(userId);

    const chatEntry = {
        id: crypto.randomUUID(),
        message,
        timestamp: new Date().toISOString(),
        receiver,
        from
    };

    chats.push(chatEntry);
}
