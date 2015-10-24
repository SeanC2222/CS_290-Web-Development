function Automobile( year, make, model, type ){
	this.year = year;
	this.make = make;
	this.model = model;
	this.type = type;
}

var automobiles = [
	new Automobile(1995, "Honda", "Accord", "Sedan"),
	new Automobile(1990, "Ford", "F-150", "Pickup"),
	new Automobile(2000, "GMC", "Tahoe", "SUV"),
	new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
	new Automobile(2005, "Lotus", "Elise", "Roadster"),
	new Automobile(2008, "Subaru", "Outback", "Wagon")
	];

console.log("*****");
console.log("The cars sorted by year are:");
sortArr(yearComparator, automobiles);
printResults(automobiles);

console.log("\nThe cars sorted by make are:");
sortArr(makeComparator, automobiles);
printResults(automobiles);

console.log("\nThe cars sorted by type are:");
sortArr(typeComparator, automobiles);
printResults(automobiles);
console.log("*****");

function printResults(array){
	for(var cars in array){
		console.log(array[cars]["year"] + "\t" +
		array[cars]["make"] + "\t" +
		array[cars]["type"])
	}
}

function sortArr(comparator, array){
	for(var i = 0; i < array.length - 1; i++){
		for(var j = i + 1; j < array.length; j++){
			if(comparator(array[j], array[i])){
				var t = array[j];
				array[j] = array[i];
				array[i] = t;
			} 
		}
	}
}



function yearComparator(auto1, auto2){
	if(auto1["year"] > auto2["year"]){
		return 1;
	} else {
		return 0;
	}
}

function makeComparator(auto1, auto2){
	auto1.make = auto1.make.toLowerCase();
	auto2.make = auto2.make.toLowerCase();
	
	for (var index in auto1.make){
		if(index < auto2.make.length){
			if(auto1.make[index] > auto2.make[index]){
				return 1;
			} else if (auto1.make[index] == auto2.make[index]){
				continue;
			} else {
				return 0;
			}
		} else {
			return 1;
		}
	}
}

function typeComparator(auto1, auto2){
	auto1.type = auto1.type.toLowerCase();
	auto2.type = auto2.type.toLowerCase();
	
	for (var index in auto1.type){
		if(index < auto2.type.length){
			if(auto1.type[index] > auto2.type[index]){
				return 1;
			} else if (auto1.type[index] == auto2.type[index]){
				continue;
			} else {
				return 0;
			}
		} else {
			return 1;
		}
	}
}
