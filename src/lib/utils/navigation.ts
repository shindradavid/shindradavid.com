export function isPathActive(currentPath: string, targetHref: string) {
	const targetPath = targetHref.split(/[?#]/)[0] || '/';

	if (targetPath === '/') return currentPath === '/';

	return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
}
