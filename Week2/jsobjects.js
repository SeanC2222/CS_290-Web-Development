var obj1 = {key1:"Hello", key2:256};
var obj2 = {key1:"Hello Again", key2:{subkey1:"Deep!", subkey2:1234}, key3:"Goodbye"};
var obj3 = {key1:{subkey1:{deepkey1:"Tester", deepkey2:{deepestkey:"D"}}, subkey2:"Unlocked"}, key2:989}
var obj4 = {k1:{subk1:{deepk1:"Tester", deepk2:{deepestk:"D"}}, subk2:"Unlocked"}, k2:989};
var obj5 = {k1:{sk1:{ssk1:{sssk1:"A", sssk2:"B"},ssk2:"a"},sk2:{ssk1:{sssk1:"A", sssk2:"B"}, ssk2:"a"}, sk3:{ssk1:"a", ssk2:"b", ssk3:{sssk1:{ssssk1:"1", ssssk2:"2", ssssk3:"3"},sssk2:"B", sssk3:"C"}, ssk4:{sssk1:"A", sssk2:"B"}}, sk4:14, sk5:{ssk1:11, ssk2:"The end is nigh" + 14}}, k2:11, k3:{sk1:"skeleton", sk2:{ssk1:"a", ssk2:"b", ssk3:{sssk1:"A", sssk2:{ssssk1:"1", ssssk2:"2"}, sssk3:"C"}, ssk4:"d"}, sk3:"testerosa"}, k4:"Evil"};

var obj6 = {k1:{sk1:{ssk1:{sssk1:"A", sssk2:"B"},ssk2:"a"},sk2:{ssk1:{sssk1:"A", sssk2:"B"}, ssk2:"a"}, sk3:{ssk1:"a", ssk2:"b", ssk3:{sssk1:{ssssk1:"1", ssssk2:"2", ssssk3:"3"},sssk2:"B", sssk3:"C"}, ssk4:{sssk1:"A", sssk2:"B"}}, sk4:14, sk5:{ssk1:11, ssk2:"The end is night" + 14}}, k2:11, k3:{sk1:"skeleton", sk2:{ssk1:"a", ssk2:"b", ssk3:{sssk1:"A", sssk2:{ssssk1:"1", ssssk2:"2"}, sssk3:"C"}, ssk4:"d"}, sk3:"testerosa"}, k4:"Evil"};

if(RecComp(obj5, obj5)){
	console.log("obj5 = obj5");
} else {
	console.log("obj5 != obj5");
}

if(RecComp(obj6, obj6)){
	console.log("obj6 = obj6");
} else {
	console.log("obj6 != obj6");
}

if(RecComp(obj5, obj6)){
	console.log("obj5 = obj6");
} else {
	console.log("obj5 != obj6");
}
function RecComp(locObj1, locObj2){

	//If both objects are NOT objects, compare
	if (typeof(locObj1) != 'object' && typeof(locObj2) != 'object'){
		return locObj1 == locObj2;
	
	//Else if they both ARE objects deep compare components recursively
	} else if ( typeof(locObj1) == typeof(locObj2) && typeof(locObj1) == 'object'){
		var trig = true;
		for (var keys in locObj1) {
			if (typeof(locObj2[keys]) == 'invalid'){
				return false;
			} else {
				if (typeof(locObj1[keys]) == 'object'){
					trig = RecComp(locObj1[keys], locObj2[keys]);
					if(!trig){
						return false;
					}
				} else {
					if (locObj1[keys] != locObj2[keys]){
						return false;
					}
				}
			}
		}		
		return true;

	//Else they don't compare, return false
	} else {
		return false;
	}
}

console.log("Finished!");
