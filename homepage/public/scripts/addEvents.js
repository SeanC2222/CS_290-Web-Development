var buttons = document.getElementsByClassName("buttonDiv");
var holdVariable = "";

var htmlContent;

for(var j = 0; j < buttons.length; j++){

	if (j == 0){
		htmlContent = "<div> Welcome to my homepage built on my own Node.js webserver hosted on an AWS EC2 instance! " +
			      "This page will grow as I learn newer techniques in the next 9 months of my computer science " +
			      "post-bachelor's degree at Oregon State University!</div><br><br> " +
			      "<div> A little about myself:<br>" + 
			      "I was born and raised in the Seattle area and attended the University of Washington for my " + 
			      "initial B.S. degree in physics. I graduated from there in 2010, and moved onto " +
			      "working at the Puget Sound Naval Shipyard in radiation safety. I learned a lot and worked hard " +
			      "but decided in late 2014 that I wanted to go a new direction. I began my studies in computer " +
			      "science via the Oregon State University eCampus and found a job at Fred Hutchinson Cancer " +
			      "Research Center as a Sr. Radiation Safety Technician. I plan to graduate in December 2010 " +
			      "with my second B.S. in computer science. </div><br>" +
			      "<div> Personal hobbies of mine include: cooking, playing my guitar, hanging with my cats, " +
			      "snowboarding, creating Arduino projects (I'm new to this!), exploring the Seattle food scene, " + 			       "lifting weights, running, and cheering on the Huskies during football season! Go Dawgs! </div>" +
			      "<br><br><img src=\"./public/documents/IMAG1321.jpg\" alt=\"Jack\" style=\"width:180px;height:320px\"> " +
			      "<img src=\"./public/documents/IMAG1350.jpg\" alt=\"Jack and Daniel\" style=\"width:320px;height:180px\">";
	} else if(j == 1){
		htmlContent = "<embed src=\"./public/documents/newResume.pdf\" width=\"100%\" height=\"100%\" type='application/pdf'>";
	} else if (j == 2){
		htmlContent = "<div>" + 
			      "<span><a href=\"https://github.com/SeanC2222/CS_161-Programming-Fundamentals-I\">" + 
			      "Programming Fundamentals I</a></span><br>" + 
			      "<span><a href=\"https://github.com/SeanC2222/CS_162-Programming-Fundamentals-II\">" + 
			      "Programming Fundamentals II</a></span><br>" + 
			      "<span><a href=\"https://github.com/SeanC2222/CS_290-Web-Development\">" + 
			      "Web Development</a></span></div>";
	} else if (j == 3){
		htmlContent = "<div>" + 
			      "<span> This is a link to a \"How-To\" API documentation project I did for my Web Development" +
			      " class. The goal was to find an API that had poor documentation, and create a website that " + 
			      "provided documentation on how to use the API. The Oregon State Liquor Prices API I found " + 
			      "was selected because it is a RESTful API with a large, but tangible dataset. " + 
			      "This provided me the opportunity to familiarize myself with a scalable & data-centric " +
			      "software architecture without drowning in the theoretical terms or getting lost in " + 
			      "an overly large dataset. The terms in the documentation I provide may not be perfect, " +
			      "but I was able to create inline examples that leveraged the API while providing useful " +
			      "and usable information.</span><br><br>" +
			      "<span><a href=\"http://www.sean-mulholland.com:3050\">Oregon State Liquor API How-To</a></span>";
	} else if (j == 4){
		htmlContent = "<div>" +
			      "<span> This section is currently being worked on. Refer to my GitHub for current code examples." +
			      "</span><br><br>" + 
			      "<span><a href=\"http://www.github.com/SeanC2222\">My GitHub</a></span>";
	} else {
		htmlContent = "I made an error. It was totally planned for.... But I made an error.";
	}
	var buttonFunction = buttonEventGenerator(buttons[j], htmlContent);
	buttonFunction();
}

function buttonEventGenerator(button, content){
	return function () {
		var tempButton = button;
		tempButton.addEventListener('mouseover', function(){
			var contentText = document.getElementById("contentText");
			var contentTextParent = contentText.parentNode;
			holdVariable = contentText.textContent;
			if(contentText){
				contentTextParent.removeChild(contentText);
			}
			var newContent = document.createElement("div");
			newContent.id = "contentText";
			newContent.innerHTML = content;
			contentTextParent.appendChild(newContent);
			newContent.style.width = "100%";
			if(tempButton.id == "introButton"){
				newContent.style.overflow = "scroll";
			} else {
				newContent.style.overflow = "hidden";
			}
				
			tempButton.style.backgroundColor = "red";
		});

		tempButton.addEventListener('mouseout', function(){
			var contentText = document.getElementById("contentText");
			//Changes content
			//contentText.textContent = holdVariable;
			tempButton.style.backgroundColor = "#310AAE";
		});
	};
};

