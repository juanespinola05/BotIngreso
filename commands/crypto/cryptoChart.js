const { CanvasRenderService } = require('chartjs-node-canvas');
const { MessageAttachment } = require('discord.js');
const { getDataHist } = require('../../api/dataMap');

const chartCallback = (ChartJS) => {
	ChartJS.plugins.register({
		beforeDraw: (chartInstance) => {
			const { ctx } = chartInstance.chart;
			const { width, height } = chartInstance.chart;
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, width, height);
		},
	});
	ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
	});
};

const width = 600;
const height = 400;
const canvasRenderService = new CanvasRenderService(
	width,
	height,
	chartCallback,
);

const chart = async (message, argument) => {
	const data = await getDataHist(argument);
	const dates = Object.keys(data);
	const prices = Object.values(data);
	const configuration = {
		type: 'line',
		data: {
			labels: dates,
			// eslint-disable-next-line no-mixed-spaces-and-tabs
			datasets: [
				{
					label: `30 days BTC-${argument} price`,
					data: prices,
					borderColor: 'rgba(247,147,26,1)',
					borderJoinStyle: 'round',
					borderCapStyle: 'round',
					borderWidth: 3,
					pointRadius: 0,
					pointHitRadius: 10,
					lineTension: 0.2,
				},
			],
		},
		options: {
			display: false,
			text: 'Heckin Chart!',
			fontSize: 35,
		},
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
		},
		scales: {
			xAxes: [
				{
					display: false,
					gridLines: {},
				},
			],
			yAxes: [
				{
					display: false,
					gridLines: {},
				},
			],
		},
		tooltips: {
			callbacks: {
				// This removes the tooltip title
				// eslint-disable-next-line no-empty-function
				title: function() {},
			},
		},
	};
	const image = await canvasRenderService.renderToBuffer(configuration);
	const attachment = new MessageAttachment(image);
	message.channel.send(attachment);
};
module.exports = { chart };
