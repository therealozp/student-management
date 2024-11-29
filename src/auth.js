import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/sveltekit/providers/credentials';
import { initializeConnection } from '$lib/backend/initializeConnection';

export const { signIn, signOut, handle } = SvelteKitAuth({
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {
				const { email, password } = credentials;
				// console.log(email, password);

				try {
					const conn = await initializeConnection();
					const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);

					if (!rows.length) {
						return null;
					}

					const user = rows[0];

					if (password !== user.password) {
						return null;
					}

					// Return user object for session
					// console.log('login successful.');
					return {
						user_id: user.user_id,
						email: user.email,
						name: user.name,
						role: user.role
					};
				} catch (error) {
					console.error('Authorization error:', error);
					return null;
				}
			}
		})
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			// When logging in, user will be defined in the JWT callback.
			if (user) {
				token.user = user; // Attach user info to the token
			}
			return token;
		},
		session: async ({ session, token }) => {
			// Populate session.user from token.user
			if (token.user) {
				session.user = token.user; // Pass the user object to the session
			} else {
				session.user = null; // Ensure session.user is null if no token.user
			}
			return session;
		}
	},
	pages: {
		signIn: '/login'
	}
});
