import { initializeConnection } from '$lib/backend/initializeConnection';
import { json, error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const conn = await initializeConnection();
	const body = await request.json();
	const { searchQuery, staff_id } = body; // Search query and user_id (to identify the department)

	try {
		// Retrieve the department ID for the staff
		const [staffDeptRows] = await conn.execute(
			`SELECT department_id FROM users WHERE user_id = ?`,
			[staff_id]
		);
		const advisorDeptId = staffDeptRows[0]?.department_id;

		if (!advisorDeptId) {
			return error(404, {
				message: 'Department not found for the user',
				error_code: 'DEPARTMENT_NOT_FOUND'
			});
		}

		// Query to search for instructors based on the search query
		const query = `
			SELECT 
				u.user_id,
				u.name,
				u.email,
				u.u_number,
				d.department_name AS department_name
			FROM 
				users u
			JOIN 
				departments d ON u.department_id = d.department_id
			WHERE 
				u.role = 'instructor'
				AND u.department_id = ?
				AND (
					u.email LIKE CONCAT('%', ?, '%') OR
					u.name LIKE CONCAT('%', ?, '%') OR
					u.u_number LIKE CONCAT('%', ?, '%')
				);
		`;

		// Execute the query with searchQuery and department_id
		const [instructorRows] = await conn.execute(query, [
			advisorDeptId,
			searchQuery,
			searchQuery,
			searchQuery
		]);

		// Check if any instructors are found
		if (instructorRows.length === 0) {
			return error(404, {
				message: 'No instructors found matching the search criteria',
				error_code: 'INSTRUCTORS_NOT_FOUND'
			});
		}

		// Return the results as JSON
		return json(instructorRows);
	} catch (err) {
		console.error(err);
		return error(500, { message: 'Internal Server Error', error_code: 'SERVER_ERROR' });
	} finally {
		conn.end();
	}
};
