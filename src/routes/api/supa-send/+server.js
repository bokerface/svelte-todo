import { channel } from "$lib/server/channel";
import { json } from "@sveltejs/kit";

export const GET = async () => {
    const message = channel.send({
        type: 'broadcast',
        event: 'test',
        payload: { message: 'hello, world' },
    })

    return json({ message: "message sent" });
};