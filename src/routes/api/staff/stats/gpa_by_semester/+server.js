import { initializeConnection } from '$lib/backend/initializeConnection.js';
import { json, error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	const { semester } = body;
	const conn = await initializeConnection();

	try {
		const query = `
      SELECT 
    c.crn,
    c.prefix,
    c.course_number,
    c.course_name, 
    e.semester, 
    COUNT(e.user_id) AS total_enrollments,
    AVG(
        CASE 
            WHEN e.grade IN ('A', 'S') THEN 4
            WHEN e.grade = 'B' THEN 3
            WHEN e.grade = 'C' THEN 2
            WHEN e.grade = 'D' THEN 1
            ELSE 0
        END
    ) AS average_grade
FROM enrollments e
JOIN courses c ON e.CRN = c.CRN
WHERE e.semester = ?  -- Filter for specific semester
GROUP BY c.course_name, e.semester, c.crn, c.prefix, c.course_number;
    `;

		const [result] = await conn.execute(query, [semester]);

		return json(result);
	} catch (err) {
		console.error(err);
		return error(500, { message: 'Internal Server Error', error_code: 'SERVER_ERROR' });
	} finally {
		conn.end();
	}
};
