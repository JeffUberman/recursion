// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  //create an array outside of recursive function to store matching nodes
	var output = [];

	//create function to check for child nodes and, if present, recursively test them
	function classChecker (node) {
		
		//get list of child nodes, convert from NodeList to Array
		var nodeList = Array.prototype.slice.call(node.children);

		//iterate over child nodes (not sure why .filter() isn't working here)
		nodeList.forEach(function(branch){
		//test if className is present and pushing to output array if it is
			if(branch.classList.contains(className)){
				output.push(branch);
			}

		//if the node has a child node, recurse (not sure why .hasChildNodes() isn't working here)
			if(branch.children){
				classChecker(branch);
			}
		});

	}

	//call classChecker, checking the document node first
	classChecker(document);

	return output;	 	
};
