<script lang="ts">
	import { page } from '$app/stores';
	import { site } from '$lib/stores/config';
</script>

<svelte:head>
	<title>Courses</title>
	<meta
		name="description"
		content="Learn web development for free by building realworld projects"
	/>
	<link rel="canonical" href={new URL($page.url.pathname, $site).toString()} />
	<!-- twitter card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@ShindraDavid" />
	<meta name="twitter:title" content="" />
	<meta name="twitter:description" content="" />
	<meta name="twitter:image" content="" />
	<meta name="twitter:image:alt" content="" />
	<!-- open graph tags -->
	<meta name="og:locale" content="en" />
	<meta name="og:type" content="article" />
	<meta name="og:site_name" content="shindradavid.com" />
	<meta name="og:title" content="" />
	<meta name="og:description" content="" />
	<meta name="og:image" content="" />
	<meta name="og:image:alt" content="" />
</svelte:head>

<h1>Courses</h1>
<p>Explore free, project based learning experiences.</p>
