var button = document.getElementById("testButton");
var newText = document.getElementById("clickMe");

document.body.style.backgroundColor = "white";

button.addEventListener('click', function(action){
	if (document.body.style.backgroundColor == "red"){
		
	} else { 
		document.body.style.backgroundColor = "red";
	}
});

