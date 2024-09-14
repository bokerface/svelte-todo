import { json, error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js';

export const GET = async () => {
    const { data } = await supabase.from('todos').select('*');
    return json(data);
};

export const POST = async ({ request }) => {
    const data = await request.json();

    if (!data.description) {
        throw error(400, 'Description is required');
    }

    const { error: insertError } = await supabase.from('todos').insert([{ description: data.description }]);
    if (insertError) {
        console.error(insertError);
        throw error(500, 'Failed to create todo');
    }

    return json({ message: 'Todo created successfully' }, { status: 201 });
};
