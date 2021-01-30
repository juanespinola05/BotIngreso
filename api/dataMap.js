const { getCoinHistorical31Days, getCoinPriceNow } = require('./coindesk');

const getDataHist = async (argument) => {
	try {
		const dataHist = await getCoinHistorical31Days(argument);
		if (dataHist.ok) {
			return dataHist;
		}
	}
	catch (err) {
		console.log(err);
		return err;
	}
};
const getBtc = async (param = 'USD') => {
	try {
		const price = await getCoinPriceNow(param);
		if (price !== 'error') {
			return price.data.bpi[param];
		}
	}
	catch (err) {
		console.log(err);
		return err;
	}
};

module.exports = { getDataHist, getBtc };
