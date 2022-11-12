<header class="header">
	<a href="/" translate="no" class="header__logo">shindra david</a>

	<nav class="header__nav">
		<a href="/">Home</a>
		<a href="/about">About</a>
		<a href="/work">Work</a>
		<a href="/contact">Contact</a>
		<a href="/FAQ">FAQ</a>
		<a href="/lab">Lab</a>
		<a href="/blog">Blog</a>
		<a href="/courses">Courses</a>
	</nav>
</header>

<svelte:head>
	<link rel="manifest" href="manifest.json" />
	<meta name="theme-color" content="#1c1c1c" />
	<meta property="application-name" content="ShindraDavid" />
</svelte:head>

<main>
	<slot />
</main>
