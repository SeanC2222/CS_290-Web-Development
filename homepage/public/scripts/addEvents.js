var resumeButton = document.getElementById("resumeButton");
var holdVariable = "";

resumeButton.addEventListener('mouseover', function(){
	var contentText = document.getElementById("contentText");
	holdVariable = contentText.textContent;
	contentText.textContent = "Here is my resume!";
	resumeButton.style.backgroundColor = "red";
	resumeButton.style.color = "red"; 
});

resumeButton.addEventListener('mouseout', function(){
	var contentText = document.getElementById("contentText");
	contentText.textContent = holdVariable;
	resumeButton.style.backgroundColor = "#400080";
	resumeButton.style.color = "white";
});
