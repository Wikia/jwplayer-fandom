var fs = require('fs');
var path = 'src/locales/';
var languages = fs.readdirSync(path);
var result = '';

languages.forEach(function (lang, index) {
	var stat = fs.statSync(path + lang);
	if (stat.isDirectory()) {
		var translations = fs.readFileSync(path + lang + '/main.json').toString();
		result += '"' + lang + '": ' + translations;
		if (index < languages.length - 1) {
			result += ',\n';
		}
	}
});

result = 'var wikiaJWPlayeri18n = {\n' + result + '\n};';

fs.writeFileSync('src/i18n.js', result);
