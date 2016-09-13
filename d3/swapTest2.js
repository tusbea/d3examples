

function swapTest(){
	var container = d3.select("body")
	.append("svg")
	.attr("width",1000)
	.attr("height",1000)
	.append("g");


	var elem, text, rect,label;
	var value = [1,2,3,4];
	var rectWidth = 30;
	var rectHeight = 40;
	var padding = 10
	var arrName = "Arr";

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
		.attr("x",function(d,i){return 100+100*i-10;})
		.attr("y",100-25)
		.attr("rx",5)
		.attr("ry",5)
		.attr("width",rectWidth)
		.attr("height",rectHeight)
		.attr("fill","#78A5A3")
		.attr("opacity",0.3);

	}

	var drawArray = function(){
		if( elem !== undefined ){
			//text.transition().duration(100).attr("opacity",100).remove();
			//text.exit();
			elem.remove().exit();
			
		}


		elem = container.selectAll("g")
		.data(value)
		.enter()
		.append("rect")
		.attr("x",function(d,i){return 80 + (rectWidth+padding)*i;})
		.attr("y",function(d,i){return 100})
		.attr("rx",5)
		.attr("ry",5)
		.attr("width",rectWidth)
		.attr("height",rectHeight)
		.attr("fill","#78A5A3")
		.attr("opacity",0.3);

		elem.append("text")
			.text(function(d){return "AAaa";})
			.attr("id", function(d,i){return "Idx" +  i;})
			.dx(function(d){return -80});
		// elem.append("text")
		// 				.text(function(d){return d;})
		// 				.attr("id", function(d,i){return "Idx" +  i;})
		// 				.attr("x",function(d,i){return 100+100*i;})
		// 				.attr("y",100)
		// 		temp =		container
		// 		.data(value)
		// 		.enter()
		// 		.append("rect")
		// 				.attr("dx",function(d){return -10;})
		// 				.attr("dy",function(d){return -20})
		// 				.attr("rx",5)
		// 				.attr("ry",5)
		// 				.attr("width",rectWidth)
		// 				.attr("height",rectHeight)
		// 				.attr("fill","#78A5A3")
		// 				.attr("opacity",0.3);
		// text = container.selectAll("text.arr")
		// .data(value)
		// .enter()
		// .append("text")
		// .text(function(d){return d;})
		// .attr("id", function(d,i){return "Idx" +  i;})
		// .attr("x",function(d,i){return 100+100*i;})
		// .attr("y",100);
	}

	var swap = function(i,j){
		async.series([
			function(callback){
				setTimeout(function(){

					d3.select("#Idx"+i)
					.transition().duration(500)
					.attr("transform","translate(0,-50)");
					d3.select("#Idx"+j)
					.transition().duration(500)
					.attr("transform","translate(0,50)");

					d3.select("#rectIdx"+i)
					.transition().duration(500)
					.attr("transform","translate(0,-50)");
					d3.select("#rectIdx"+j)
					.transition().duration(500)
					.attr("transform","translate(0,50)");

					callback(null);
				},500);
			},
			function(callback){
				setTimeout(function(){
					d3.select("#Idx"+i)
					.transition().duration(500)
					.attr("transform","translate("+ (100*(j-i)) + ",-50)");
					
					d3.select("#Idx"+j)
					.transition().duration(500)
					.attr("transform","translate("+  (100*(i-j)) + ",50)");

					d3.select("#rectIdx"+i)
					.transition().duration(500)
					.attr("transform","translate("+ (100*(j-i)) + ",-50)");
					
					d3.select("#rectIdx"+j)
					.transition().duration(500)
					.attr("transform","translate("+  (100*(i-j)) + ",50)");
					callback(null);
				},500);
			},
			function(callback){
				setTimeout(function(){

					d3.select("#Idx"+i)
					.transition().duration(500)
					.attr("transform","translate("+ (100*(j-i)) + ",0)");

					d3.select("#Idx"+j)
					.transition().duration(500)
					.attr("transform","translate("+  (100*(i-j)) + ",0)");

					d3.select("#rectIdx"+i)
					.transition().duration(500)
					.attr("transform","translate("+ (100*(j-i)) + ",0)");

					d3.select("#rectIdx"+j)
					.transition().duration(500)
					.attr("transform","translate("+  (100*(i-j)) + ",0)");

					callback(null);
				},500);
			},
			function(callback){
				setTimeout(function(){
					var tmp =value[i];
					value[i] = value[j];
					value[j] = tmp;
					drawArray();
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
	swap : swap
};
}

var a = new swapTest();

//a.drawRect();
a.drawArray();
//a.drawLabel();
//a.swap(0,1);