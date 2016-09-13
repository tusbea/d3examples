function ArrayModule(){
	var value = [];
	var tPosition
	var fontColor = [];
	var backgroundColor = [];
	var arrow1,arrow2;
	var container = d3.select("body")
						.append("svg")
						.attr("width",1000)
						.attr("height",1000)
						.append("g");

	var text;

	var Concat = function(_value){
		value = value.concat(_value);
	};

	
	var Push = function(_value, _fontColor, _backgroundColor){
		value.push(_value);
		fontColor.push(_fontColor);
		backgroundColor.push(_backgroundColor);
	};

	var getValue = function(idx){

		return value[idx];
	};


	var swap = function(i,j){

	}


	var drawArrow = function(i,j){
		arrow1 = container.append("svg:path")
		.attr("d","M0,0L5,6L10,0")
		.attr("fill","black")
		.attr("transform","translate("+ (100+ 100*i)+",70)");

		arrow2 = container.append("svg:path")
		.attr("d","M0,0L5,6L10,0")
		.attr("fill","black")
		.attr("transform","translate("+ (100+ 100*j)+",70)");


 //    function bumpArrow() {
 //        arrow
 //            .transition()
 //            .attr('transform', 'translate(30,190),rotate(90),scale(2)')
 //            .transition()
 //            .attr('transform', 'translate(30,180),rotate(90),scale(2)')

 //    }
	}

	var translateArrow = function(i,j){
		arrow1.transition()
				.attr("transform","translate("+ (100+ 100*i)+",70)");
		arrow2.transition()
				.attr("transform","translate("+ (100+ 100*j)+",70)");
	}


	var drawArray = function(){
		if( text !== undefined ){
			//text.transition().duration(100).attr("opacity",100).remove();
			//text.exit();
			text.remove().exit();
			
		}
		text = container.selectAll("text.arr")
					.data(value)
							.enter()
							.append("text")
							.text(function(d){return d;})
							.attr("id", function(d,i){return "Idx"+i;})
							.attr("x",function(d,i){return 100+100*i;})
							.attr("y",100);

		// text.transition().duration(1000).attr("opacity",100).remove();
		// text.exit();
		

		

		
	};


	
	var InsertionSortCall = function(i,j,len,temp){
		async.series([
			function (callback) {
				console.log("0초후!");

				setTimeout(function () {
					if(i >= len)
						return ;
					if(arrow1 === undefined)
						drawArrow(i,j);
					else
						translateArrow(i,j);
				
					callback(null);
				}, 2000);

			},
			function (callback) {
				setTimeout(function(){
					if( temp < value[j] && j >=0){
						value[j+1] = value[j];
						j = j-1;
					}
					else{
						value[j+1] = temp;
						i++;
						temp = value[i];
						j = i-1;
					}
					callback(null);
				},100);

			},
			function (callback) {
				setTimeout(function(){
					drawArray();
					callback(null);
				},100);

			},
			function (callback) {
				setTimeout(function(){
					InsertionSortCall(i,j,len,temp);
					callback(null);
				},100);

			}
		], function (err, results) {
			console.log("완료");

		});



		
	}


	var InsertionSort = function(){
			
			async.series([
				function(callback){
					drawArray();
					callback();
				},
				function(callback){
					console.log(0);
					InsertionSortCall(1,0,value.length,value[1]);
					callback();
				}
			],function(err,result){
				console.log(err);
			});

			
			console.log(1);
	}


	return {
		getValue : getValue,
		Push : Push,
		Concat : Concat,
		drawArray : drawArray,
		InsertionSort : InsertionSort
	};
}


var a = new ArrayModule();
var arr = [5,4,3,2,1];
a.Concat(arr);
a.InsertionSort();


