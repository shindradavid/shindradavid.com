<script lang="ts">
	export let breadcrumbs;
	export let datePublished;
	export let entity;
	export let lastUpdated;
	export let featuredImage;
	export let metadescription;
	export let siteLanguage;
	export let siteTitle;
	export let siteTitleAlt;
	export let siteUrl;
	export let title;
	export let url;
	export let facebookPage;
	export let githubPage;
	export let linkedinProfile;
	export let telegramUsername;
	export let tiktokUsername;
	export let twitterUsername;
	const schemaOrgArray: any[] = [];
	const schemaOrgObject = {
		'@context': 'https://schema.org',
		'@graph': schemaOrgArray
	};
	const jsonLdString = JSON.stringify(schemaOrgObject);
	const jsonLdScript = `
		<script type="application/ld+json">
			${jsonLdString}
		${'<'}/script>
	`;
</script>

<svelte:head>
	{@html jsonLdScript}
</svelte:head>
