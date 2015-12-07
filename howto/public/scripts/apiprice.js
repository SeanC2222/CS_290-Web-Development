var priEx1 = document.getElementById("priEx1");
var priEx1Res = document.getElementById("priEx1Res");
var clearButton = document.createElement("input");
clearButton.type = "button";
clearButton.value = "Clear!";

clearButton.addEventListener('click', function(){
	priEx1Res.textContent = "";
	document.getElementById("priEx1Field").removeChild(clearButton);
});

priEx1.addEventListener('click', function(){
	var req = new XMLHttpRequest();
	req.open("POST", "/priEx", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400){
			var response = req.responseText
			priEx1Res.textContent = response;
		} else {
			priEx1Res.textContent = "Error.";
		}
	});
	req.send(JSON.stringify({"command":"priEx1"}));
	document.getElementById("priEx1Field").insertBefore(clearButton,priEx1);
});

var priEx2 = document.getElementById("priSubmitEx2");
var priEx2Res = document.getElementById("priEx2Res");

var clearButton2 = document.createElement("input");
clearButton2.type = "button";
clearButton2.value = "Clear!";

clearButton2.addEventListener('click', function(){
	priEx2Res.textContent = "";
	document.getElementById("priEx2Field").removeChild(clearButton2);
});

priEx2.addEventListener('click', function(){
	var req = new XMLHttpRequest();
	req.open("POST", "/priEx", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400){
			var response = req.responseText
			priEx2Res.textContent = response;
		} else {
			priEx2Res.textContent = "Error.";
		}
	});
	req.send(JSON.stringify({"command":"priEx2"}));
	document.getElementById("priEx2Field").insertBefore(clearButton2,priEx2);
});

var priEx3 = document.getElementById("priSubmitEx3");
var priEx3Res = document.getElementById("priEx3Res");

var clearButton3 = document.createElement("input");
clearButton3.type = "button";
clearButton3.value = "Clear!";

clearButton3.addEventListener('click', function(){
	priEx3Res.textContent = "";
	document.getElementById("priEx3Field").removeChild(clearButton3);
});

priEx3.addEventListener('click', function(){
	var req = new XMLHttpRequest();
	req.open("POST", "/priEx", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400){
			var response = req.responseText
			priEx3Res.textContent = response;
		} else {
			priEx3Res.textContent = "Error.";
		}
	});
	req.send(JSON.stringify({"command":"priEx3"}));
	document.getElementById("priEx3Field").insertBefore(clearButton3,priEx3);
});

var priEx4 = document.getElementById("priSubmitEx4");
var priEx4Product = document.getElementById("priProductEx4");
var priEx4Res = document.getElementById("priEx4Res");

var clearButton4 = document.createElement("input");
clearButton4.type = "button";
clearButton4.value = "Clear!";

clearButton4.addEventListener('click', function(){
	priEx4Res.textContent = "";
	document.getElementById("priEx4Field").removeChild(clearButton4);
});

priEx4.addEventListener('click', function(){
	var req = new XMLHttpRequest();
	req.open("POST", "/priEx", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400){
			var response = req.responseText
			priEx4Res.innerHTML += response + "<br><br>";
		} else {
			priEx4Res.textContent = "Error.";
		}
	});
	
	req.send(JSON.stringify({"command":"priEx4", "productNumber": priEx4Product.value}));
	document.getElementById("priEx4Field").insertBefore(clearButton4,priEx4);
});

