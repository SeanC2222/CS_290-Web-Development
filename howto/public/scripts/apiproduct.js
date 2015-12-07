var proEx1 = document.getElementById("proEx1");
var proEx1Res = document.getElementById("proEx1Res");
var clearButton = document.createElement("input");
clearButton.type = "button";
clearButton.value = "Clear!";

clearButton.addEventListener('click', function(){
	proEx1Res.textContent = "";
	document.getElementById("proEx1Field").removeChild(clearButton);
});

proEx1.addEventListener('click', function(){
	var req = new XMLHttpRequest();
	req.open("POST", "/proEx", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400){
			var response = req.responseText
			proEx1Res.textContent += response;
		} else {
			proEx1Res.textContent = "Error.";
		}
	});
	req.send(JSON.stringify({"command":"proEx1"}));
	document.getElementById("proEx1Field").insertBefore(clearButton,proEx1);
});

var proEx2 = document.getElementById("proEx2");
var proEx2Res = document.getElementById("proEx2Res");
var clearButton2 = document.createElement("input");
clearButton2.type = "button";
clearButton2.value = "Clear!";

clearButton2.addEventListener('click', function(){
	proEx2Res.textContent = "";
	document.getElementById("proEx2Field").removeChild(clearButton2);
});

proEx2.addEventListener('click', function(){
	var req = new XMLHttpRequest();
	req.open("POST", "/proEx", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400){
			var response = req.responseText
			proEx2Res.textContent += response;
		} else {
			proEx2Res.textContent = "Error.";
		}
	});
	req.send(JSON.stringify({"command":"proEx2"}));
	document.getElementById("proEx2Field").insertBefore(clearButton2,proEx2);
});

var proEx3 = document.getElementById("proSubmitEx3");
var proNameEx3 = document.getElementById("proNameEx3");
var proEx3Res = document.getElementById("proEx3Res");
var clearButton3 = document.createElement("input");
clearButton3.type = "button";
clearButton3.value = "Clear!";

clearButton3.addEventListener('click', function(){
	proEx3Res.textContent = "";
	document.getElementById("proEx3Field").removeChild(clearButton3);
});

proEx3.addEventListener('click', function(){
	var req = new XMLHttpRequest();
	var search = proNameEx3.value;
	req.open("POST", "/proEx", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400){
			var productJSON = JSON.parse(req.responseText);
			var searchResults = [];
			for(var i in productJSON['objects']){
				var count = 0;
				if(productJSON['objects'][i]['title'] == proNameEx3.value){
					searchResults.push(JSON.stringify(productJSON['objects'][i]));
				}
			}
			if(searchResults[0] == null){
				proEx3Res.textContent += "No Exact Match Found.";
			}
			for(var i in searchResults){
				proEx3Res.innerHTML += searchResults[i] + "<br><br>";
			}
		} else {
			proEx3Res.textContent = "Error.";
		}
	});
	req.send(JSON.stringify({"command":"proEx3", "productName": proNameEx3.value}));
	document.getElementById("proEx3Field").insertBefore(clearButton3,proEx3);
});

var proEx4 = document.getElementById("proSubmitEx4");
var proNameEx4 = document.getElementById("proNameEx4");
var proEx4Res = document.getElementById("proEx4Res");
var clearButton4 = document.createElement("input");
clearButton4.type = "button";
clearButton4.value = "Clear!";

clearButton4.addEventListener('click', function(){
	proEx4Res.textContent = "";
	document.getElementById("proEx4Field").removeChild(clearButton4);
});

proEx4.addEventListener('click', function(){
	var req = new XMLHttpRequest();
	var search = proNameEx4.value;
	proEx4Res.textContent = "Working...";
	req.open("POST", "/proEx", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if (req.status >= 200 && req.status < 400){
			var productJSON = JSON.parse(req.responseText);
			var searchResults = [];
			for(var i in productJSON['objects']){
				var count = 0;
				if(productJSON['objects'][i]['title'] == proNameEx4.value){
					searchResults.push(productJSON['objects'][i]);
				}
			}
			if(searchResults[0] == null){
				proEx4Res.textContent += "No Exact Match Found.";
			} else {
				proEx4Res.innerHTML = "<br> Results: <br><br>";
				var priceCheck = function(sResults){
					console.log(sResults["id"]);
					var subReq = new XMLHttpRequest();
					subReq.open("POST", "/priEx", true);
					subReq.setRequestHeader('Content-Type', 'application/json');
					subReq.addEventListener('load', function() {
						if (subReq.status >= 200 && subReq.status < 400){
							var priceJSON = JSON.parse(subReq.responseText);
							proEx4Res.innerHTML += sResults["title"] + " Size: " + sResults["size"];
							proEx4Res.innerHTML += "<br>Price: " + priceJSON['objects'][0]["amount"] + "<br><br>";
						} else {
							proEx4Res.innerHTML += "Bad Search";
						}
					});
					subReq.send(JSON.stringify({"command":"priEx4", "productNumber": sResults["id"]}));
				};
				for(var j in searchResults){
					priceCheck(searchResults[j]);
				}
			}
		} else {
			proEx4Res.textContent = "Error.";
		}
	});
	req.send(JSON.stringify({"command":"proEx3", "productName": proNameEx4.value}));
	document.getElementById("proEx4Field").insertBefore(clearButton4,proEx4);
});


