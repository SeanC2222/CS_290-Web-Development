var dataTable = document.getElementById("dataTable").children[0];
var resetStatus = document.getElementById("resetStatus");

var changeToInput = function(row){
	var cur = {};
	cur.curDate = row.children[1];
	cur.curName = row.children[2];
	cur.curWeight = row.children[3];
	cur.curLbs = row.children[4];
	cur.curReps = row.children[5];

	for(var i in cur){
		cur[i].innerHTML = "<input class=\"editInput\" type=\"text\" value=\"" + cur[i].textContent + "\">";
//		for(var j in row.children)
	}
};

var inDate = document.getElementById("inputDate");
var inName = document.getElementById("inputExercise");
var inWeight = document.getElementById("inputWeight");
var inLBS = document.getElementById("inputLbs");
var inReps = document.getElementById("inputReps");
var inSubmit = document.getElementById("inputSubmit");

inSubmit.addEventListener('click', function(){
	var input = {};
	input.command = "INSERT";
	input.name = inName.value;
	input.reps = inReps.value;
	input.weight = inWeight.value;
	input.date = inDate.value;
	input.lbs = inLBS.checked;

	var req = new XMLHttpRequest();
	req.open("POST", "/updateData", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			if(response.answer == "S"){
				inName.value = "";
				inReps.value = 0;
				inWeight.value = 0;
				var inHTML = "<input type=\"hidden\" id=" + response.id + ">"
					   + "<td>" + input.date + "</td>"
					   + "<td>" + input.name + "</td>"
					   + "<td>" + input.weight + "</td>"
					   + "<td>";
				if(input.lbs){
					inHTML += "lbs";
				} else {
					inHTML += "kgs";
				}
				inHTML +=    "</td>"
					   + "<td>" + input.reps + "</td>"
					   + "<td><input type=\"button\" value=\"Edit\" id=\"editButton" + response.id
					   + "\"></td>"
					   + "<td><input type=\"button\" value=\"Delete\" id=\"deleteButton" + response.id
					   + "\"></td>";

				var newRow = document.createElement("tr");
				newRow.innerHTML = inHTML;
				dataTable.appendChild(newRow);

				var tempRow = dataTable.children[dataTable.children.length-1];
				var tempButton = tempRow.children[7].children[0];
				tempButton.addEventListener('click', function(button, row){
					return function(){
						var uniqueRequest = new XMLHttpRequest();
						uniqueRequest.open("POST", "/updateData", true);
						uniqueRequest.setRequestHeader('Content-Type', 'application/json');
						uniqueRequest.addEventListener('load', function(){
							if(uniqueRequest.status >= 200 && uniqueRequest.status < 400){
								var response = JSON.parse(uniqueRequest.responseText);
								if(response['answer'] == "S"){
									var uniqueButton = button;
									var uniqueRow = row;
									uniqueRow.parentNode.removeChild(uniqueRow);
								} else {
									console.log("Failure to delete from database.");
								}
							} else {
								console.log("Request Failure");
							}
						
						});
						var uniqueID = row.children[0].id;
						uniqueRequest.send(JSON.stringify({"command":"DELETE", "id":uniqueID}));
					};
				}(tempButton, tempRow));
				
				var tempButton2 = tempRow.children[6].children[0];
				tempButton2.addEventListener('click', function(row){
					return function(){
						var uniqueID = row.children[0].id;
						window.location = "http://www.sean-mulholland.com:3001/editPage/?id=" + uniqueID;
					};
				}(tempRow));
			} else {
				console.log("Database submission failure.");
			}
		} else {
			console.log("Issue with server request.");
		}
	});
	resetStatus.textContent = "";
	req.send(JSON.stringify(input));
});

var resetButton = document.getElementById("resetTable");

resetButton.addEventListener('click', function(){
	var resRequest = new XMLHttpRequest();
	resRequest.open("GET", "/reset-table", true);
	resRequest.addEventListener('load', function(){
		var resStatus = document.getElementById("resetStatus");
		if(resRequest.status >= 200 && resRequest.status < 400){
			var response = JSON.parse(resRequest.responseText);
			if(response['answer'] == "S"){
				resStatus.textContent = "Database table reset";
				for(var i = dataTable.children.length-1; i >= 1; i--){
					dataTable.removeChild(dataTable.children[i]);
				}
			} else {
				resStatus.textContent = "Table not reset. Server side error.";
			}
		} else {
			resStatus.textContent = "Table reset request error.";
		}
	});
	resRequest.send();
});

for(var i = 1; i < dataTable.children.length; i++){
	var tempRow = dataTable.children[i];
	var tempButton = tempRow.children[7].children[0];
	tempButton.addEventListener('click', function(button, row){
		return function(){
			var uniqueRequest = new XMLHttpRequest();
			uniqueRequest.open("POST", "/updateData", true);
			uniqueRequest.setRequestHeader('Content-Type', 'application/json');
			uniqueRequest.addEventListener('load', function(){
				if(uniqueRequest.status >= 200 && uniqueRequest.status < 400){
					var response = JSON.parse(uniqueRequest.responseText);
					if(response['answer'] == "S"){
						var uniqueButton = button;
						var uniqueRow = row;
						uniqueRow.parentNode.removeChild(uniqueRow);
					} else {
						console.log("Failure to delete from database.");
					}
				} else {
					console.log("Request Failure");
				}
			
			});
			var uniqueID = row.children[0].id;
			uniqueRequest.send(JSON.stringify({"command":"DELETE", "id":uniqueID}));
		};
	}(tempButton, tempRow));
	var tempButton2 = tempRow.children[6].children[0];
	tempButton2.addEventListener('click', function(button, row){
		return function(){
			var id = row.children[0].id;
			var editPage = "http://www.sean-mulholland.com:3001/editPage/?id=" + id;
			window.location = editPage; 
		};
	}(tempButton2, tempRow));
}


