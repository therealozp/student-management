import { initializeConnection } from '$lib/backend/initializeConnection.js';
import { json, error } from '@sveltejs/kit';

export const GET = async () => {
	const conn = await initializeConnection();

	try {
		const query = `
      SELECT u.department_id, 
             d.department_name, 
             AVG(s.gpa) AS average_gpa
      FROM users u
      JOIN students s ON u.user_id = s.user_id
      JOIN departments d ON u.department_id = d.department_id
      WHERE u.role = 'student'
      GROUP BY u.department_id
      ORDER BY average_gpa DESC;
    `;

		const [result] = await conn.execute(query);

		return json(result);
	} catch (err) {
		console.error(err);
		return error(500, { message: 'Internal Server Error', error_code: 'SERVER_ERROR' });
	} finally {
		conn.end();
	}
};
