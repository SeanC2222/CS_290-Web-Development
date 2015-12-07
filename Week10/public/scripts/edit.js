var cancel = document.getElementById("editCancel");

cancel.addEventListener('click', function(){
	window.location = "http://www.sean-mulholland.com:3001";
});

var editDate = document.getElementById("editDate");
var editName = document.getElementById("editName");
var editWeight =  document.getElementById("editWeight");
var editLbs = document.getElementById("editLbs");
var editReps = document.getElementById("editReps");
var hiddenID = document.getElementById("hiddenID");

var submit = document.getElementById("editSubmit");

submit.addEventListener('click', function(){
	var input = {};
	input.command = "UPDATE";
	input.name = editName.value;
	input.reps = editReps.value;
	input.weight = editWeight.value;
	input.date = editDate.value;
	input.lbs = editLbs.checked;
	input.id = hiddenID.value;
	

	var req = new XMLHttpRequest();
	req.open("POST", "/updateData", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			if(response.answer == "S"){
				alert("Success!");
				window.location = "http://www.sean-mulholland.com:3001";
			} else {	
				var row = document.getElementById("statusRow");
				row.textContent = "Failure to update in database.";
				console.log("Failure to insert in database.");
			}
		} else {
			console.log("Request Failure");
		}
	});
	req.send(JSON.stringify(input));
});

