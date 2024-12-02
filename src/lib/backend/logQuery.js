import { initializeConnection } from '$lib/backend/initializeConnection.js';

/**
 * Logs database operations to the logs table.
 *
 * @param {string} user_id - The ID of the user performing the operation.
 * @param {string} operation_type - The type of operation (ADD, MODIFY, DELETE, VIEW).
 * @param {string} entity_type - The type of entity affected (student, instructor, etc.).
 * @param {object|null} old_value - The previous value of the entity (for MODIFY/DELETE operations).
 * @param {object|null} new_value - The new value of the entity (for ADD/MODIFY operations).
 */
export async function logQuery(
	user_id,
	operation_type,
	entity_type,
	old_value = null,
	new_value = null
) {
	const conn = await initializeConnection();

	try {
		const logQuery = `
            INSERT INTO logs (user_id, operation_type, entity_type, old_value, new_value)
            VALUES (?, ?, ?, ?, ?);
        `;

		// Execute the log query
		await conn.execute(logQuery, [
			user_id,
			operation_type,
			entity_type,
			old_value ? JSON.stringify(old_value) : null,
			new_value ? JSON.stringify(new_value) : null
		]);
	} catch (err) {
		console.error('Error logging query:', err);
		throw err; // Re-throw to handle upstream
	} finally {
		conn.end();
	}
}
