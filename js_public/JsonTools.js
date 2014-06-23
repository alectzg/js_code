/**
   JSON分析解析（未详测）
**/
var jsonTools={
    parse:function(jsonString,context){
	  var _this=context;
	  if(_this==null)
		_this=this;
	  var blockStack=[];
	  var retObject=null;
	  var segement="";
	  jsonString=jsonString.replace(/^\s+|\s+$/g,"");
	  var key="";
	  if(/\{/.test(jsonString)&&!/\\\{/.test(jsonString)){
		 retObject={};
		 jsonString=jsonString.replace(/^\s+|\s+$/g,"");
		 blockStack.push(jsonString.replace(/^(.).*$/,"$1"));
		 while(blockStack.length>0){
			 jsonString=jsonString.replace(/^./,"")
			 key=jsonString.replace(/^([^:]+:).*$/,"$1");
			 key=key.replace(/:/,"").replace(/^\s*|\s*$/g,"").replace(/^'|'$/g,"").replace(/^"|"$/g,"");
			 //debugger
			 jsonString=jsonString.replace(/^[^:]+:(.*)$/g,"$1").replace(/^\s+|\s+$/g,"");
			 var segement=_this.searchSegement(jsonString);
			 jsonString=jsonString.substring(segement.length);
			 retObject[key]=arguments.callee(segement,_this);
			 if(jsonString.replace(/^\s+|\s+$/g,"").replace(/^,/,"").replace(/^(.).*$/,"$1")=="}"){
			    blockStack.pop();
				break;
			}
			 jsonString=jsonString.replace(/^\s+|\s+$/g,"").replace(/^,/,"");
		 }
		 return retObject;
	  }else if(/\[/.test(jsonString)&&!/\\\[/.test(jsonString)){
		 //debugger
		 retObject=[];
		 segement=jsonString.replace(/^\[|\]$/g,"");
		 while(segement.length>0){
			var tokSeg=_this.searchSegement(segement);
			retObject.push(arguments.callee(tokSeg,_this));
			segement=segement.substring(tokSeg.length).replace(/^\s*,/,"").replace(/\s+|\s+$/g,"").replace(/^,/,"");
		 }
		 return retObject;
	  }else
	  {
		if(jsonString.indexOf("'")==0){
		  return jsonString.replace(/^'|'$/g,"");
		} 
		if(jsonString.indexOf('"')==0){
		  return jsonString.replace(/^"|"$/g,"");
		}
		return jsonString;
	  }
	},
	searchSegement:function(jsonSegement){
	  jsonSegement = jsonSegement.replace(/^\s+|\s+$/, "");
	    if(!/^("|'|\{|\[)/.test(jsonSegement))
			return jsonSegement.replace(/^([^\{\[,]+).*$/,"$1");
		var blockStack = [];
		var curPoint = "";
		blockStack.push(jsonSegement.replace(/^(.).*$/,"$1"));
		curPoint = blockStack[0];
		jsonSegement = jsonSegement.replace(/^./, "");
		var findSegement = [curPoint];
		var tmpSegement = "";
		var tempTokenizer = "";
		while (blockStack.length > 0) {
		    jsonSegement=jsonSegement.replace(/^\s+|\s+$/g,"");
			if(/^("|'|\}|\])/.test(jsonSegement)){
			  tempTokenizer=jsonSegement.replace(/^(.).*$/,"$1");
			}else if(/^,/.test(jsonSegement)){
			  tempTokenizer=jsonSegement.replace(/^(.).*$/,"$1");
			  jsonSegement=jsonSegement.replace(/^./,"");
			  findSegement.push(tempTokenizer);
			  continue;
			}else{
				tmpSegement = jsonSegement.replace(/^([^\'\"\{\[\]\}]+).*$/g, "$1");
				findSegement.push(tmpSegement);
				jsonSegement = jsonSegement.replace(/^[^\'\"\{\[\]\}]+/g, "").replace(/^\s+/, "");
				tempTokenizer = jsonSegement.replace(/^(.).*$/,"$1");	
			}
			findSegement.push(tempTokenizer);
			jsonSegement=jsonSegement.replace(/^./,"");
		
			//console.info(tempTokenizer+" >> "+curPoint);
			//console.info("jsonSegement:"+jsonSegement);
			////debugger
			if ((tempTokenizer == "\"" && curPoint == "\"") || ( tempTokenizer == "}" && curPoint == "{") || (tempTokenizer == "]" && curPoint == "[") || (tempTokenizer == "'" && curPoint == "'")) {
				blockStack.pop();
			//	console.info("pop stack")
			} else {
				blockStack.push(tempTokenizer);
			}
			if (blockStack.length > 0)
				curPoint = blockStack[blockStack.length - 1];
		}
		return findSegement.join("");
	},
	//将js object 转化成json字串!
	 dump:function(jsObject){
		 if (typeof jsObject!="object"){
			 return "'"+jsObject+"'";
		 }else if (jsObject instanceof Array){
			 return " [ '"+jsObject.join("','")+" ']";
		 }
		 var jsonSection="{ ";
		 for(var item in jsObject){
			if (typeof jsObject[item]=="function")
				continue;
			else 
			  jsonSection=jsonSection+"\'"+item+"':";
			  var destObj=jsObject[item]
			  jsonSection=jsonSection+arguments.callee(destObj)+","
		 }
		 jsonSection=jsonSection.replace(/,$/,"")+"}";
		 return jsonSection;
   },
   //参照jquery内部解析json
	parse_reference:function( data ) {

		if ( typeof data !== "string" || !data ) {

			return null;

		}



		// Make sure leading/trailing whitespace is removed (IE can't handle it)

		data = jsPublic.trim( data );

		

		// Make sure the incoming data is actual JSON

		// Logic borrowed from http://json.org/json2.js

		if ( /^[\],:{}\s]*$/.test(data.replace(/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, "@")

			.replace(/"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, "]")

			.replace(/(?:^|:|,)(?:\s*\[)+/g, "")) ) {



			// Try to use the native JSON parser first

			return window.JSON && window.JSON.parse ?

				window.JSON.parse( data ) :

				(new Function("return " + data))();



		} else {

			jsPublic.error( "Invalid JSON: " + data );

		}

	}
}

var jsPublic={
	trim:function(data){
		if ( typeof data !== "string" || !data ) {

				return null;

			}
		return data.replace(/^\s+|\s+$/g,"");
	},
	error:function(data){
		throw new Error("error");
	}
}