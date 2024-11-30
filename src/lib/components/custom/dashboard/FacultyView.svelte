<script>
	export let user;

	const fetchInstructorData = async () => {
		const res = await fetch('/api/instructor', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: user.user_id })
		});
		const instructorData = await res.json();

		const coursesResponse = await fetch('/api/instructor/teaching_courses', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: user.user_id })
		});
		const coursesData = await coursesResponse.json();

		let dayColumns = {
			Monday: [],
			Tuesday: [],
			Wednesday: [],
			Thursday: [],
			Friday: []
		};

		// Fill dayColumns with courses
		coursesData.forEach((course) => {
			course.schedule.forEach((session) => {
				const subcourse = {
					CRN: course.CRN,
					prefix: course.prefix,
					course_number: course.course_number,
					course_name: course.course_name,
					schedule: [session]
				};
				switch (session.day) {
					case 'M':
						dayColumns['Monday'].push(subcourse);
						break;
					case 'T':
						dayColumns['Tuesday'].push(subcourse);
						break;
					case 'W':
						dayColumns['Wednesday'].push(subcourse);
						break;
					case 'R':
						dayColumns['Thursday'].push(subcourse);
						break;
					case 'F':
						dayColumns['Friday'].push(subcourse);
						break;
				}
			});
		});

		console.log(instructorData, coursesData, dayColumns);
		return { instructorData, coursesData, dayColumns };
	};
</script>

{#await fetchInstructorData()}
	<div>Fetching data...</div>
{:then { instructorData, coursesData, dayColumns }}
	<div class="grid gap-10 p-[5%] pt-[4%]" style="grid-template-columns: repeat(5, 1fr)">
		<!-- Day labels -->
		<div class="flex flex-col items-center">
			<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Monday</h4>
		</div>
		<div class="flex flex-col items-center">
			<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Tuesday</h4>
		</div>
		<div class="flex flex-col items-center">
			<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Wednesday</h4>
		</div>
		<div class="flex flex-col items-center">
			<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Thursday</h4>
		</div>
		<div class="flex flex-col items-center">
			<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Friday</h4>
		</div>

		{#each ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as day}
			<div class="flex flex-col gap-2">
				{#each dayColumns[day] as course}
					<div class="mb-2 rounded-md border border-stone-200 p-4">
						<h5>{course.prefix}{course.course_number} - {course.CRN}</h5>
						<h5>{course.course_name}</h5>
						{#each course.schedule as session}
							{#if session.day === day.charAt(0).toUpperCase()}
								<p>{session.start} - {session.end}</p>
							{:else if session.day === 'R' && day === 'Thursday'}
								<p>{session.start} - {session.end}</p>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	</div>
{/await}
