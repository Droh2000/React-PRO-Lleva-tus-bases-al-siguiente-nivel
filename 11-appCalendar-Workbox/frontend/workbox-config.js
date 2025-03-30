module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,ico,html,png,txt,css,js}'
	],
	swDest: 'build/sw.js',
	/*ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],*/
	// Le decimos que el Source del SW lo va a tomar del archivo que creamos
	swSrc: 'src/sw-template.js'
};