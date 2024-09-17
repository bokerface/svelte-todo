import { channel } from "$lib/server/channel";
import { json } from "@sveltejs/kit";

export const POST = async (event) => {
    const messageData = await event.request.json();
    const message = channel.send({
        type: 'broadcast',
        event: 'test',
        payload: { messageData },
    })

    // console.log(message);

    // const formData = await request.formData();

    return json(message);
};