var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var data = [3, 1, 4, 2];
var duration = 500;

var svg = d3.select(".canvas").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
svg.append('defs').append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -10 20 20')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
  .append('path')
	.attr("d", "M0,10 L10,0 L0,-10")
    .attr('fill', '#000');
	
node_make(data, 1);

 function endall(transition, callback) { 
    if (!callback) callback = function(){};
    if (transition.size() === 0) { callback() }
    var n = 0; 
    transition 
        .each(function() { ++n; }) 
        .each("end", function() { if (!--n) callback.apply(this); }); 
}

function node_make(d, opacity) {
	var nodes = svg.selectAll(".node").data(d);
	nodes.enter().append("rect")
		.attr("class", "node")
		.attr("x", function(d, i) { return i * 80; })
		.attr("y", 0)
		.attr("width", 30)
		.attr("height", 30)
		.style("opacity", opacity);
	
	var texts = svg.selectAll(".text").data(d);
	texts.enter().append("text")
		.attr("class", "text")
		.attr("x", function(d, i) { return i * 80 + 15; })
		.attr("y", 20)
		.attr("text-anchor", "middle")
		.text(function(d) { return d; })
		.style("opacity", opacity);
	
	var arrows = svg.selectAll(".arrow").data(d.slice(0, -1));
	arrows.enter().append("path")
		.attr("class", "arrow")
		.attr("transform", function(d, i) { return "translate(" + (i * 80) + ",15)" })
		.attr("d", "M40,0 L70,0")
		.style("marker-end", "url(#arrow)")
		.style("stroke", "black")
		.style("stroke-width", "3px")
		.style("opacity", opacity);
}

function add_node(idx, val, new_data)
{
	console.log("add node at " + idx + " with val " + val);
	
	if (idx < 0 || idx > data.length) {
		console.log("idx is invalid");
		return;
	}
	
	if (!new_data) {
		data.splice(idx, 0, val);
		new_data = data;
	}
	else {
		data = new_data;
	}	
	
	

	if (new_data.length - 1 === idx) {	// 맨 뒤. arrow, node 추가
		node_make(new_data, 0);
		
		var nodes = svg.selectAll(".node");
		var texts = svg.selectAll(".text");
		var arrows = svg.selectAll(".arrow");
		
		nodes.transition().duration(duration)
			.style("opacity", 1);
		texts.transition().duration(duration)
			.style("opacity", 1);
		arrows.transition().duration(duration)
			.style("opacity", 1);
	}
	else {	// node, arrow 추가
		var nodes = svg.selectAll(".node");
		var texts = svg.selectAll(".text");
		var arrows = svg.selectAll(".arrow");
		
		nodes.transition().duration(duration)
			.attr("x", function(d, i) { return i >= idx ? (i+1) * 80 : i * 80; });
		
		arrows.transition().duration(duration)
			.attr("transform", function(d, i) { return "translate(" + (i >= idx ? (i+1) * 80 : i * 80) + ",15)";});
		texts.transition().duration(duration)
			.attr("x", function(d, i) { return i >= idx ? (i+1) * 80 + 15 : i * 80 + 15; })
			.call(endall, function() {
				node_make(new_data, 1);
				
				nodes.style("opacity", function(d, i) { return i === idx ? 0 : 1; })
					.attr("x", function(d, i) { return i * 80; });
					
				texts.style("opacity", function(d, i) { return i === idx ? 0 : 1; })
					.attr("x", function(d, i) { return i * 80 + 15; })
					.text(function(d) { return d; });
					
				arrows.style("opacity", function(d, i) { return i === idx ? 0 : 1; })
					.attr("transform", function(d, i) { return "translate(" + (i * 80) + ",15)" });
					
				nodes = svg.selectAll(".node");
				texts = svg.selectAll(".text");
				arrows = svg.selectAll(".arrow");
				
				nodes.transition().duration(duration)
					.style("opacity", 1);
				texts.transition().duration(duration)
					.style("opacity", 1);
				arrows.transition().duration(duration)
					.style("opacity", 1);
			});
	}
}

function delete_node(idx, new_data)
{	
	console.log("delete node at " + idx);
	
	if (idx < 0 || idx >= data.length) {
		console.log("idx is invalid");
		return;
	}
	
	if (new_data) {
		data = new_data;
	}
	else {
		data.splice(idx, 1);
		new_data = data;
	}
	
	

	var nodes = svg.selectAll(".node");
	var texts = svg.selectAll(".text");
	var arrows = svg.selectAll(".arrow");
	

	
	if (new_data.length === idx) {	// 맨 뒤. arrow, node 삭제
		nodes.filter(function(d, i) { return i === idx; })
			.transition().duration(duration)
			.style("opacity", 0);
			
		texts.filter(function(d, i) { return i === idx; })
			.transition().duration(duration)
			.style("opacity", 0);
			
		arrows.filter(function(d, i) { return i === idx - 1; })
			.transition().duration(duration)
			.style("opacity", 0)
			.call(endall, function() {
				nodes.data(new_data).exit().remove();
				texts.data(new_data).exit().remove();
				arrows.data(new_data.slice(0, -1)).exit().remove();
			});
	}
	else {	// node, arrow 삭제
		nodes.filter(function(d, i) { return i === idx; })
			.transition().duration(duration)
			.style("opacity", 0);
			
		texts.filter(function(d, i) { return i === idx; })
			.transition().duration(duration)
			.style("opacity", 0);
			
		arrows.filter(function(d, i) { return i === idx; })
			.transition().duration(duration)
			.style("opacity", 0)
			.call(endall, function() {
				nodes.transition().duration(duration)
					.attr("x", function(d, i) { return i > idx ? (i-1) * 80 : i * 80; });
				texts.transition().duration(duration)
					.attr("x", function(d, i) { return i > idx ? (i-1) * 80 + 15 : i * 80 + 15; });
				arrows.transition().duration(duration)
					.attr("transform", function(d, i) { return "translate(" + (i > idx ? (i-1) * 80 : i * 80) + ",15)" })
					.call(endall, function() {
						nodes = nodes.data(new_data);
						texts = texts.data(new_data);
						arrows = arrows.data(new_data.slice(0, -1));
						
						nodes.style("opacity", 1)
							.attr("x", function(d, i) { return i * 80; });
						texts.style("opacity", 1)
							.attr("x", function(d, i) { return i * 80 + 15; })
							.text(function(d) { return d; });
						arrows.style("opacity", 1)
							.attr("transform", function(d, i) { return "translate(" + (i * 80) + ",15)" });
									
						nodes.exit().remove();
						texts.exit().remove();
						arrows.exit().remove();
					});
			});
	}
}

function highlight_node(idx) {
	console.log("highlight at " + idx);
	var nodes = svg.selectAll(".node");
	nodes.style("fill", function(d, i) { return i === idx ? "orange" : "white"; });
}

function highlight_off() {
	var nodes = svg.selectAll(".node");
	nodes.style("fill", "white");
}