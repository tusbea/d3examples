function Queue(){
	var container = d3.select("body")
					.append("svg")
					.attr("width",1000)
					.attr("height",500)
					.append("g");

	
	var rect, text, label,rectNum = 0, textNum = 0;
	var arrow1, arrow2;
	var front = 0, rear = 4, bf = 0, br = 0;
	var value = [1,2,3,4,5];
	var visit;
	var rectWidth = 40;
	var rectHeight = 40;
	var padding = 10;
	var queue = [];

	

	
	

	var drawQueue = function(){

		if( text !== undefined ){
			text.remove().exit();
			rect.remove().exit();
		}

		
		rect = container
				.selectAll("g.queue.rect")
				.data(value)
				.enter().append("rect")
				.attr("id",function(d, i){ return "rectIdx"+(rectNum++); }	)
				.attr("x",function(d,i){return 100+(padding+rectWidth)*i;})
				.attr("y",100)
				.attr("fill","#128277")
				.attr("width",rectWidth)
				.attr("height",rectHeight)
				.attr("rx",2)
				.attr("ry",2)
				.attr("opacity",function(d,i){
					if( i>= front && i<= rear)
						return 1.0;
					else return 0.2;
				});
				


		text = container
				.selectAll("g.queue.text")
				.data(value)
				.enter().append("text")
				.text(function(d){return d;})
				.attr("x",function(d,i){return 100+(padding+rectWidth)*i+rectWidth/3;})
				.attr("y",100+rectHeight/3*2)
				.attr("fill","white")
				.attr("id","#textIdx"+(++textNum));
		drawArrow();
	}


	
	var drawArrow = function(){
		if( arrow1 != undefined){
			arrow1.remove().exit();
			arrow2.remove().exit();
		}


		arrow1 = container.append("g");
		arrow1.append("svg:path")
		.attr("d","M0,10L5,4L10,10")
		.attr("fill","black");

		arrow1.append("text")
		.text("front")
		.attr("x",function(){return -rectWidth/3;})
		.attr("y",30)
		.attr("fill","black");
		arrow1.attr("transform","translate("+ (100+(padding+rectWidth)*front + rectWidth/3)+","+(rectHeight+100)+")");


		arrow2 = container.append("g");
		arrow2.append("svg:path")
		.attr("d","M0,10L5,4L10,10")
		.attr("fill","black");
		
		arrow2.append("text")
		.text("rear")
		.attr("x",function(){return -rectWidth/4;})
		.attr("y",30)
		.attr("fill","black");

		arrow2.attr("transform","translate("+ (100+(padding+rectWidth)*rear + rectWidth/3)+","+(rectHeight+100)+")");
		
		

		
	}

	var translateArrow = function(){
		arrow1.transition()
				.attr("transform","translate("+ (100+(padding+rectWidth)*front + rectWidth/3)+ ","+(rectHeight+100)+")");
		arrow2.transition()
				.attr("transform","translate("+ (100+(padding+rectWidth)*rear + rectWidth/3)+ ","+(rectHeight+100)+")");
	}


	var Push = function(i){
		value.push(i);
		++rear;
		var duration = 500;
		var newElem = container.append("g");

		newElem.append("rect")
			.attr("x",500)
			.attr("y",100)
			.attr("width",rectWidth)
			.attr("height",rectHeight)
			.attr("fill","#128277")
			.attr("rx",2)
			.attr("ry",2);

		newElem.append("text")
			.text(value[rear])
			.attr("x",500 + rectWidth/3)
			.attr("y",100+rectHeight/3*2)
			.attr("fill","white");
		
		 var distance = -(500-(rectWidth+padding)*rear)+100;
		 console.log(distance);
		newElem.transition()
			.attr("transform","translate("+distance+",0)")
			.duration(duration)
			.ease(d3.easePolyOut);

		translateArrow();
		setTimeout(function(){
			newElem.remove().exit();
			translateArrow();
			drawQueue();
			bf = front;
			br = rear;
			//done();
		}, duration);

		
	}

	var Pop = function(){
		var duration = 500;
		++front;
		translateArrow();
		setTimeout(function(){
			drawQueue();
			bf = front;
			br = rear;
			
			//done();
		}, duration);
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
		drawQueue : drawQueue,
		Push : Push,
		Pop : Pop,
		drawArrow : drawArrow,
		translateArrow : translateArrow,
		go : go
	};
}

var a = new Queue();
a.drawQueue();
//a.Pop();
a.Push(1);
a.Push(2);
a.Push(3);
a.Pop();
a.Pop();
a.Pop();
// a.drawQueue
// async.series([
// 			function(callback){
// 				setTimeout(function(){
// 					a.Push(1);
// 					callback(null);

// 				},1000);
// 			},
// 			function(callback){
// 				setTimeout(function(){
// 					a.drawQueue();
// 					callback(null);

// 				},300);
// 			}
// 			], function(err, results){
// 				console.log("완료");
// 			});

