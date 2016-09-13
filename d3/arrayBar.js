

function arrayBar(){
	var container = d3.select("body")
	.append("svg")
	.attr("width",1000)
	.attr("height",1000)
	.append("g");
	var text, rect,label;
	var value = [1,2,3,4];
	var rectWidth = 20;
	var rectHeight = 20;
	var arrName = "Arr";
	var padding = 10;

	var drawLabel = function(){
		console.log(1);
		label = container
		.append("text")
		.text(arrName + " : ")
		.attr("x",10)
		.attr("y",100);
	}

	var drawRect = function(){
		if( rect !== undefined){
			rect.remove().exit();
		}
		console.log("r");
		rect = container.selectAll("rect")
		.data(value)
		.enter()
		.append("rect")
		.attr("id",function(d,i){return "rectIdx"+i;})
		.attr("x",function(d,i){return 100+(padding+rectWidth)*i;})
		.attr("y",function(d,i){return 300-rectHeight*d;})
		.attr("width",rectWidth)
		.attr("height",function(d,i){return rectHeight*d;})
		.attr("fill","#78A5A3")
		.attr("opacity",0.5);

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
		.attr("x",function(d,i){return 100+ rectWidth/3 + (padding+rectWidth)*i;})
		.attr("y",100);
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

	var swap = function(i,j){
		async.series([

			function(callback){
				setTimeout(function(){
					d3.select("#Idx"+i)
					.transition().duration(500)
					.attr("transform","translate("+ ((padding+rectWidth)*(j-i)) + ",0)");
					
					d3.select("#Idx"+j)
					.transition().duration(500)
					.attr("transform","translate("+  ((padding+rectWidth)*(i-j)) + ",0)");

					d3.select("#rectIdx"+i)
					.transition().duration(500)
					.attr("transform","translate("+ ((padding+rectWidth)*(j-i)) + ",0)");
					
					d3.select("#rectIdx"+j)
					.transition().duration(500)
					.attr("transform","translate("+  ((padding+rectWidth)*(i-j)) + ",0)");
					callback(null);
				},500);
			},
			function(callback){
				setTimeout(function(){
					var tmp =value[i];
					value[i] = value[j];
					value[j] = tmp;
					drawRect();
					callback(null);
				},1000);
			}
			], function(err, results){
				console.log("완료");
			});

	}

	return {
		drawLabel : drawLabel,
		drawArray : drawArray,
		drawRect : drawRect,
		swap : swap,
		highlight : highlight,
		unhighlight : unhighlight
	};
}

var a = new arrayBar();
a.drawRect();
a.highlight(1);
a.unhighlight(1);
a.swap(0,1);

// a.drawRect();
// a.drawArray();
// a.drawLabel();
// // a.swap(0,1);
// a.highlight(2);
// a.highlight(0);
// a.swap(0,2);
// a.drawArray();
// a.unhighlight(0);
//a.unhighlight(2);