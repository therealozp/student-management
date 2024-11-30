import { initializeConnection } from '$lib/backend/initializeConnection';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	const { user_id } = body;
	const conn = await initializeConnection();

	const query = `
        SELECT 
            CRN, course_name, prefix, course_number, capacity, 
            enrolled, instructor_id, department_id, section_number, credits, schedule
        FROM 
            courses
        WHERE 
            instructor_id = ?
    `;
	const [rows] = await conn.execute(query, [user_id]);

	conn.end();

	return json(rows, { status: 200 });
};
