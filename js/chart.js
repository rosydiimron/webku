		var YEAR = ['2007','2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
		var config = {
			type: 'line',
			data: {
				labels: ['2010','2011','2012', '2013', '2014', '2015', '2016', '2017', '2018'],
				datasets: [{
					label: 'Jumlah Pendaftar Universitas Narotama per Tahun',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: [
						2000,
						2100,
						2300,
						2400,
						2600,
						2700,
						2900,
						3000,
						3100						
					],
					fill: false,
				}, {
					label: 'Jumlah Wisudawan Universitas Narotama per Tahun',
					fill: false,
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					data: [
						1850,
						1900,
						2150,
						2200,
						2400,
						2450,
						2850,
						2800,
						3000
					],
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: ''
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Tahun'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Jumlah'
						}
					}]
				}
			}
		};

		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myLine = new Chart(ctx, config);
		};

		document.getElementById('randomizeData').addEventListener('click', function() {
			config.data.datasets.forEach(function(dataset) {
				dataset.data = dataset.data.map(function() {
					return randomScalingFactor();
				});

			});

			window.myLine.update();
		});

		var colorNames = Object.keys(window.chartColors);
		document.getElementById('addDataset').addEventListener('click', function() {
			var colorName = colorNames[config.data.datasets.length % colorNames.length];
			var newColor = window.chartColors[colorName];
			var newDataset = {
				label: 'Dataset ' + config.data.datasets.length,
				backgroundColor: newColor,
				borderColor: newColor,
				data: [],
				fill: false
			};

			for (var index = 0; index < config.data.labels.length; ++index) {
				newDataset.data.push(randomScalingFactor());
			}

			config.data.datasets.push(newDataset);
			window.myLine.update();
		});

		document.getElementById('addData').addEventListener('click', function() {
			if (config.data.datasets.length > 0) {
				var month = MONTHS[config.data.labels.length % MONTHS.length];
				config.data.labels.push(month);

				config.data.datasets.forEach(function(dataset) {
					dataset.data.push(randomScalingFactor());
				});

				window.myLine.update();
			}
		});

		document.getElementById('removeDataset').addEventListener('click', function() {
			config.data.datasets.splice(0, 1);
			window.myLine.update();
		});

		document.getElementById('removeData').addEventListener('click', function() {
			config.data.labels.splice(-1, 1); // remove the label first

			config.data.datasets.forEach(function(dataset) {
				dataset.data.pop();
			});

			window.myLine.update();
		});