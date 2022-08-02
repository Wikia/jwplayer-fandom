export default function slugify(text: string): string {
	return text
		.normalize('NFD') // Normalize the string in a way that removes diacritics and other non-standard characters
		.replace(/[\u0300-\u036f]/g, '') // remove all accents
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '') // remove all non-alphanumeric characters
		.replace(/\s+/g, '-'); // replace spaces with -
}
