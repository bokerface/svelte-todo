import { getChats } from '$lib/server/chat.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ cookies }) => {
    const userId = cookies.get('userId') || ''; // Default to empty string if undefined
    const chats = getChats(userId);

    return json(chats);
};

