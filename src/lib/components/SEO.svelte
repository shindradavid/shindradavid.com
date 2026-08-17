<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/site';

	interface Props {
		title: string;
		description?: string;
		ogImage?: string;
		ogImageAlt?: string;
		type?: 'website' | 'article';
		publishedOn?: string;
		structuredData?: Record<string, unknown> | Record<string, unknown>[];
	}

	let {
		title,
		description = '',
		ogImage = '/images/logo.webp',
		ogImageAlt = 'Shindra David',
		type = 'website',
		publishedOn,
		structuredData
	}: Props = $props();

	const canonicalUrl = $derived(new URL(page.url.pathname, site.url).toString());
	const imageUrl = $derived(new URL(ogImage, site.url).toString());
	const defaultStructuredData = $derived(
		type === 'article'
			? {
					'@context': 'https://schema.org',
					'@type': 'Article',
					headline: title,
					description,
					image: imageUrl,
					datePublished: publishedOn,
					mainEntityOfPage: canonicalUrl,
					author: { '@type': 'Person', name: site.name, url: site.url }
				}
			: {
					'@context': 'https://schema.org',
					'@type': 'Person',
					name: site.name,
					url: site.url,
					image: new URL('/images/logo.webp', site.url).toString(),
					jobTitle: 'Full-stack developer',
					address: { '@type': 'PostalAddress', addressCountry: 'UG' },
					sameAs: [
						'https://github.com/shindradavid',
						'https://linkedin.com/in/shindradavid',
						'https://x.com/shindradavid'
					]
				}
	);
	const structuredDataMarkup = $derived(
		`<script type="application/ld+json">${JSON.stringify(structuredData ?? defaultStructuredData).replace(/</g, '\\u003c')}</scr${'ipt'}>`
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={site.name} />
	<meta name="image" content={imageUrl} />
	<link rel="canonical" href={canonicalUrl} />
	<!-- twitter card -->
	<meta property="twitter:url" content={canonicalUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={site.twitterHandle} />
	<meta name="twitter:creator" content={site.twitterHandle} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content={ogImageAlt} />
	<!-- open graph tags -->
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:locale" content="en_UG" />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:alt" content={ogImageAlt} />
	{#if type === 'article' && publishedOn}
		<meta property="article:published_time" content={publishedOn} />
	{/if}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html structuredDataMarkup}
</svelte:head>
