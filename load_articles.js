function test() {
	var tfile = new XMLHttpRequest();
	tfile.open("GET","test.json",true);
	tfile.send();
	tfile.onreadystatechange = function() {
		if(tfile.readyState === 4 && tfile.status === 200) {
			var tjson = JSON.parse(tfile.responseText);
			var elem = document.getElementById("about");
			elem.innerHTML = tjson.test;
			console.log(tjson.test);
			console.log(tjson.type);
		}
	};
	console.log("run");
}