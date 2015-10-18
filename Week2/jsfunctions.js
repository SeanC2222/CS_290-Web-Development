var x="\nThis is my output string for my first function\n";

testFunction(x);

function testFunction(input){
	console.log(input);
}

//newFunct(); Does not work!!!! Variable is not initialized yet.

var newFunct = function() {
	console.log("This is my second function that displays 10 rows:");
	for (var i = 1; i <= 10; i++){
		console.log("This is row " + i);
	}
}

newFunct();
