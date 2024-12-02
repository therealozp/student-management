import { initializeConnection } from '$lib/backend/initializeConnection';
import { json } from '@sveltejs/kit';
import { logQuery } from '$lib/backend/logQuery.js';

export const POST = async ({ request }) => {
	const { user_id } = await request.json();
	const conn = await initializeConnection();

	const [rows] = await conn.execute(
		`
        SELECT 
    eh.user_id,
    eh.CRN,
    eh.semester,
    eh.grade,
    c.course_name,
    c.prefix,
    c.course_number,
    c.section_number,
    c.credits
FROM 
    enrollments eh
JOIN 
    courses c ON eh.CRN = c.CRN
WHERE 
    eh.user_id = ?;
`,
		[user_id]
	);

	// Log the query
	await logQuery(user_id, 'VIEW', 'enrollments', null, { user_id });

	conn.end();
	return json(rows);
};
