<script lang="ts">
	import { page } from '$app/stores';
	import { site } from '$lib/stores/config';
	// props
	export let title = 'Shindra David | A freelance web developer based in Uganda';
	export let description = 'A freelance web developer based in Uganda';
	export let imageURL = '/images/default-thumbnail.png';
	export let imageAlt = 'Shindra David | A freelance web developer based in Uganda';
	export let schema = JSON.stringify({
		'@context': 'http://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				name: 'Shindra David',
				'@id': `${$site}/#website`,
				url: $site,
				description: ''
			},
			{
				'@type': 'WebPage',
				name: 'Home',
				description: ''
			}
		]
	});
	console.log(schema);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="image" content={new URL(imageURL, $site).toString()} />
	<link rel="canonical" href={new URL($page.url.pathname, $site).toString()} />
	<!-- twitter card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@shindradavid" />
	<meta name="twitter:creator" content="@shindradavid" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={new URL(imageURL, $site).toString()} />
	<meta name="twitter:image:alt" content={imageAlt} />
	<!-- open graph tags -->
	<meta name="og:locale" content="en" />
	<meta name="og:type" content="website" />
	<meta name="og:site_name" content="Shindra David" />
	<meta name="og:title" content={title} />
	<meta name="og:description" content={description} />
	<meta name="og:image:url" content={new URL(imageURL, $site).toString()} />
	<meta name="og:image:alt" content={imageAlt} />
	<!-- schema.org -->
</svelte:head>
