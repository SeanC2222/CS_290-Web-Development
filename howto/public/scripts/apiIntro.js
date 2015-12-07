var priceSubmit = document.getElementById("priceSubmit");
var priceReturnData = document.getElementById("priceReturnData");

priceSubmit.addEventListener('click', function(){
	var priceLimit = document.getElementById("priceLimit").value;
	var priceOffset = document.getElementById("priceOffset").value;
	priceReturnData.src = "http://www.oregonliquorprices.com/api/v1/price/?limit=" + priceLimit + "&offset=" + priceOffset + "&format=json";
	priceReturnInformation.innerHTML = "Page Being Displayed: <a href=\"" + priceReturnData.src + "\">" + priceReturnData.src + "</a><br>**NOTE: To access the information by browser, the additional query tag \"format=json\" has been appended";
});

var productSubmitQuery = document.getElementById("productSubmitQuery");
var productReturnData = document.getElementById("productReturnData");

productSubmitQuery.addEventListener('click', function(){
	var productLimit = document.getElementById("productLimitQuery").value;
	var productOffset = document.getElementById("productOffsetQuery").value;
	productReturnData.src = "http://www.oregonliquorprices.com/api/v1/product/?limit=" + productLimit + "&offset=" + productOffset + "&format=json";
	productReturnInformation.innerHTML = "Page Being Displayed: <a href=\"" + productReturnData.src + "\">" + productReturnData.src + "</a><br>**NOTE: To access the information by browser, the additional query tag \"format=json\" has been appended";
});
 
var productSubmitProduct = document.getElementById("productSubmitProduct");
productSubmitProduct.addEventListener('click', function(){
	var productNumber = document.getElementById("productNumber").value;
	var productReturnInformation = document.getElementById("productReturnInformation");
	productReturnData.src = "http://www.oregonliquorprices.com/api/v1/product/" + productNumber + "/?format=json"; 
	productReturnInformation.innerHTML = "Page Being Displayed: <a href=\"" + productReturnData.src + "\">" + productReturnData.src + "</a><br>**NOTE: To access the information by browser, the additional query tag \"format=json\" has been appended";
	
});	

var storeSubmitQuery = document.getElementById("storeSubmitQuery");
var storeReturnData = document.getElementById("storeReturnData");

storeSubmitQuery.addEventListener('click', function(){
	var storeLimit = document.getElementById("storeLimit").value;
	var storeOffset = document.getElementById("storeOffset").value;
	storeReturnData.src = "http://www.oregonliquorprices.com/api/v1/store/?limit=" + storeLimit + "&offset=" + storeOffset + "&format=json";
	var storeReturnInformation = document.getElementById("storeReturnInformation");
	storeReturnInformation.innerHTML = "Page Being Displayed: <a href=\"" + storeReturnData.src + "\">" + storeReturnData.src + "</a><br>**NOTE: To access the information by browser, the additional query tag \"format=json\" has been appended";
});

var storeSubmitNumber = document.getElementById("storeSubmitNumber");

storeSubmitNumber.addEventListener('click', function(){
	var storeNumber = document.getElementById("storeNumber").value;
	storeReturnData.src = "http://www.oregonliquorprices.com/api/v1/store/" + storeNumber + "/?format=json";
	var storeReturnInformation = document.getElementById("storeReturnInformation");
	storeReturnInformation.innerHTML = "Page Being Displayed: <a href=\"" + storeReturnData.src + "\">" + storeReturnData.src + "</a><br>**NOTE: To access the information by browser, the additional query tag \"format=json\" has been appended";
});

