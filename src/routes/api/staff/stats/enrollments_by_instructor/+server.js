import { initializeConnection } from '$lib/backend/initializeConnection.js';
import { json, error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const conn = await initializeConnection();
	const body = await request.json();
	const { instructor_id } = body;

	try {
		const query = `
      SELECT c.course_name, 
             c.instructor_id, 
             s.major as student_major, 
             COUNT(e.user_id) AS total_students
      FROM enrollments e
      JOIN courses c ON e.CRN = c.CRN
      JOIN students s ON e.user_id = s.user_id
      WHERE c.instructor_id = ?
      GROUP BY c.course_name, c.instructor_id, s.major;
    `;

		const [result] = await conn.execute(query, [instructor_id]);

		return json(result);
	} catch (err) {
		console.error(err);
		return error(500, { message: 'Internal Server Error', error_code: 'SERVER_ERROR' });
	} finally {
		conn.end();
	}
};
