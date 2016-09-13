
function GraphModule(){
	var svgContainer = d3.select("body")
	.append("svg")
	.attr("width", 200)
	.attr("height", 200);
	
	var makeNode = function(id, x, y, size, color, shape){
		//var circle = svgContainer.selectAll("circle")
		//console.log(svgContainer)
		
		//make circle part
		if(shape === "circle"){
			var circleAttributes = svgContainer
			.append("circle")
			.attr("id", "node" + id)
			.attr("cx", x)
			.attr("cy", y)
			.attr("r", size)
			.attr("node_x", x)
			.attr("node_y", y)
			.attr("size", size)
			.attr("fill", color);
			
			// circle text expression part

		}
		
		if(shape === "rect"){
			size /= 1.2;
			var rectAttributes = svgContainer
			.append("rect")
			.attr("id", "node" + id)
			.attr("x", x-size)
			.attr("y", y-size)
			.attr("size", size)
			.attr("node_x", x)
			.attr("node_y", y)
			.attr("width", size*2)
			.attr("height", size*2)
			.attr("fill", color);
		}
		
		var nodeText = svgContainer
			.append("text")
			.attr("id", "node_text" + id)
			.attr("dx", x-5)	
			.attr("dy", y+5)
			.attr("fill", "black")
			.text(id);
	}
	
	//draw edge a to b
	
	var drawArrow = function(a, b){	
		var a_node = d3.select("#node" + a);
		var b_node = d3.select("#node" + b);
		var a_x = a_node.attr("node_x");  // arrow start point_x
		var a_y = a_node.attr("node_y");   
		var b_x = b_node.attr("node_x");  // arrow end point_x
		var b_y = b_node.attr("node_y");
		var a_size = a_node.attr("size");
		var b_size = b_node.attr("size");
		var theta = Math.acos ( (b_x - a_x) / ( Math.sqrt( (b_x - a_x) * (b_x - a_x) + (b_y - a_y) * (b_y - a_y) ) ) )  * 180 / Math.PI;
		var sum_2string = function(a, b){ return String( Number(a) + Number(b) ) ;};
		var dec_2string = function(a, b){ return String( Number(a) - Number(b) ) ;};
		var margin_x = 5;
		var margin_y = 5;
		
		if(Number(a_x) === Number(b_x)) margin_x = 0;
		else if(Number(a_x) < Number(b_x)) margin_x = Number(a_size) / 1.5;
		else margin_x = -1*Number(a_size) / 1.5;
		
		if(Number(a_y) === Number(b_y)) margin_y = 0;
		else if(Number(a_y) < Number(b_y)) margin_y = Number(a_size) / 1.5;
		else margin_y = -1*Number(a_size) / 1.5;
		
		console.log(a_y);
		a_x = sum_2string(a_x, margin_x);
		a_y = sum_2string(a_y, margin_y);
		
		b_x = dec_2string(b_x, margin_x);
		b_y = dec_2string(b_y, margin_y);
		
		console.log(a_y);
		/* 애로우 원 밖으로 맞추기	
		a_x = String ( Number(a_x) + Number( a_size * Math.cos(theta) ) );
		a_y = String ( Number(a_y) + Number( a_size * Math.sin(theta) ) );
		b_x = String ( Number(b_x) - Number( b_size * Math.cos(theta) ) );
		b_y = String ( Number(b_y) - Number( b_size * Math.sin(theta) ) );
		*/
		
		
		defs = svgContainer.append("defs")

		defs.append("marker")
		.attr("id", "arrow")
		.attr("viewBox", "0 -5 10 10")
		.attr("refX", 5)
		.attr("refY", 0)
		.attr("markerWidth", 4)
		.attr("markerHeight", 4)
		.attr("orient", "auto")
		.append("path")
		.attr("d", "M0,-5L10,0L0,5");
		
	
		//Draw the line
		var line = svgContainer.append("line")
		.attr("marker-end", "url(#arrow)")
		.attr("id", "line"+a+b)
		.attr("x1", a_x)
		.attr("y1", a_y)
		.attr("x2", b_x)
		.attr("y2", b_y)
		.attr("stroke-width", 2)
		.attr("stroke", "black");

		/*		
		var arrow = d3.select("svg").append("path") 
		.attr("class", "arrow")
		.attr("d", function(d) { return 'M 50 130 L 200 130 L 125 242 z'; } )
		.attr("")
		*/	
	

	}
	


	return {
		drawArrow : drawArrow,
		makeNode : makeNode
	};
	
}

var a = new GraphModule();
//var makeNode = function(id, x, y, radius, color, shape){
a.makeNode(1, 30, 30, 20, "green", "circle");
a.makeNode(2, 70, 70, 20, "green", "rect");
a.makeNode(3, 140, 140, 20, "green", "rect");

a.makeNode(4, 180, 70, 20, "green", "rect");
a.makeNode(5, 70, 180, 20, "green", "rect");
a.makeNode(6, 190, 180, 20, "green", "rect");
a.makeNode(7, 70, 220, 20, "green", "rect");
a.drawArrow(1, 2);
/*
a.drawArrow(2, 3);
a.drawArrow(3, 4);
a.drawArrow(3, 5);
a.drawArrow(5, 6);
a.drawArrow(5, 7);
a.drawArrow(7, 5);
a.drawArrow(5, 3);
*/
/*)
	var redraw = function(array){
		var text2 = container.selectAll("text.arr1").data(array).enter().append("text").text(function(d){return d;}).attr("x",100).attr("y",function(d,i){return 50+i*100});
		text2.transition().duration(1000).attr("opacity",100).remove();
		text2.exit();
	}
*/