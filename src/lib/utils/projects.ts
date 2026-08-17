import type { Project, ServiceType } from '$lib/types';

export function getProjectServiceTypes(project: Project): ServiceType[] {
	if (project.serviceTypes?.length) return project.serviceTypes;
	if (project.category === 'design') return ['design'];

	const searchable = `${project.title} ${project.description}`.toLowerCase();
	const types: ServiceType[] = [];

	if (/e-commerce|ecommerce|online store|ordering/.test(searchable)) types.push('ecommerce');
	if (/system|erp|inventory|management/.test(searchable)) types.push('business-system');
	if (/mobile|app/.test(searchable)) types.push('mobile-app');
	if (types.length === 0 || /website|marketing/.test(searchable)) types.push('business-website');

	return types;
}
