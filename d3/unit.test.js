QUnit.module("unit.test.js", function (hooks) {


	function ArrayModule(){
		var value = [];
		var fontColor = [];
		var backgroundColor = [];


		var Concat = function(_value){
			value = value.concat(_value);
		};

	
		var Push = function(_value, _fontColor, _backgroundColor){
			value.push(_value);
			fontColor.push(_fontColor);
			backgroundColor.push(_backgroundColor);
		};

		var getValue = function(idx){

			return value[idx];
		};
		
	/*	var drawArray = function(section){
			var svg = d3.select(section).append("svg");
			var text = svg.selectAll("text._text")
						.data(value)
						.enter()
						.append("text")
						.text(function(d,i){
							return d;
						});
						//.text(fuctiond(d,i){return d});
		};
*/

		var InsertionSort = function(){
			var temp;
			var i;
			var j;
			var len = value.length;
			
			for(i = 1; i < len; i++){
				temp = value[i];
				j = i-1;
				while((temp < value[j]) && (j>=0)){
					value[j+1] = value[j];
					j = j-1;
				}

				value[j+1] = temp;
			}

		}

		
		return {
			getValue : getValue,
			Push : Push,
			Concat : Concat,
			InsertionSort : InsertionSort
		//	drawArray : drawArray
		};
	}
	
	QUnit.test( "hello test", function( assert ) {
		var a = new ArrayModule();
		var a2 = new ArrayModule();
		assert.ok("hello"===1);
		var arr = [5,4,3,2,1];
		a.Concat(arr);
		assert.ok(a.getValue(4)=== 1);
		console.log(a);

		a.InsertionSort();
		assert.ok(a.getValue(0)== 1);
		assert.ok(a.getValue(1)== 2);
		assert.ok(a.getValue(2)== 3);
		assert.ok(a.getValue(3)== 4);
		assert.ok(a.getValue(4)== 5);
		/*
		console.log(a);
		console.log(a2);
		
		a.Push(1,"red","white");
		a2.Push(2,"black","blue");
		var t = a.getValue(0);
		assert.ok(a.getValue(0) === 1);
		t = 2 ;
		assert.ok(t=== 2);
		assert.ok(a.getValue(0) === 2);

		assert.ok(a2.getValue(0) === 2);
		*/
		//a.Push({5,4,3,2,1});
		//assert.ok(a.getvalue[0] === 5);
		//console.log(a);
	});


});


