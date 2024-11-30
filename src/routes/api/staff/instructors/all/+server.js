import { initializeConnection } from '$lib/backend/initializeConnection';
import { json, error } from '@sveltejs/kit';

export const GET = async () => {
	const conn = await initializeConnection();

	try {
		const query = `
			SELECT 
				u.user_id,
				u.name,
				u.email,
				d.department_name AS department_name
			FROM 
				users u
			JOIN 
				departments d ON u.department_id = d.department_id
			WHERE 
				u.role = 'instructor'
		`;

		// Execute query with department_id parameter
		const [instructorRows] = await conn.execute(query);

		// Return the results as JSON
		return json(instructorRows);
	} catch (err) {
		console.error(err);
		return error(500, { message: 'Internal Server Error', error_code: 'SERVER_ERROR' });
	} finally {
		conn.end();
	}
};
