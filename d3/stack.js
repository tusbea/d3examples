

function stack(){
	var container = d3.select("body")
	.append("svg")
	.attr("width",1000)
	.attr("height",500)
	.append("g");
	var text, rect, label, newElem, elem;
	var value = [1,2,3,4];
	var top = 3;
	var rectWidth = 40;
	var rectHeight = 20;
	var arrName = "Arr";
	var padding = 5;

	var Push = function(_value, done){
		top++;
		value.push(_value);
		async.series([
			function(callback){
				setTimeout(function(){
					newElem = container.append("g");
					 newElem.append("rect")
						.attr("x",300)
						.attr("y",100)
						.attr("width",rectWidth)
						.attr("height",rectHeight)
						.attr("fill","#BCBABE")
						.attr("rx",2)
						.attr("ry",2);

					newElem.append("text")
						.text(_value)
						.attr("x",315)
						.attr("y",115)
						.attr("fill","black");
		
					var distance = (300-(rectHeight+padding)*top)-100;
					newElem.transition()
						.attr("transform","translate(0,"+distance+")").duration(500).ease(d3.easeElasticOut);
						callback(null);
						//newElem.remove().exit();
				},700);
			},
			function(callback){
				setTimeout(function(){
					newElem.remove().exit();
					drawStack();
					drawArray();
					callback(null);
				},500);
			}
		], function(err, results){
			done();
			console.log("완료");
		});
	}

	var Pop = function(done){
		var _value = value[top];
		value.pop();
		top--;
		async.series([
			function(callback){
				setTimeout(function(){
					newElem.remove().exit();
					drawStack();
					drawArray();

					newElem = container.append("g");
					 newElem.append("rect")
						.attr("x",300)
						.attr("y",300-(rectHeight+padding)*(top+1))
						.attr("width",rectWidth)
						.attr("height",rectHeight)
						.attr("fill","#BCBABE")
						.attr("rx",2)
						.attr("ry",2);

					newElem.append("text")
						.text(_value)
						.attr("x",315)
						.attr("y",315-(rectHeight+padding)*(top+1))
						.attr("fill","black");
		
					var distance = -(300-(rectHeight+padding)*top-100);
					newElem.transition()
						.attr("transform","translate(0,"+distance+")").duration(500).ease(d3.easeCubicOut);
						callback(null);
						//newElem.remove().exit();
				},700);
			},
			function(callback){
				setTimeout(function(){
					newElem.remove().exit();
					drawStack();
					drawArray();
					callback(null);
				},500);
			}
		], function(err, results){
			done();
			console.log("완료");
		});
	}

	var drawLabel = function(){
		console.log(1);
		label = container
		.append("text")
		.text(arrName + " : ")
		.attr("x",10)
		.attr("y",100);
	}

	var drawStack = function(){
		if( rect !== undefined){
			rect.remove().exit();
		}
		
		rect = container.selectAll("rect.stack")
				.data(value)
				.enter()
				.append("rect")
				.attr("id",function(d,i){return "rectIdx"+i;})
				.attr("x",300)
				.attr("y",function(d,i){return 300-(rectHeight+padding)*i;})
				.attr("width",rectWidth)
				.attr("height",rectHeight)
				.attr("fill","#BCBABE")
				.attr("opacity",1.0)
				.attr("rx",2)
				.attr("ry",2);
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
		.attr("id", function(d,i){return "Idx" +  i;})
		.attr("x",315)
		.attr("y",function(d,i){return 300-(rectHeight+padding)*i+15;});
	}

	var highlight = function(i){
		async.series([
			function(callback){
				setTimeout(function(){
				 	d3.select("#rectIdx"+i)
				 		.transition()
				 		.attr("fill","#F52549")
				 		
					callback(null);
				},100);
			}
			], function(err, results){
				console.log("완료");
			});
	}

	var unhighlight = function(i){
		async.series([
			function(callback){
				setTimeout(function(){
				 	d3.select("#rectIdx"+i)
				 		.transition()
				 		.attr("fill","#78A5A3")
				 		
					callback(null);
				},100);
			}
			], function(err, results){
				console.log("완료");
			});
	}

	

	return {
		Push : Push,
		Pop : Pop,
		drawLabel : drawLabel,
		drawArray : drawArray,
		drawStack : drawStack,
		highlight : highlight,
		unhighlight : unhighlight
	};
}



var a = new stack();
a.drawStack();
a.drawArray();
async.series([
			function (callback) {
				setTimeout(function(){
					a.Push(9, function () {
						callback(null);	
					});			
				}, 1200);

			},
			function (callback) {
				setTimeout(function(){
					a.Push(8, function () {
						callback(null);
					});	
				},1200);

			},
			function (callback) {
				setTimeout(function(){
					a.Pop(function () {
						callback(null);
					});
				},1200);

			}
		], function (err, results) {
			console.log("완료");

		});