<script>
	import { BarChart, Axis, Svg, Tooltip, Bars } from 'layerchart';
	import { page } from '$app/stores';

	import Header from '$lib/components/custom/dashboard/Header.svelte';

	let classPerformance = {
		averageScore: 85.2,
		attendanceRate: 92.5,
		totalStudents: 169,
		classHours: 'TR 9:00 AM - 11:15 AM'
	};

	let gradeDistribution = [
		{ grade: 'A', count: 15 },
		{ grade: 'B', count: 10 },
		{ grade: 'C', count: 5 },
		{ grade: 'D', count: 2 },
		{ grade: 'F', count: 1 }
	];
	const CRN = $page.params.CRN;
</script>

<Header content={'Class Performance - CRN ' + CRN}></Header>
<div class="px-[5%] py-[2%]">
	<div class="grid grid-cols-2">
		<div>
			<div class="mb-4">
				<h3 class="text-2xl font-semibold">Total Students</h3>
				<p class="text-large">{classPerformance.totalStudents}</p>
			</div>
			<div class="mb-4">
				<h3 class="text-2xl font-semibold">Class Time</h3>
				<p class="text-large">{classPerformance.classHours}</p>
			</div>
			<div class="mb-4">
				<h3 class="text-2xl font-semibold">Attendance Rate</h3>
				<p class="text-large">{classPerformance.attendanceRate}%</p>
			</div>
			<div class="mb-4">
				<h3 class="text-2xl font-semibold">Attendance Rate</h3>
				<p class="text-large">{classPerformance.attendanceRate}%</p>
			</div>
		</div>
		<div>
			<h3 class="mb-4 text-2xl font-semibold">Grade Distribution</h3>
			<div class="h-[300px] w-[500px] rounded border p-4">
				<BarChart
					data={gradeDistribution}
					x="grade"
					y="count"
					props={{ bars: { class: 'fill-primary' } }}
					labels
					let:x
					let:y
				>
					<Svg>
						<Axis
							placement="left"
							rule={{ class: 'stroke-stone-200' }}
							tickLabelProps={{
								class: 'fill-white font-semibold'
							}}
							grid={{ style: 'stroke-dasharray: 2', class: 'stroke-stone-200' }}
						/>
						<Axis
							placement="bottom"
							rule={{ class: 'stroke-stone-200' }}
							tickLabelProps={{
								class: 'fill-white font-semibold'
							}}
						/>
						<Bars radius={4} strokeWidth={1} class="fill-primary" />
					</Svg>

					<Tooltip.Root let:data class="bg-black">
						<Tooltip.Header>Grade: {x(data)}</Tooltip.Header>
						<Tooltip.List>
							<Tooltip.Item label="value" value={y(data)} />
						</Tooltip.List>
					</Tooltip.Root>
				</BarChart>
			</div>
		</div>
	</div>
</div>
