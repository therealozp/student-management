import { redirect } from '@sveltejs/kit';
import { handle as authenticationHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';

async function authorizationHandle({ event, resolve }) {
	// Protect any routes under /authenticated
	if (event.url.pathname.startsWith('/dashboard')) {
		const session = await event.locals.auth();
		if (!session) {
			// Redirect to the signin page
			throw redirect(303, '/login');
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
}

export const handle = sequence(authenticationHandle, authorizationHandle);
