async.series([
	function (callback) {
		console.log("0초후!");
		setTimeout(function () {
			console.log("2초후!");
			callback(null, 'a');
		}, 2000);
	},
	function (callback) {
		console.log("2초후!");
		setTimeout(function () {
			console.log("4초후!");
			callback(new Error("에러다"), 'b');
		}, 2000);
	},
	function (callback) {
		console.log("4초후!");
		setTimeout(function () {
			console.log("7.5초후!");
			callback(null);
		}, 3500);
	}
], function (err, results) {
	console.log("7.5초후! 완료");
	console.log(err);
	console.log(results);
});


var redraw2 = function(array,idx){
	
		async.series([
			function (callback) {
				console.log("0초후!");

				setTimeout(function () {
					for(var j = 0; j < 3; j++)
						array[j] += 1;
					a.redraw(temp);
					console.log("2초후!");
					callback(null, 'a');
					idx++;
					if(idx <=3)
						redraw2(array,idx);
				}, 2000);

			}
		], function (err, results) {
			console.log("7.5초후! 완료");
			console.log(err);
			console.log(results);
		});

	}