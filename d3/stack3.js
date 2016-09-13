

function stack(){
	// var drag = d3.drag()
 //    .on("start", dragstarted)
 //    .on("drag", dragged)
 //    .on("end", dragended);

    var zoom = d3.zoom()
    .scaleExtent([0.1,10])
    .on("zoom",zoomed);

	var container = d3.select("#section1")
	.append("svg")
	.attr("width",1000)
	.attr("height",800)
	.attr("id","container")
	.append("g");
   	

	var controler = d3.select("#section2")
	.append("svg")
	.attr("width",1000)
	.attr("height",500)
	.append("g");



	var stack;
	var stackData = [];
	
	var top = -1;
	var rectWidth = 80;
	var rectHeight = 40;

	var padding = 5;

	var Push = function(_value, done){
		var newElem;

		top++;
		stackData.push(_value);

		async.series([
			function(callback){
				setTimeout(function(){

					var position = 700-(rectHeight+padding)*top;
					var distance = 300;

					newElem = container.append("g");
					 newElem.append("rect")
						.attr("x",300)
						.attr("y",position-distance)
						.attr("width",rectWidth)
						.attr("height",rectHeight)
						.attr("fill","#FAAF08")
						.attr("rx",10)
						.attr("ry",10);

					newElem.append("text")
						.text(_value)
						.attr("x",function(){return 300+rectWidth/2;})
					 	.attr("y",function(){return position-distance+rectHeight/5*3;})
						.attr("fill","black")
						.attr("font-family","Consolas")
						.attr("font-size","20px")
						.attr("text-anchor","middle");
		

					newElem.transition()
						.attr("transform","translate(0,"+distance+")").ease(d3.easeSinOut);
						callback(null);
						//newElem.remove().exit();
				},0);
			},
			function(callback){
				setTimeout(function(){
					newElem.remove().exit();
					drawStack();

					callback(null);
				},500);
			}
		], function(err, results){
			done();
			console.log("완료");
		});
	}

	var Pop = function(done){

		if(top === -1)
			return ;

		var newElem;

		var _value = stackData[top];
		stackData.pop();
		top--;

		async.series([
			function(callback){
				setTimeout(function(){
	
					drawStack();
					var position = 700-(rectHeight+padding)*(top+1);
					var distance = 300;

					newElem = container.append("g");
					 newElem.append("rect")
						.attr("x",300)
						.attr("y",position)
						.attr("width",rectWidth)
						.attr("height",rectHeight)
						.attr("fill","#FAAF08")
						.attr("rx",10)
						.attr("ry",10);

					newElem.append("text")
						.text(_value)
						.attr("x",function(){return 300+rectWidth/2;})
					 	.attr("y",function(){return position+rectHeight/5*3;})
						.attr("fill","black")
						.attr("font-family","Consolas")
						.attr("font-size","20px")
						.attr("text-anchor","middle");
		
					
					newElem.transition()
						.attr("transform","translate(0,"+(-distance)+")").ease(d3.easeSinOut);
						callback(null);
						
				},0);
			},
			function(callback){
				setTimeout(function(){
					newElem.remove().exit();
					drawStack();
					callback(null);
				},500);
			}
		], function(err, results){
			done();
			console.log("완료");
		});
	}


	var drawStack = function(){
		
		if( stack !== undefined){
			stack.remove().exit();
		}

		if(stackData.length === 0)
			return ;
		d3.selectAll("#container").call(zoom);


		stack = container.append("g");
		stack.selectAll("g.rect")
			.data(stackData)
			.enter()
			.append("rect")
			.attr("x",300)
			.attr("y",function(d,i){return 700-(rectHeight+padding)*i;})
			.attr("width",rectWidth)
			.attr("height",rectHeight)
			.attr("rx",10)
			.attr("ry",10)
			.attr("fill","#FAAF08")
			//.attr("transform","translate("+(-rectHeight/2)+","+(-rectWidth/2)+")")
			.attr("id",function(d,i){return "rectIdx"+i;})
			.attr("opacity",1.0)
			.on("mouseover",mouseOver)
			.on("mouseout",mouseOut);

		stack.selectAll("g.text")
			.data(stackData)
			.enter()
			.append("text")
			.text(function(d,i){return d;})
			.attr("x",function(){return 300+rectWidth/2;})
		 	.attr("y",function(d,i){return 700-(rectHeight+padding)*i +rectHeight/5*3;})
			.attr("fill","black")
			.attr("font-family","Consolas")
			.attr("font-size","20px")
			.attr("text-anchor","middle")
			.attr("id",function(d,i){return "textIdx"+i;});

		stack.append("text")
			.text("top →")
			.attr("x",function(){return 300-rectWidth/2;})
		 	.attr("y",function(){return 700-(rectHeight+padding)*top +rectHeight/5*3;})
			.attr("fill","black")
			.attr("font-family","Consolas")
			.attr("font-size","20px")
			.attr("text-anchor","middle");
	
	}

	
	var mouseOver = function(d,i){
		//console.log(d3.select(this));
		d3.select("#rectIdx"+i)
		.attr("fill","#FA812F")
		.attr("width",rectWidth*1.1)
		.attr("height",rectHeight*1.1)
		.attr("transform","translate("+(-rectHeight*0.05)+","+(-rectWidth*0.05)+")");

		
		stack.append("text")
		.text(function(){return "stack["+i+"] = "+ stackData[i];})
		.attr("font-family","Consolas")
		.attr("font-size","20px")
		.attr("fill","black")
		.attr("id","arrInfo")
		.attr("x",function(){return 300+rectWidth*1.5;})
		.attr("y",function(){return 700-(rectHeight+padding)*i +rectHeight/5*3;})
		
	}

	var mouseOut = function(d,i){
		d3.select(this)
		.attr("fill","#FAAF08")
		.attr("width",rectWidth)
		.attr("height",rectHeight)
		.attr("transform","translate(0,0)");

		d3.select("#arrInfo").remove();
		
		
	}

	

	// function dragstarted(d) {
	//   d3.event.sourceEvent.stopPropagation();
	//   d3.select(this).classed("dragging", true);
	// }

	// function dragged(d) {
	//   d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
	// }

	// function dragended(d) {
	//   d3.select(this).classed("dragging", false);
	// }

	function zoomed() {
	//	console.log("zooom");
	 	container.attr("transform", d3.event.transform);
	}

	return {
		Push : Push,
		Pop : Pop,
		drawStack : drawStack
	};
}

var stackPush = function (_data){
	a.Push(_data.elements[0].value,function(){});
	//a.drawStack();
}

var stackPop = function(){
	a.Pop(function(){});
}

var a = new stack();
a.drawStack();
