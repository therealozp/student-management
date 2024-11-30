import { initializeConnection } from '$lib/backend/initializeConnection';
import { json, error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	const { searchQuery, user_id } = body; // Assuming the search query is passed in the body
	const conn = await initializeConnection();

	try {
		const [advisor_dept] = await conn.execute(
			`
            SELECT 
                department_id
            FROM 
                users
            WHERE 
                user_id = ?
            `,
			[user_id]
		);
		const advisor_dept_id = advisor_dept[0].department_id;

		// Query to search for students based on the search query
		const query = `
      SELECT 
        u.user_id,
        u.name,
        u.email,
        u.u_number,
        u.dob,
        s.major,
        s.year,
        s.gpa
      FROM 
        users u
      JOIN 
        students s ON u.user_id = s.user_id
      WHERE 
        u.role = 'student' 
        AND u.department_id = ?
        AND (
          u.email LIKE CONCAT('%', ?, '%') OR
          u.name LIKE CONCAT('%', ?, '%') OR
          u.u_number LIKE CONCAT('%', ?, '%')
        );
    `;

		// Execute the query with searchQuery as the parameter
		const [student_rows] = await conn.execute(query, [
			advisor_dept_id,
			searchQuery,
			searchQuery,
			searchQuery
		]);

		// // Check if any students are found
		// if (student_rows.length === 0) {
		// 	return error(404, {
		// 		message: 'No students found matching the search criteria',
		// 		error_code: 'STUDENTS_NOT_FOUND'
		// 	});
		// }

		// Return the results as JSON
		return json(student_rows);
	} catch (err) {
		console.error(err);
		return error(500, { message: 'Internal Server Error', error_code: 'SERVER_ERROR' });
	} finally {
		conn.end();
	}
};
