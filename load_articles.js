function loadArticleURL(){
	if(location.search.length <= 1){
		location.search = "?1";
	}
	var s = location.search;
	var id = parseInt(s.slice(1));
	loadArticle(id,"articles");
}

function loadArticle(articleID, ParentID){
	var reviewIndex = getJSONFile("articles\\ReviewIndex.json",function(){
	var file = reviewIndex.articles[articleID].file;
	var review = getJSONFile("articles\\"+file,function(){
	var htmlArticle = document.getElementById(ParentID);
	htmlArticle.getElementsByClassName("articlehead")[0].innerHTML=review.articletitle;
	htmlArticle.getElementsByClassName("articleimg")[0].setAttribute("src",review.img);
	htmlArticle.getElementsByClassName("articlescore")[0].innerHTML=review.score;
	htmlArticle.getElementsByClassName("articledate")[0].innerHTML=review.date;
	htmlArticle.getElementsByClassName("articlebody")[0].innerHTML=review.bod;
	});
	});
}

function getJSONFile(file, callback){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			var rjson = JSON.parse(xmlhttp.responseText);
			console.log("Got " + file);
			callback();
			return rjson;
		}
	};
	xmlhttp.open("GET",file,true);
	xmlhttp.send();
	console.log("Getting " + file);
	
}