var stoEx1 = document.getElementById("stoEx1");
var stoEx1Res = document.getElementById("stoEx1Res");
var clearButton = document.createElement("input");
clearButton.type = "button";
clearButton.value = "Clear!";

clearButton.addEventListener('click', function(){
	stoEx1Res.textContent = "";
	document.getElementById("stoEx1Field").removeChild(clearButton);
});

stoEx1.addEventListener('click', function(){
	var req = new XMLHttpRequest();
	req.open("POST", "/stoEx", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400){
			var response = req.responseText
			stoEx1Res.textContent += response;
		} else {
			stoEx1Res.textContent = "Error.";
		}
	});
	req.send(JSON.stringify({"command":"stoEx1"}));
	document.getElementById("stoEx1Field").insertBefore(clearButton,stoEx1);
});

var stoEx2 = document.getElementById("stoEx2");
var stoEx2Res = document.getElementById("stoEx2Res");
var stoSubmitEx2 = document.getElementById("stoSubmitEx2");
var clearButton2 = document.createElement("input");
clearButton2.type = "button";
clearButton2.value = "Clear!";

clearButton2.addEventListener('click', function(){
	stoEx2Res.innerHTML = "";
	document.getElementById("stoEx2Field").removeChild(clearButton2);
});

stoSubmitEx2.addEventListener('click', function(){
	var searchRequest = stoEx2.value;
	var req = new XMLHttpRequest();
	req.open("POST", "/stoEx", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			var searchAnswers = [];
			for(var i in response["objects"]){
				if (response["objects"][i]["county"] == searchRequest){
					searchAnswers.push(response["objects"][i]);
				}
			}
			for(var i in searchAnswers){
				stoEx2Res.innerHTML += JSON.stringify(searchAnswers[i]) + "<br><br>";
			} 
		} else {
			stoEx1Res.textContent = "Error.";
		}
	});
	req.send(JSON.stringify({"command":"stoEx2"}));
	document.getElementById("stoEx2Field").insertBefore(clearButton2,stoEx2);
});

