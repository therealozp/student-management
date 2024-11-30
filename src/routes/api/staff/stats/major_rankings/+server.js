import { initializeConnection } from '$lib/backend/initializeConnection.js';
import { json, error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	const { major } = body;
	const conn = await initializeConnection();

	try {
		const query = `
      SELECT st.major, 
       u.user_id, 
       u.name, 
       st.gpa,
       st.year,
       SUM(c.credits) AS total_credits
FROM students st
JOIN users u ON st.user_id = u.user_id
JOIN enrollments e ON st.user_id = e.user_id
JOIN courses c ON e.CRN = c.CRN
WHERE st.major = ?
GROUP BY st.major, st.user_id
ORDER BY st.major, total_credits DESC;
    `;

		const [result] = await conn.execute(query, [major]);

		return json(result);
	} catch (err) {
		console.error(err);
		return error(500, { message: 'Internal Server Error', error_code: 'SERVER_ERROR' });
	} finally {
		conn.end();
	}
};
