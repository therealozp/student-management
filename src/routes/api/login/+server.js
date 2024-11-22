import { initializeConnection } from '$lib/backend/initializeConnection';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request, cookies }) => {
	const body = await request.json();
	const { email, password } = body;

	try {
		const conn = await initializeConnection();
		const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);

		if (password == rows[0].password) {
			console.log('password correct');
			const userObject = {
				user_id: rows[0].user_id,
				email: rows[0].email,
				name: rows[0].name,
				role: rows[0].role
			};
			cookies.set('user-token', JSON.stringify(userObject), {
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7,
				path: '/'
			});
			conn.end();
			return json({ token: userObject }, { status: 200 });
		} else {
			return error(401, { message: 'Password incorrect, user not authorized.' });
		}
	} catch (e) {
		return error(500, { message: e.message });
	}
};
