function Array2(){
	var container = d3.select("body")
					.append("svg")
					.attr("width",1000)
					.attr("height",1000)
					.append("g");

	var row = 4, column = 5;
	var rect, text, label,rectNum = 0, textNum = 0;
	var value = [[1,1,1,1,0],[1,0,1,0,0],[1,1,0,0,1],[0,1,1,1,1]];
	var visit;
	var rectWidth = 40;
	var rectHeight = 40;
	var arrName = "Arr";
	var padding = 10;
	var queue = [],front = 0,back = -1;

	var init = function(){
		visit = new Array(row);
		for(var i = 0; i < row; i++){
			visit[i] = new Array(column);
			for(var j = 0; j< column; j++)
				visit[i][j] = 0;
		}

	}

	var drawLabel = function(){

		label = container
		.append("text")
		.text(arrName + " : ")
		.attr("x",10)
		.attr("y",100);
	}

	

	var drawArray = function(){

		if( text !== undefined ){
			text.remove().exit();
			rect.remove().exit();
		}
		
		
		rect = container.selectAll("g.arr")
				.data(value)
				.enter()
				.append("g")
				
				.attr("transform", function(d,i){
					return "translate(0,"+(100+(padding+rectHeight)*i)+")";
				})
				.selectAll("g.rect")
				.data(function(d){return d;})
				.enter().append("rect")
				.attr("id",function(d, i){ return "rectIdx"+(rectNum++); }	)
				.attr("x",function(d,i){return 100+(padding+rectWidth)*i;})
				.attr("y",0)
				.attr("fill",function(d){
					if(d === 0 )
						return "#81715E";
					else return "#EED8C9";
				})
				.attr("width",rectWidth)
				.attr("height",rectHeight)
				.attr("rx",2)
				.attr("ry",2)
				.attr("opacity",0.5);
				


		text = container.selectAll("g.arr")
				.data(value)
				.enter()
				.append("g")
				.attr("transform", function(d,i){
					return "translate(0,"+(100+(padding+rectHeight)*i + rectHeight/2)+")";
				})
				.selectAll("g.text")
				.data(function(d){return d;})
				.enter().append("text")
				.text(function(d,i){return d;})
				.attr("x",function(d,i){return 100+(padding+rectWidth)*i+rectWidth/3;})
				.attr("y",0)
				.attr("fill","black")
				.attr("id","#textIdx"+(++textNum));
		


		
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

	var qPush = function(i,j){
		visit[i][j] = 1;
		queue.push({x:i, y:j});
		++back;
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
		init : init,
		drawLabel : drawLabel,
		drawArray : drawArray,
		highlight : highlight,
		unhighlight : unhighlight,
		qPush : qPush,
		go : go
	};
}

var a = new Array2();
a.init();
a.drawArray();
a.qPush(0,0);
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

