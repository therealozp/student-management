import { initializeConnection } from '$lib/backend/initializeConnection';
import { json, error } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const body = await request.json();
	const { teacher_id, student_email, course_crn } = body;
	const conn = await initializeConnection();

	try {
		// Verify teacher's and student's existence and department match
		const [teacher_rows] = await conn.execute(`SELECT * FROM users WHERE user_id = ?`, [
			teacher_id
		]);
		const [student_rows] = await conn.execute(`SELECT * FROM users WHERE email = ?`, [
			student_email
		]);

		if (teacher_rows[0].department_id != student_rows[0].department_id) {
			return error(400, {
				message: 'Student and teacher are not in the same department',
				error_code: 'DEPARTMENT_MISMATCH'
			});
		}

		// Check if the course exists
		const [course_rows] = await conn.execute(`SELECT * FROM courses WHERE CRN = ?`, [course_crn]);

		if (course_rows.length == 0) {
			return error(400, {
				message: 'Course not found',
				error_code: 'COURSE_NOT_FOUND'
			});
		}

		// Check if the student is enrolled in the course
		const [enrollment_rows] = await conn.execute(
			`SELECT * FROM enrollments WHERE user_id = ? AND CRN = ?`,
			[student_rows[0].user_id, course_crn]
		);

		if (enrollment_rows.length === 0) {
			return error(400, {
				message: 'Student is not enrolled in this course',
				error_code: 'NOT_ENROLLED'
			});
		}

		// Drop the student from the course
		await conn.execute(`DELETE FROM enrollments WHERE user_id = ? AND CRN = ?`, [
			student_rows[0].user_id,
			course_crn
		]);
		conn.end();

		return json({ message: 'Student successfully dropped from the course' });
	} catch (err) {
		console.error(err);
		return error(500, { message: 'Internal Server Error', error_code: 'SERVER_ERROR' });
	} finally {
		conn.end();
	}
};
