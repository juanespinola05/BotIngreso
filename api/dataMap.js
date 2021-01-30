const { getCoinHistorical31Days, getCoinPriceNow } = require('./coindesk');

const getDataHist = async (argument) => {
	const dataHist = await getCoinHistorical31Days(argument);
	if (dataHist !== 'error') {
		return dataHist.data.bpi;
	}
	return;
};
const getBtc = async (param = 'USD') => {
	const price = await getCoinPriceNow(param);
	if (price !== 'error') {
		return price.data.bpi[param];
	}
};

module.exports = { getDataHist, getBtc };
