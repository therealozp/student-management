export async function load({ cookies }) {
	const token = cookies.get('user-token');
	if (token) {
		console.log(JSON.parse(token));
	} else {
		console.log('token not loaded successfully in load()');
	}
	return { token: token ? JSON.parse(token) : null };
}
