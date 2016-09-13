

function hash(){


    var zoom = d3.zoom()
    .scaleExtent([0.1,10])
    .on("zoom",zoomed);

	var container = d3.select("#section1")
	.append("svg")
	.attr("width",1000)
	.attr("height",800)
	.attr("id","container")
	.append("g");
   	



	var MAX_TABLE = 4096
	var hash;
	var hashTable = [];
	
	var top = -1;
	var rectWidth = 200;
	var rectHeight = 500/MAX_TABLE;

	var padding = 250/MAX_TABLE;

	var init = function(){
		for(var i = 0; i < MAX_TABLE; i++){
			hashTable.push({key: "", data:""});
		}
	}

	var getHash = function(str){
		var h = 5381;
		for(var i = 0; i < str.length; i++){
			h  = (((h <<5) + h)+str[i].charCodeAt(0))%MAX_TABLE;
		}

		return h;
	}

	var find = function(key, data){
		var h = getHash(key);
		var cnt = MAX_TABLE;
		console.log(hashTable[h]);
		while( hashTable[h].key.length && cnt--){
			if( hashTable[h].key == key){
				console.log("find"+h);
				d3.select("#hashInfo"+h)
				.transition()
				.attr("font-size","20px")
				.attr("fill","#011A27");

				d3.select("#hashInfo"+h)
				.transition()
				.attr("font-size","12px")
				.attr("fill","#1995AD")
				.delay(1000);
				return 
			}
			h = (h+1)%MAX_TABLE;
		}
		
		hash.append("text")
		.text("not Find")
		.attr("x",100)
		.attr("y",300)
		.attr("font-family","Consolas")
		.attr("font-size","20px")
		.attr("fill","#004445")
		.attr("id","message");

		console.log(d3.select("#message"));
		d3.select("#message")
		.transition()
		.attr("font-size","30px")
		.delay(300);

		setTimeout(function(){
			d3.select("#message").remove();
		},1500);
		//d3.select("#message").remove();
		
		return 0;

	}


	var add = function(key, data){
		var h = getHash(key);

		while( hashTable[h].key.length){
			if( hashTable[h].key == key)
				return 0;
			h = (h+1)%MAX_TABLE;
		}

		hashTable[h].key = key;
		hashTable[h].data = data;
		console.log("asdadad");
		console.log(h);
		drawHash();
		return 1;
	}

	
	var drawHash = function(){
		
		if( hash !== undefined){
			hash.remove().exit();
		}

		if(hashTable.length === 0)
			return ;
		d3.selectAll("#container").call(zoom);


		hash = container.append("g");
		hash.selectAll("g.rect")
			.data(hashTable)
			.enter()
			.append("rect")
			.attr("x",300)
			.attr("y",function(d,i){return 30+(rectHeight+padding)*i;})
			.attr("width",function(d,i){if(hashTable[i].key.length) return rectWidth*1.01;
				else return rectWidth;})
			.attr("height",function(d,i){if(hashTable[i].key.length)return rectHeight*10;
				else return rectHeight;})
			.attr("rx",10)
			.attr("ry",10)
			.attr("fill",function(d,i){ if( hashTable[i].key.length) return "#011A27";
				else return "#FFCCAC";})
			.attr("id",function(d,i){return "rectIdx"+i;})
			.attr("opacity",1.0)
			.on("mouseover",mouseOver)
			.on("mouseout",mouseOut);

		for(var i = 0; i < MAX_TABLE; i++){
			if( hashTable[i].key.length){
				console.log("draw"+i);
				hash.append("text")
					.text(function(){
						var str = "Hash["+ i +"] : " ;
						if( hashTable[i].key !== undefined)
							str += "key = "+hashTable[i].key;
						
						
						if( hashTable[i].data !== undefined)
							str += " , data = "+ hashTable[i].data;


						return str;
					})
					.attr("font-family","Consolas")
					.attr("font-size","12px")
					.attr("fill","#1995AD")
					.attr("id",function(){return "hashInfo"+i})
					.attr("x",function(){return 300+rectWidth*1.1;})
					.attr("y",function(){return 30+(rectHeight+padding)*i+rectHeight*50});
			}
		}
	
	}

	
	var mouseOver = function(d,i){
		//console.log(d3.select(this));
		d3.select("#rectIdx"+i)
		.attr("fill","#C60000")
		.attr("width",rectWidth*1.01)
		.attr("height",rectHeight*10)
		.attr("transform","translate("+(-rectHeight*5)+","+(-rectWidth*0.005)+")");

		
		hash.append("text")
		.text(function(){
			var str = "Hash["+ i +"] : " ;
			if( hashTable[i].key !== undefined)
				str += "key = "+hashTable[i].key;
			
			
			if( hashTable[i].data !== undefined)
				str += " , data = "+ hashTable[i].data;


			return str;})
		.attr("font-family","Consolas")
		.attr("font-size","15px")
		.attr("fill","black")
		.attr("id","arrInfo")
		.attr("x",function(){return 300+rectWidth*1.1;})
		.attr("y",function(){return 30+(rectHeight+padding)*i+rectHeight*50})
		
	}

	var mouseOut = function(d,i){
		d3.select(this)
		.attr("fill","#FAAF08")
		.attr("width",rectWidth)
		.attr("height",rectHeight)
		.attr("transform","translate(0,0)");

		d3.select("#arrInfo").remove();
		
		
	}



	function zoomed() {
	//	console.log("zooom");
	 	container.attr("transform", d3.event.transform);
	}

	return {
		init : init,
		getHash : getHash,
		Find : find,
		Add : add,
		drawHash : drawHash
	};
}

var add = function (_data){
	// console.log(_data.elements[0].value);
	// console.log(_data.elements[1].value);
	// a.Push(_data.elements[0].value,function(){});
	//console.log(add);
	a.Add(_data.elements[0].value,_data.elements[1].value);
	//a.drawHash();
}

var find = function(_data){
	console.log("find");
	a.Find(_data.elements[0].value,_data.elements[1].value);
}

var a = new hash();
a.init();
a.drawHash();
