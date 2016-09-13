function bSearch(){
	var container = d3.select("body")
					.append("svg")
					.attr("width",1000)
					.attr("height",500)
					.append("g");

	
	var rect, text;
	var arrow1, arrow2;
	var low = 0, high = 11, target = 29;
	var value = [3, 7, 28, 29, 43, 49, 55, 58, 69, 77, 79, 99];
	var rectWidth = 40;
	var rectHeight = 40;
	var padding = 10;

		
	

	var drawArray = function(){

		if( text !== undefined ){
			text.remove().exit();
			rect.remove().exit();
			// arrow1.remove().exit();
			// arrow2.remove().exit();
		}

		
		rect = container
				.selectAll("g.queue.rect")
				.data(value)
				.enter().append("rect")
				.attr("id",function(d, i){ return "rectIdx"+ i ; }	)
				.attr("x",function(d,i){return 100+(padding+rectWidth)*i;})
				.attr("y",100)
				.attr("fill",function(d,i){
					if( i >= low && i <= high)
						return "#F7C331";
					else return "#DCC7AA";
				})
				.attr("width",rectWidth)
				.attr("height",rectHeight)
				.attr("rx",2)
				.attr("ry",2)
				.attr("opacity",function(d,i){
					if( i >= low && i <= high)
						return 1.0;
					else return 0.5;
				})
				


		text = container
				.selectAll("g.queue.text")
				.data(value)
				.enter().append("text")
				.text(function(d){return d;})
				.attr("x",function(d,i){return 100+(padding+rectWidth)*i+rectWidth/4;})
				.attr("y",100+rectHeight/3*2)
				.attr("fill",function(d,i){
					if( i >= low && i <= high)
						return "black"
					else return "white";
				})
				.attr("id",function(d,i){return "#textIdx"+ i;});

		// arrow1 = container.append("g");
		// arrow1.append("svg:path")
		// .attr("d","M0,10L5,4L10,10")
		// .attr("fill","#6B7A8F");

		// arrow1.append("text")
		// .text("low")
		// .attr("x",function(){return -rectWidth/5;})
		// .attr("y",30)
		// .attr("fill","#6B7A8F");
		// arrow1.attr("transform","translate("+ (100+(padding+rectWidth)*low + rectWidth/3)+","+(rectHeight+100)+")");


		// arrow2 = container.append("g");
		// arrow2.append("svg:path")
		// .attr("d","M0,10L5,4L10,10")
		// .attr("fill","#6B7A8F");
		
		// arrow2.append("text")
		// .text("high")
		// .attr("x",function(){return -rectWidth/4;})
		// .attr("y",30)
		// .attr("fill","#6B7A8F");

		// arrow2.attr("transform","translate("+ (100+(padding+rectWidth)*high + rectWidth/3)+","+(rectHeight+100)+")");
		
		

		
	}

	var Watch = function(mid){
		var watchMid = container.append("g");
		watchMid.append("rect")
			.attr("x",100)
			.attr("y",200)
			.attr("width",rectWidth*5)
			.attr("height",rectHeight)
			.attr("fill","#BCBABE")
			.attr("rx",2)
			.attr("ry",2)
			.attr("opacity",0.3);

		watchMid.append("text")
			.text("target = " + target)
			.attr("x",100 + rectWidth/5*3)
			.attr("y",200 + rectHeight/5*3)
			.attr("fill","#6B7A8F");
	}


	var highlightMid = function(){
		var mid = parseInt((low+high)/2);
		var arrow3 = container.append("g");
	
		arrow3.append("svg:path")
		.attr("d","M0,10L5,4L10,10")
		.attr("fill","#6B7A8F");
		
	
		arrow3.append("text")
		.text("mid")
		.attr("x",function(){return -rectWidth/5;})
		.attr("y",30)
		.attr("fill","#6B7A8F");

		
		arrow3.attr("transform","translate("+ (100+(padding+rectWidth)*mid + rectWidth/3)+","+(rectHeight+100)+")");
		
		async.series([
			function(callback){
				setTimeout(function(){
					d3.select("#rectIdx"+mid)
						.transition()
						.attr("fill","#F7882F");
					callback(null);
				},300);
			},
			function(callback){
				setTimeout(function(){
					d3.select("#rectIdx"+mid)
						.transition()
						.attr("fill","#F7C331");
					callback(null);

				},300);
			},
			function(callback){
				setTimeout(function(){
					d3.select("#rectIdx"+mid)
						.transition()
						.attr("fill","#F7882F");
					callback(null);
				},300);
			},
			function(callback){
				setTimeout(function(){
					d3.select("#rectIdx"+mid)
						.transition()
						.attr("fill","#F7C331");
					callback(null);

				},300);
			},
			function(callback){
				setTimeout(function(){
					d3.select("#rectIdx"+mid)
						.transition()
						.attr("fill","#F7882F");
					callback(null);
				},300);
			},
			function(callback){
				setTimeout(function(){
					arrow3.remove().exit();
			
					if( target < value[mid])
						high = mid-1;
					else
						low = mid+1;
					d3.select("#rectIdx"+mid)
						.transition()
						.attr("fill","#F7C331");
					translateArrow();
					callback(null);
				},300);
			}
			], function(err, results){
				console.log("완료");
			});
		// d3.select("#rectIdx"+mid)
		// 	.transition()
		// 	.attr("fill","#F7882F").duration(200);
		// d3.select("#rectIdx"+mid)
		// 	.transition()
		// 	.attr("fill","#F7C331").duration(200).delay(200);
		// d3.select("#rectIdx"+mid)
		// 	.transition()
		// 	.attr("fill","#F7882F").duration(200).delay(400);

		// d3.select("#rectIdx"+mid)
		// 	.transition()
		// 	.attr("fill","#F7C331").duration(200).delay(600);
		// d3.select("#rectIdx"+mid)
		// 	.transition()
		// 	.attr("fill","#F7882F").duration(200).delay(800);
		// var arrow3 = container.append("g");
	
		// arrow3.append("svg:path")
		// .attr("d","M0,10L5,4L10,10")
		// .attr("fill","#6B7A8F");
		
	
		// arrow3.append("text")
		// .text("mid")
		// .attr("x",function(){return -rectWidth/5;})
		// .attr("y",30)
		// .attr("fill","#6B7A8F");

		
		// arrow3.attr("transform","translate("+ (100+(padding+rectWidth)*mid + rectWidth/3)+","+(rectHeight+100)+")");
		

		Watch(mid);

		// setTimeout(function(){
		// 	arrow3.remove().exit();
			
		// 	if( target < value[mid])
		// 		high = mid-1;
		// 	else
		// 		low = mid+1;
		// 	translateArrow();
		// 	//drawArray(value);

		// 	// done();
		// }, 1000);
	}
	
	var translateArrow = function(){
		// arrow1.transition()
		// 		.attr("transform","translate("+ (100+(padding+rectWidth)*low + rectWidth/3)+ ","+(rectHeight+100)+")");
		// arrow2.transition()
		// 		.attr("transform","translate("+ (100+(padding+rectWidth)*high + rectWidth/3)+ ","+(rectHeight+100)+")");
	}


	

	return {
		drawArray : drawArray,
		translateArrow : translateArrow,
		highlightMid : highlightMid
	};
}

var a = new bSearch();
a.drawArray();

// a.drawQueue
async.series([
			function(callback){
				setTimeout(function(){
					a.highlightMid();
					callback(null);

				},1500);
			},
			function(callback){
				setTimeout(function(){
					a.drawArray();
					callback(null);

				},2000);
			},
			function(callback){
				setTimeout(function(){
					a.highlightMid();
					callback(null);

				},2000);
			},
			function(callback){
				setTimeout(function(){
					a.drawArray();
					callback(null);

				},300);
			},
			function(callback){
				setTimeout(function(){
					a.highlightMid();
					callback(null);

				},2000);
			},
			function(callback){
				setTimeout(function(){
					a.drawArray();
					callback(null);

				},1000);
			}
			], function(err, results){
				console.log("완료");
			});

