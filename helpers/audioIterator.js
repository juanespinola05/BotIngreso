/* eslint-disable no-shadow */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');

const audioPath = path.join(__dirname, '../', '/audio');
const readDir = () => {
	fs.readdir(audioPath, (err, files) => {
		if (err) {
			console.log(err);
		}
		else {
			console.log('Filenames with the .mp3 extension:');
			const audioObj = {};
			files.forEach((file) => {
				if (path.extname(file) == '.mp3') {
					mappingAudio(file, audioObj);
				}
			});
			exportToJson(audioObj);
			console.log('done');
		}
	});
};

const exportToJson = (file) => {
	const rawData = JSON.stringify(file, null, 2);
	const audioExportPath = path.join(__dirname, '../', '/json/audio.json');
	return fs.writeFileSync(audioExportPath, rawData);
};

const mappingAudio = (path, obj) => {
	obj[path.split('.')[0]] = {
		url: path,
		description: '',
	};
};

// class objectAudio {
// 	constructor(url, description = '') {
// 		this.url = url;
// 		this.description = description;
// 	}
// }
module.exports = readDir;
// readDir();
