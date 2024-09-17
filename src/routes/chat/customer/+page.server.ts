import type { PageServerLoad } from './$types';
import { sendChat } from '$lib/server/chat.js';

export const load = (async ({ cookies }) => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    sendChat: async ({ request, cookies }) => {
        const userId = cookies.get('userId') || ''; // Default to empty string if undefined
        const formData = await request.formData();
        const message = formData.get('message') as string || ''; // Ensure message is a string
        const receiver = 'admin'; // Replace with actual receiver ID logic
        const from = userId;

        sendChat(userId, message, receiver, from);

        return {
            success: true,
            data: {
                userId,
                message,
                receiver,
                from
            }
        };
    }
}

