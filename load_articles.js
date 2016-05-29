function test() {
	var tfile = new XMLHttpRequest();
	tfile.onreadystatechange = function() {
		if(tfile.readyState === 4 && tfile.status === 200) {
			var tjson = JSON.parse(tfile.responseJSON);
			var elem = document.getElementById("about");
			elem.innerHTML = tjson.test;
			console.log(tjson.test);
			console.log(tjson.type);
		}
	};
	tfile.open("GET","test.json",true);
	tfile.send();
	console.log("run");
}