import { initializeConnection } from '$lib/backend/initializeConnection';
import { json, error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const conn = await initializeConnection();
	const body = await request.json();
	const { crn, course_name, prefix, course_number, capacity, instructor_id } = body;

	try {
		// Check for existing course with same name but different CRN
		const [sameNameRows] = await conn.execute(
			`
      SELECT CRN 
      FROM courses 
      WHERE course_name = ? AND CRN != ?;
      `,
			[course_name, crn]
		);

		if (sameNameRows.length > 0) {
			return error(409, {
				message: 'A course with the same name already exists under a different CRN.',
				error_code: 'DUPLICATE_COURSE_NAME'
			});
		}

		// Check for existing course with same prefix and course number combo
		const [samePrefixNumberRows] = await conn.execute(
			`
      SELECT CRN 
      FROM courses 
      WHERE prefix = ? AND course_number = ? AND CRN != ?;
      `,
			[prefix, course_number, crn]
		);

		if (samePrefixNumberRows.length > 0) {
			return error(409, {
				message: 'A course with the same prefix and course number already exists.',
				error_code: 'DUPLICATE_COURSE_NUMBER'
			});
		}

		// Update course data
		const [result] = await conn.execute(
			`
      UPDATE courses 
      SET 
        course_name = ?, 
        prefix = ?, 
        course_number = ?, 
        capacity = ?, 
        instructor_id = ?
      WHERE CRN = ?;
      `,
			[course_name, prefix, course_number, capacity, instructor_id, crn]
		);

		if (result.affectedRows === 0) {
			return error(404, { message: 'Course not found', error_code: 'COURSE_NOT_FOUND' });
		}

		// Placeholder for interval check algorithm
		// Future: Add instructor availability validation here

		return json({ message: 'Course updated successfully.' });
	} catch (err) {
		console.error(err);
		return error(500, { message: 'Internal Server Error', error_code: 'SERVER_ERROR' });
	} finally {
		conn.end();
	}
};
