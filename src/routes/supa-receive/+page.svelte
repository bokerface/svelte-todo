<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	supabase
		.channel('room-one')
		.on('broadcast', { event: '*' }, (payload) => {
			console.log('Received broadcast:', payload);
		})
		.subscribe();
</script>
