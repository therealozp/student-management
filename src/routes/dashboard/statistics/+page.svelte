<script>
	import { Chart, Svg, Axis, Tooltip, Spline, Highlight } from 'layerchart';
	import stats from '$lib/dummy_data/engineering_departments_data.json';
	import Header from '$lib/components/custom/dashboard/Header.svelte';
	import * as Select from '$lib/components/ui/select/index';

	import { scaleTime, scaleLinear } from 'd3-scale';

	// Group the data by major
	const groupData = (rawData) => {
		const groupedData = {};
		rawData.forEach((entry) => {
			const { year, major, avg_gpa, graduates, dropouts } = entry;
			if (!groupedData[major]) groupedData[major] = [];
			groupedData[major].push({ year, avg_gpa, graduates, dropouts });
		});
		return groupedData;
	};

	const groupedStats = groupData(stats);
	const majors = Object.keys(groupedStats);
	const metricSelections = ['avg_gpa', 'graduates', 'dropouts'];

	let currentActiveMajor = majors[0];
	let currentActiveMetric = metricSelections[0];

	// Dynamically adjust yDomain based on the current metric
	$: yDomain =
		currentActiveMetric === 'avg_gpa'
			? [0, 4]
			: [0, Math.max(...groupedStats[currentActiveMajor].map((d) => d[currentActiveMetric])) * 1.1];

	$: graphData = groupedStats[currentActiveMajor];

	$: console.log(currentActiveMajor);
</script>

<Header content="Department Statistics" />

<div class="px-[5%] py-[2%]">
	<div class="mb-8 flex items-center">
		<div>
			<Select.Root bind:selected={currentActiveMajor}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Select a major" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Majors</Select.Label>
						{#each majors as major}
							<Select.Item value={major} label={major}>{major}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="Selected Major" />
			</Select.Root>
		</div>

		<div class="ml-4">
			<Select.Root bind:selected={currentActiveMetric}>
				<Select.Trigger class="w-[180px]">
					<Select.Value placeholder="Select a metric" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Metrics</Select.Label>
						{#each metricSelections as metric}
							<Select.Item value={metric} label={metric}
								>{metric === 'avg_gpa'
									? 'Average GPA'
									: metric.charAt(0).toUpperCase() + metric.slice(1)}</Select.Item
							>
						{/each}
					</Select.Group>
				</Select.Content>
				<Select.Input name="Selected Metric" />
			</Select.Root>
		</div>
	</div>

	<div class="h-[500px] rounded border p-4">
		<Chart
			data={graphData}
			x="year"
			xScale={scaleLinear()}
			y={currentActiveMetric}
			{yDomain}
			yNice
			padding={{ left: 16, bottom: 24 }}
			tooltip={{ mode: 'bisect-x' }}
		>
			<Svg>
				<Axis
					placement="left"
					grid
					rule={{ class: 'stroke-stone-200' }}
					tickLabelProps={{
						class: 'fill-white font-semibold'
					}}
				/>
				<Axis
					placement="bottom"
					rule={{ class: 'stroke-stone-200' }}
					tickLabelProps={{
						class: 'fill-white font-semibold'
					}}
				/>
				<Spline class="stroke-primary stroke-2" />
				<Highlight points lines />
			</Svg>

			<Tooltip.Root let:data>
				{#if data}
					<Tooltip.Header>{data.year}</Tooltip.Header>
					<Tooltip.List>
						<Tooltip.Item label={currentActiveMetric} value={data[currentActiveMetric]} />
					</Tooltip.List>
				{/if}
			</Tooltip.Root>
		</Chart>
	</div>
</div>
