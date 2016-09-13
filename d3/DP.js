function DP(){
	var container = d3.select("body")
					.append("svg")
					.attr("width",1000)
					.attr("height",1000)
					.append("g");

	var row = 2, column = 10;
	//var rect, text, label,
	var rectNum = 0, textNum = 0;
	var arr;
	var value = [[50,10,100,20,40],[30,50,70,10,60]];
	var rectWidth = 40;
	var rectHeight = 40;
	var padding = 10;
	

	var drawArray = function(){

		if( arr !== undefined ){
			arr.remove().exit();
			
		}
		
		arr = container.append("g");
		arr.selectAll("g.row")
			.data(value)
			.enter()
			.append("g")
			.attr("transform",function(d,i){return "translate(0,"+i*(rectHeight+padding)+")"})
			.selectAll("g.column")
			.data(function(d){ return d;})
			.enter()
			.append("rect")
			.attr("x",function(d,i){return (padding+rectWidth)*i})
			.attr("fill","#EAE2D6")
			.attr("width",rectWidth)
			.attr("height",rectHeight)
			.attr("rx",2)
			.attr("ry",2)
			.attr("id",function(d,i){return "rectIdx"+rectNum++;})
			.attr("opacity",0.5);

		arr.append("text")
			.attr("x",100)
			.attr("y",100)
			.text("asdfadf")
			.attr("fill","black");
		// arr = container.selectAll("g.arr")
		// 		.data(value)
		// 		.enter()
		// 		.append("g")
		// 		.attr("transform", function(d,i){
		// 			return "translate(0," + (padding+rectHeight)*i +")";
		// 		})
		// 		.selectAll("g.rect")
		// 		.data(function(d){return d;})
		// 		.enter().append("rect")
		// 		.attr("id", function(d,i){return "rectIdx"+(rectNum++);})
		// 		.attr("x",function(d,i){return (padding+rectWidth)*i;})
		// 		.attr("y",0)
		// 		.attr("fill","#EAE2D6")
		// 		.attr("width",rectWidth)
		// 		.attr("height",rectHeight)
		// 		.attr("rx",2)
		// 		.attr("ry",2)
		// 		.attr("opacity",0.5);

	

		
	}


	var highlight = function(i){
		async.series([
			function(callback){
				setTimeout(function(){
					d3.select("#rectIdx"+i).transition().attr("fill","#E99787").attr("opacity",0.8);
					// d3.select("#rectIdx"+i).transition().attr("opacity",0.8);
					// d3.select("#rectIdx"+i).transition().attr("opacity",0.5);
					callback(null);
				},300);
			},
			function(callback){
				setTimeout(function(){
					d3.select("#rectIdx"+i).transition().attr("opacity",0.5);
					callback(null);
				},300);
			}
			], function(err, results){
				console.log("완료");
			});
	}

	var unhighlight = function(i){
		async.series([
			function(callback){
				setTimeout(function(){
				 	d3.select("#rectIdx"+i).transition().attr("fill","#EED8C9");
					callback(null);

				},300);
			}
			], function(err, results){
				console.log("완료");
			});
	}



	var go = function(){
		var curBack = back;
		async.series([
			function(callback){
				setTimeout(function(){

					for(var i = front; i<= back; i++){
						highlight(queue[i].x*column + queue[i].y);
					}

					callback(null);
				},500);
			},
			function(callback){
				setTimeout(function(){
					var dx = [-1,1,0,0];
					var dy = [0,0,-1,1];
					curBack = back;
					for(var i = front; i <= curBack; i++){
						var cx = queue[i].x, cy = queue[i].y;
						for(var j = 0; j < 4; j++){
							var nx = cx + dx[j];
							var ny = cy + dy[j];
							if( nx >= 0 && nx < row &&
								ny >= 0 && ny < column &&
								value[nx][ny] === 1 && visit[nx][ny] ===0){
								qPush(nx,ny);
								// visit[nx][ny] = 1;
							}
						}
					}
					callback(null);
				},100);
			},
			function(callback){
				setTimeout(function(){
					front = curBack+1;
					callback(null);
				},100);
			}
			], function(err, results){
				console.log("완료");
			});

	}

	return {
	
		drawArray : drawArray,
		highlight : highlight,
		unhighlight : unhighlight
		
	};
}

var a = new DP();

a.drawArray();

// async.series([
// 			function(callback){
// 				setTimeout(function(){
// 					a.highlight(0);
// 					callback(null);

// 				},300);
// 			},
// 			function(callback){
// 				setTimeout(function(){
// 					a.unhighlight(0);
// 					callback(null);

// 				},300);
// 			}
// 			], function(err, results){
// 				console.log("완료");
// 			});

