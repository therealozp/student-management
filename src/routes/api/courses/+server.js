import { initializeConnection } from '$lib/backend/initializeConnection';
import { json, error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	const { crn, name, prefix, courseNumber } = body;

	const conn = await initializeConnection();

	// Build the LIKE pattern for course_name to handle partial matches
	const courseNamePattern = name ? `%${name}%` : null;

	const query = `
        SELECT 
        c.*,
        u.name AS instructor_name,
        d.department_name
      FROM 
        courses c
      JOIN 
        users u ON c.instructor_id = u.user_id
      JOIN 
        departments d ON c.department_id = d.department_id
		WHERE
			(c.CRN = ? OR ? IS NULL) AND
			(c.course_name LIKE ? OR ? IS NULL) AND
			(c.prefix = ? OR ? IS NULL) AND
			(c.course_number = ? OR ? IS NULL)
    `;

	// Execute the query, passing parameters as needed
	const [rows] = await conn.execute(query, [
		crn || null, // CRN (optional)
		crn ? crn : null, // CRN parameter (for comparison)
		courseNamePattern, // Course name (with LIKE, optional)
		name ? name : null, // Course name (for comparison)
		prefix || null, // Course prefix (optional)
		prefix ? prefix : null, // Prefix parameter (for comparison)
		courseNumber || null, // Course number (optional)
		courseNumber ? courseNumber : null // Course number parameter (for comparison)
	]);

	conn.end();

	// If no courses were found
	if (rows.length === 0) {
		return error(404, {
			message: 'No courses found',
			error_code: 'COURSE_NOT_FOUND'
		});
	}

	return json(rows, { status: 200 });
};
