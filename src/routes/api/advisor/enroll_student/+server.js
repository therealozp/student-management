import { initializeConnection } from '$lib/backend/initializeConnection';
import { json, error } from '@sveltejs/kit';
import { logQuery } from '$lib/backend/logQuery.js';

export const POST = async ({ request }) => {
	const body = await request.json();
	const { teacher_id, student_email, course_crn, enrolling_semester } = body;
	const conn = await initializeConnection();

	const [teacher_rows] = await conn.execute(`SELECT * FROM users WHERE user_id = ?`, [teacher_id]);
	await logQuery(teacher_id, 'VIEW', 'users', null, { user_id: teacher_id });

	const [student_rows] = await conn.execute(`SELECT * FROM users WHERE email = ?`, [student_email]);
	await logQuery(teacher_id, 'VIEW', 'users', null, { email: student_email });

	console.log(teacher_rows, student_rows);

	if (teacher_rows[0].department_id != student_rows[0].department_id) {
		return error(400, {
			message: 'Student and teacher are not in the same department',
			error_code: 'DEPARTMENT_MISMATCH'
		});
	}

	const [course_rows] = await conn.execute(`SELECT * FROM courses WHERE CRN = ?`, [course_crn]);
	await logQuery(teacher_id, 'VIEW', 'courses', null, { CRN: course_crn });

	console.log(course_rows);
	if (course_rows.length == 0) {
		return error(400, {
			message: 'Course not found',
			error_code: 'COURSE_NOT_FOUND'
		});
	}

	const [rows] = await conn.execute(
		`SELECT COUNT(*) AS enrollment_count FROM enrollments WHERE user_id = ? AND CRN = ?`,
		[student_rows[0].user_id, course_crn]
	);
	await logQuery(teacher_id, 'VIEW', 'enrollments', null, {
		user_id: student_rows[0].user_id,
		CRN: course_crn
	});

	if (rows[0].enrollment_count > 0) {
		return error(400, {
			message: 'Student is already enrolled in this course',
			error_code: 'ALREADY_ENROLLED'
		});
	}

	const query = `
		INSERT INTO 
			enrollments (user_id, CRN, semester, grade)
		VALUES 
			(?, ?, ?, ?)                                                            
	`;

	await conn.execute(query, [student_rows[0].user_id, course_crn, enrolling_semester, 'IP']);
	await logQuery(teacher_id, 'ADD', 'enrollments', null, {
		user_id: student_rows[0].user_id,
		CRN: course_crn,
		semester: enrolling_semester,
		grade: 'IP'
	});

	conn.end();

	return json({ message: 'Enrollment successful!' });
};
