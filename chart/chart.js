

var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height * 0.95, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");



var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-12, 0])
    .html(function(d) {
        return "<span style='color:red'>" + d + "</span>";
    })

var svg = d3.select("div#canvas").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

var data = [];
var indexes;
var duration = 700;

// chart init
indexes = [];
for (var i = 0; i < data.length; i++) {
	indexes.push(i);
}

x.domain(indexes);
y.domain(d3.extent(data));

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) { return x(i); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d); })
    .attr("height", function(d) { return height - y(d); })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

svg.select(".x.axis")
	.selectAll("text")
	.style("font-size", function() { return (width / 80) + "px" });

// new_data가 undefined인 경우, data를 직접 swap하여 사용한다.
// new_data가 주어지면 해당 data를 사용한다.
function swap(i, j, new_data) {
	if (i === j) {
		console.log("i, j are equal");
		return;
	}
	
	var data_num = svg.selectAll(".bar")
		.data().length;
		
	if (i >= data_num || j >= data_num || i < 0 || j < 0) {
		console.log("index is not valid");
		return;
	}
	
	if (!new_data) {
		var temp = data[i];
		data[i] = data[j];
		data[j] = temp;
		new_data = data;
	}
	else {
		data = new_data;
	}
	
	var bar = svg.selectAll(".bar");
	bar.style("fill", function(d, idx) {
			if (idx == i || idx == j)
				return "orchid";
		})
		.transition()
		.duration(duration)
		.attr("x", function(d, idx) { 
			if (idx == i)
				return x(j);
			else if (idx == j)
				return x(i);
			else
				return x(idx);
		})
		.call(endall, function() {
			bar.data(new_data)
				.attr("x", function(d, idx) { return x(idx); })
				.attr("y", function(d) { return y(d); })
				.attr("height", function(d) { return height - y(d); })
				.style("fill", "orange");
		});
}

function change_canvas_size(w, h) {
	console.log("canvas size changed. width : " + w + ", height : " + h);
	
	width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;
	
	x.rangeRoundBands([0, width], .1);
	y.range([height * 0.95, 0]);
	
	xAxis.scale(x);
	
	d3.select("div#canvas").select("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom);
		
	svg.select(".x.axis").remove();
		
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
		
	svg.select(".x.axis")
		.selectAll("text")
		.style("font-size", function() { return (width / 80) + "px" });

	svg.selectAll(".bar")
		.attr("x", function(d, i) { return x(i); })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y(d); })
		.attr("height", function(d) { return height - y(d); });
};

 function endall(transition, callback) { 
    if (!callback) callback = function(){};
    if (transition.size() === 0) { callback() }
    var n = 0; 
    transition 
        .each(function() { ++n; }) 
        .each("end", function() { if (!--n) callback.apply(this); }); 
} 


function resize(size) {
  var temp = [];
  for (var i = 0; i < size; i++) {
    temp[i] = data[i];
    if (!temp[i]) temp[i] = 0;
  }
  data = temp;
  var indexes;
  var duration = 700;

  // chart init
  indexes = [];
  for (var i = 0; i < data.length; i++) {
    indexes.push(i);
  }

  x.domain(indexes);
  y.domain(d3.extent(data));


  svg.select(".x.axis").remove();
    
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.select(".x.axis")
    .selectAll("text")
    .style("font-size", function() { return (width / 80) + "px" }); 


  svg.selectAll(".bar").remove();

  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) { return x(i); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d); })
    .attr("height", function(d) { return height - y(d); })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
}


function setData(idx, value) {
  data[idx] = value;
  y.domain(d3.extent(data));

  var bar = svg.selectAll(".bar");
  bar.data(data)
    .transition()
    .duration(300)
    .attr("x", function(d, idx) { return x(idx); })
    .attr("y", function(d) { return y(d); })
    .attr("height", function(d) { return height - y(d); })
    .style("fill", "orange");
}

function highlight(idx) {
  var bar = svg.selectAll(".bar");
  bar.data(data)
    .style("fill", function (d, i) {
      if (i == idx) return 'red';
      return 'orange';
    }); 
}