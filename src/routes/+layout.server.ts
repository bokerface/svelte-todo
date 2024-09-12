export const load = async (event) => {
	if (event.locals.user) {
		const session = event.locals.user;
		return { session };
	}
};
