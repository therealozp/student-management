<script>
	import Layout from '../ui/Layout.svelte';
	import KeyValue from '../ui/KeyValue.svelte';
	let studentAttributes = {
		name: 'Jane Doe',
		uNumber: 712839192,
		dob: '9/11/2002',
		major: 'Computer Science',
		department: 'College of Engineering',
		attributes: ['FRSH, HON, INTL'],
		academicStanding: 4,
		class: 3, // for junior
		gpa: 4.0,
		creditsTaken: 69
	};

	let classStanding =
		studentAttributes.class >= 4
			? 'Senior'
			: studentAttributes.class == 3
				? 'Junior'
				: studentAttributes.class == 2
					? 'Sophomore'
					: 'Freshman';
</script>

<Layout>
	<div class="flex h-[300px] w-full rounded-md border-2 border-stone-200">
		<div
			class="relative flex w-[500px] items-center justify-center border-r-2 border-stone-200 p-8"
		>
			<h2
				class=" absolute left-4 top-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors"
			>
				Current GPA
			</h2>
			<div
				class="flex h-[140px] w-[140px] items-center justify-center rounded-full border-8 border-stone-200"
			>
				<h2 class="absolute scroll-m-20 text-3xl font-black tracking-tight transition-colors">
					{studentAttributes.gpa}
				</h2>
			</div>
			<a href="/what-if-gpa"
				><p class="absolute bottom-4 right-4 text-sm text-muted-foreground underline">
					what-if GPA
				</p></a
			>
		</div>
		<div class="p-8">
			<div class="grid grid-cols-3 gap-8">
				<div>
					<KeyValue key="Name" value={studentAttributes.name} />
					<KeyValue key="U-Number" value={'U' + studentAttributes.uNumber.toString()} />
					<KeyValue key="DOB" value={studentAttributes.dob} />
					<KeyValue key="Department" value={studentAttributes.department} />
					<KeyValue key="Major" value={studentAttributes.major} />
				</div>
				<div>
					<KeyValue
						key="Academic Standing"
						value={studentAttributes.academicStanding == 4 ? 'Good' : 'Bad'}
					/>
					<KeyValue key="Class" value={classStanding} />
					<KeyValue key="Credits Taken" value={studentAttributes.creditsTaken} />
				</div>
				<div>
					<KeyValue key="Attributes" value={studentAttributes.attributes.join(', ')} />
				</div>
			</div>
		</div>
	</div>
</Layout>
