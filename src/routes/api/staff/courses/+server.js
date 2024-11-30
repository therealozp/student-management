import { initializeConnection } from '$lib/backend/initializeConnection';
import { json, error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const conn = await initializeConnection();
	const body = await request.json();
	const { user_id, searchQuery = '' } = body;

	try {
		// Retrieve the department ID for the advisor
		const [staffDepartmentRows] = await conn.execute(
			`SELECT department_id FROM users WHERE user_id = ?`,
			[user_id]
		);
		const staffDepartmentId = staffDepartmentRows[0]?.department_id;

		if (!staffDepartmentId) {
			return error(404, {
				message: 'Department not found for the user',
				error_code: 'DEPARTMENT_NOT_FOUND'
			});
		}

		// Base query for fetching courses
		const baseQuery = `
      SELECT 
        c.CRN,
        c.course_name,
        c.prefix,
        c.course_number,
        c.capacity,
        c.enrolled,
        c.section_number,
        c.credits,
        c.schedule,
        u.name AS instructor_name,
        d.department_name
      FROM 
        courses c
      JOIN 
        users u ON c.instructor_id = u.user_id
      JOIN 
        departments d ON c.department_id = d.department_id
      WHERE 
        c.department_id = ?
    `;

		// Add filtering if searchQuery is provided
		const filterClause = searchQuery
			? `AND (
            c.course_name LIKE CONCAT('%', ?, '%') OR
            c.prefix LIKE CONCAT('%', ?, '%') OR
            c.course_number LIKE CONCAT('%', ?, '%') OR
            u.name LIKE CONCAT('%', ?, '%')
          )`
			: '';

		const finalQuery = baseQuery + filterClause;

		const queryParams = searchQuery
			? [staffDepartmentId, searchQuery, searchQuery, searchQuery, searchQuery]
			: [staffDepartmentId];

		const [course_rows] = await conn.execute(finalQuery, queryParams);

		// Return results as JSON
		return json(course_rows);
	} catch (err) {
		console.error(err);
		return error(500, { message: 'Internal Server Error', error_code: 'SERVER_ERROR' });
	} finally {
		conn.end();
	}
};
