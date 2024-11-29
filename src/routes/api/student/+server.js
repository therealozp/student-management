import { initializeConnection } from '$lib/backend/initializeConnection';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	const { user_id } = body;
	const conn = await initializeConnection();

	const [rows] = await conn.execute(
		`
  SELECT 
      s.*, 
      u.user_id, u.email, u.name, u.role, u.department_id, u.u_number, u.dob, 
      d.department_name
  FROM 
      students s
  JOIN 
      users u ON s.user_id = u.user_id
  JOIN 
      departments d ON u.department_id = d.department_id
  WHERE 
      s.user_id = ?
`,
		[user_id]
	);

	conn.end();

	return json(rows[0], { status: 200 });
};
