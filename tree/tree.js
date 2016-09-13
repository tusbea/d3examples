var m = [20, 80, 20, 80],
    weight = 800 - m[1] - m[3],
    height = 600 - m[0] - m[2],
    i = 0,
    root;
	
var duration = 1000;

var tree = d3.layout.tree()
    .size([weight, height]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.x, d.y]; });

var vis = d3.select("#body").append("svg:svg")
    .attr("width", weight + m[1] + m[3])
    .attr("height", height + m[0] + m[2])
  .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");


var root = {
 "val": "100",
 "children": [
  {
   "val": "200",
   "children": [
   ]
  },
  {
   "val": "300",
   "children": [
   ]
  }
 ]
};

root.x0 = height / 2;
root.y0 = 0;

update(root, duration);

// source : 마우스로 누른 node
function update(source, duration) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root)//.reverse();
	console.log(root);

  // Normalize for fixed-depth.
  var max_depth = 0, depth_con;
  nodes.forEach(function(d) { if (d.depth > max_depth) max_depth = d.depth; });
  depth_con = (height - 40) / max_depth;
  if (depth_con > 180)
	  depth_con = 180;
  nodes.forEach(function(d) { d.y = d.depth * depth_con; });

  // Update the nodes…
  // data()의 두 번째 인자는 key 함수.
  var node = vis.selectAll("g.node")
      .data(nodes, function(d) { return d.id || (d.id = ++i); });
	  
  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("svg:g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; });

  nodeEnter.append("svg:circle")
      .attr("r", 1e-6)
      .style("fill", "#fff");

  nodeEnter.append("svg:text")
      .attr("text-anchor", "middle")
	  .attr("alignment-baseline", "central")
      .text(function(d) //{ return d.val; })  
	  { return "val : " + d.val + ", id : " + d.id; })
      .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

	
	  
  nodeUpdate.select("circle")
      .attr("r", 20)
      .style("fill", "#fff");

  nodeUpdate.select("text")
      .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
      .remove();

  nodeExit.select("circle")
      .attr("r", 1e-6);

  nodeExit.select("text")
      .style("fill-opacity", 1e-6);

	  
  // Update the links…
  var link = vis.selectAll("path.link")
      .data(tree.links(nodes), function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("svg:path", "g")
      .attr("class", "link")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      })
    .transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition links to their new position.
  link.transition()
      .duration(duration)
      .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
      .duration(duration)
      .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      })
      .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

function change_canvas_size(w, h) {
	console.log("canvas size changed. width : " + w + ", height : " + h);
	
	width = w - m[1] - m[3];
	height = h - m[0] - m[2];
	
	tree.size([width, height]);
	
	update(root, 0);
	
	d3.select("#body").select("svg")
		.attr("width", weight + m[1] + m[3])
		.attr("height", height + m[0] + m[2]);
};

// id : Number, idx : Number, val : Number
function add_child(par_id, idx, val) {
	var nodes = tree.nodes(root);
	var i;
	for (i in nodes) {
		if (nodes[i].id === par_id)
			break;
	}
	var newNode = { "children": [] };
	newNode.val = val;
  newNode.parent = nodes[i];
	nodes[i].children.splice(idx, 0, newNode);
	update(nodes[i], duration);
}

function add_node(par_id, chd_id, idx, val) {
 var nodes = tree.nodes(root);
  var i;
  for (i in nodes) {
    if (nodes[i].id === par_id)
      break;
  }
}

function delete_node(id) {
	if (root.id === id) {
		console.log("cannot delete root node");
		return;
	}
	var par = find_par(root, id);
	if (!par) {
		console.log("no node with id " + id);
		return;
	}
	
	var i;
	for (i in par.children) {
		if (par.children[i].id === id)
			break;
	}
	
	par.children.splice(i, 1);
	update(par, duration);
}

function find_par(node, id) {
	if (node.id === id)
		return node.parent;
		
	var i, ret;
	for (i in node.children) {
		ret = find_par(node.children[i], id);
		if (ret)
			return ret;
	}
	
	return;
};