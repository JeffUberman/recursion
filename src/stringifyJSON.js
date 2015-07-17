// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
    function isAllowed(tester){
    	if(typeof tester !== 'undefined' && typeof tester !== 'function' && tester !== null){
    		return true;
    	}
    }

    // check first for undefined / function and return
    if(typeof obj === 'undefined' || typeof obj === 'function'){
    	return;
    }
    if(obj === null){
    	return 'null';
    }
    //test if this object is already a string
    if (typeof obj === 'string'){
    	return '"' + obj + '"';
    }
    // test if this object is a number or boolean and stringify
    if (typeof obj === 'number' || typeof obj === 'boolean') {
        return obj.toString();
    }
    //test if this object is an array
    if(Array.isArray(obj)){
    		return '[' + obj.map(function(item){
    			return stringifyJSON(item);
    		}) + ']';
    }
    //test if non-array object
    if(typeof obj === 'object'){
    	//test if obj is empty
    	if(Object.keys(obj).length === 0){
    		return '{}';
    	}
    	var tempObj = '';
    	for(var i = 0; i < Object.keys(obj).length; i++){
    		//check if obj is allowed in JSON
    		if(isAllowed(stringifyJSON(Object.keys(obj)[i])) && isAllowed(stringifyJSON(obj[Object.keys(obj)[i]]))){
    			tempObj += stringifyJSON(Object.keys(obj)[i]) + ":" + stringifyJSON(obj[Object.keys(obj)[i]]);
	    		if(i != Object.keys(obj).length - 1){
	    			tempObj += ",";
	    		}	
    		} 
    		else {
    			//do nothing
    		}	    		
    	}
    	return "{" + tempObj + "}";
    }

    return;
}