import { initializeConnection } from '$lib/backend/initializeConnection';
import { json, error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const conn = await initializeConnection();
	const body = await request.json();
	const { staff_id } = body;

	try {
		// Retrieve the department ID for the advisor
		const [staffDepartmentRows] = await conn.execute(
			`SELECT department_id FROM users WHERE user_id = ?`,
			[staff_id]
		);
		const staffDepartmentId = staffDepartmentRows[0]?.department_id;

		if (!staffDepartmentId) {
			return error(404, {
				message: 'Department not found for the user',
				error_code: 'DEPARTMENT_NOT_FOUND'
			});
		}

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
				AND u.department_id = ?;
		`;

		// Execute query with department_id parameter
		const [instructorRows] = await conn.execute(query, [staffDepartmentId]);

		// Return the results as JSON
		return json(instructorRows);
	} catch (err) {
		console.error(err);
		return error(500, { message: 'Internal Server Error', error_code: 'SERVER_ERROR' });
	} finally {
		conn.end();
	}
};
