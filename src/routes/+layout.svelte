<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<head>
	<title>DiplomaFunctions</title>
</head>
<ModeWatcher />
<Toaster />
<slot></slot>
