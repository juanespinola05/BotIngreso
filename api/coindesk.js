const axios = require('axios');

// Make a request for a user with a given ID
const basicURL = 'https://api.coindesk.com/v1/bpi/';

async function getCoinPriceNow(param1 = 'USD') {
	try {
		return await axios.get(`${basicURL}currentprice/${param1}.json`);
	}
	catch (error) {
		console.error(error);
		return 'error';
	}
}

async function getCoinHistorical31Days(param1 = 'USD') {
	try {
		return await axios.get(
			`${basicURL}historical/close.json?currency=${param1}`,
		);
	}
	catch (error) {
		console.error(error);
	}
}

module.exports = {
	getCoinPriceNow,
	getCoinHistorical31Days,
};
// Want to use async/await? Add the `async` keyword to your outer function/method.
