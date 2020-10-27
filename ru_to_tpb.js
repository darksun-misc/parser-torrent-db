const Papa = require('papaparse');
const fs = require('fs');

const parsed = Papa.parse('a;b;c\n1;2;3', {delimiter: ';'}).data;
console.log('parsed', parsed);

const fileNames = [
	'category_2',
	'category_8',
	'category_9',
	'category_10',
	'category_11',
	'category_18',
	'category_19',
	'category_20',
	'category_22',
	'category_23',
	'category_24',
	'category_25',
	'category_26',
	'category_28',
	'category_29',
	'category_31',
	'category_33',
	'category_34',
	'category_35',
	'category_37',
];

for (const fileName of fileNames) {
	console.log('Processing ' + fileName + '...');
	const inPath = './20200927/' + fileName + '.csv';
	const inCsvText = fs.readFileSync(inPath, 'utf8');
	const inValuesTuples = Papa.parse(inCsvText.trim(), {delimiter: ';'}).data;

	const outValuesTuples = [
		['#ADDED','HASH(B64)','NAME','SIZE(BYTES)'],
		...inValuesTuples.map(valuesTuple => {
			// "402";"[Аудио] Русская литература";"2120336";"37996E239D9B98CA99BC0EC6E1949897FFCACA7D";"Кржижановский Сигизмунд - Чужая тема [Рыбальченко Владимир, 2003, 128 kbps]";"353109843";"2009.08.18 20:00:00"
			const [, subCat, id, infoHash, name, size, addedDt] = valuesTuple;
			//console.log('infohash ' + infoHash);
			const infoHashB64 = Buffer.from(infoHash, 'hex').toString('base64');
			// date in different format, but whatever
			return [addedDt, infoHashB64, name, size];
		}),
	];
	const outPath = './tpb_format_csv/' + fileName + '.csv';
	const outCsvText = Papa.unparse(outValuesTuples, {delimiter: ';'});
	fs.writeFileSync(outPath, outCsvText);
}
