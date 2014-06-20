/**
  这个分析树有问题。。
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
			 debugger
			 jsonString=jsonString.replace(/^[^:]+:(.*)$/g,"$1").replace(/^\s+|\s+$/g,"");
			 var segement=_this.searchSegement(jsonString);
			 jsonString=jsonString.substring(segement.length);
			 retObject[key]=arguments.callee(segement);
			 if(jsonString.replace(/^\s+|\s+$/g,"").replace(/^,/,"").replace(/^(.).*$/,"$1")=="}"){
			    blockStack.pop();
				break;
			}
			 jsonString=jsonString.replace(/^\s+|\s+$/g,"").replace(/^,/,"");
		 }
		 return retObject;
	  }else if(/\[/.test(jsonString)&&!/\\\[/.test(jsonString)){
		 retObject=[];
		 segement=jsonString.replace(/^\[|\]$/,"");
		 while(segement.length>0){
			var tokSeg=_this.searchSegement(segement);
			retObject.push(argument.callee(tokSeg,_this));
			segement=segement.substring(tokSeg.length-1).replace(/^\s*,/,"").replace(/\s+|\s+$/g,"").replace(/^,/,"");
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
	    if(!/^"|'|\{|\[/.test(jsonSegement))
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
			tmpSegement = jsonSegement.replace(/^([^\'\"\{\[\]\}]+).*$/g, "$1");
			findSegement.push(tmpSegement);
			jsonSegement = jsonSegement.replace(/^[^\'\"\{\[\]\}]+/g, "").replace(/^\s+/, "");
			tempTokenizer = jsonSegement.replace(/^(.).*$/,"$1");
            findSegement.push(tempTokenizer);
			jsonSegement=jsonSegement.replace(/^./,"");
		
			//console.info(tempTokenizer+" >> "+curPoint);
			//console.info("jsonSegement:"+jsonSegement);
			//debugger
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
	}
}