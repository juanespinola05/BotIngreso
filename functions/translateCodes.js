module.exports = {
	name: 'translateCodes',
	run: (string) => {
		return new Promise((res) => {
			const codes = ['<b>', '<s>', '<n>', '<k>', '<i>'],
				codesReplacements = ['**', '__', '\n', '~~', '*'];

			for (let i = 0; i < codes.length; i++) {
				const stringSplitted = string.split(codes[i]);
				string = stringSplitted.join(codesReplacements[i]);
			}

			res(string);
		});
	},
};
