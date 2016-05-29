function test() {
	var tfile = new XMLHttpRequest();
	tfile.open("GET","test.json");
	tfile.onreadystatechange = function() {
		if(tfile.readyState === 4){
			if (tfile.status === 200) {
				var tjson = JSON.parse(tfile.responseText);
				var elem = document.getElementById("about");
				elem.innerHTML = tjson.test;
				console.log(tjson.test);
				console.log(tjson.type)
			}
		}
	};
	while(tfile.readyState !== 4){
		console.log(tfile.readyState);
	}
	console.log("run");
}