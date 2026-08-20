import type { Service } from '$lib/types';

export const site = {
	name: 'Shindra David',
	url: 'https://shindradavid.com',
	title: 'Shindra David — Mobile Apps, Business Systems & Websites for Ugandan SMEs',
	description:
		'I design and build Android and iOS apps, custom business systems, and fast websites for growing Ugandan businesses.',
	location: 'Uganda',
	twitterHandle: '@shindradavid',
	whatsappNumber: '256782346200'
} as const;

export const services: Service[] = [
	{
		slug: 'mobile-app',
		title: 'Mobile app development',
		description:
			'Custom Android and iOS applications designed around your customers and business workflows.',
		idealFor: 'Businesses that need customer-facing apps or mobile tools for their teams',
		deliverables: [
			'Android and iOS app development',
			'Mobile interface and user-flow design',
			'API integration, testing and launch support'
		],
		startingPriceUGX: 2_500_000
	},
	{
		slug: 'business-system',
		title: 'Custom business systems',
		description:
			'Practical software for managing orders, inventory, finance and day-to-day operations.',
		idealFor: 'Teams outgrowing spreadsheets and disconnected tools',
		deliverables: [
			'Workflow discovery',
			'Custom dashboards and automation',
			'Deployment and ongoing support'
		],
		startingPriceUGX: 2_000_000
	},
	{
		slug: 'business-website',
		title: 'Business websites',
		description:
			'Fast, trustworthy websites that explain your offer clearly and turn visitors into enquiries.',
		idealFor: 'Service businesses, hospitality brands, NGOs and growing SMEs',
		deliverables: [
			'Strategy and content structure',
			'Responsive design and development',
			'SEO and analytics setup'
		],
		startingPriceUGX: 550_000
	}
];

export function getWhatsAppUrl(
	message = 'Hi Shindra, I found your portfolio and would like to discuss a project.'
) {
	return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function formatUGX(amount: number) {
	return new Intl.NumberFormat('en-UG', {
		style: 'currency',
		currency: 'UGX',
		maximumFractionDigits: 0
	}).format(amount);
}
