function loadArticleURL(){
	if(location.search.length <= 1){
		location.search="?1";
	}
	var s = location.search;
	var id = parseInt(s.slice(1));
	loadArticle(id,"articles");
}

function loadArticle(articleID, ParentID){
	var reviewIndex = getJSONFile("articles\\ReviewIndex");
	var file = reviewIndex.articles[articleID].file;
	var review = getJSONFile("articles\\"+file);
	var htmlArticle = document.getElementById(ParentID);
	htmlArticle.getElementsByClassName("articlehead")[0].innerHTML=review.articletitle;
	htmlArticle.getElementsByClassName("articleimg")[0].setAttribute("src",review.img);
	htmlArticle.getElementsByClassName("articlescore")[0].innerHTML=review.score;
	htmlArticle.getElementsByClassName("articledate")[0].innerHTML=review.date;
	htmlArticle.getElementsByClassName("articlebody")[0].innerHTML=review.bod;
}

function getJSONFile(file){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(tfile.readyState === 4 && tfile.status === 200) {
			var rjson = JSON.parse(xmlhttp.responseText);
			console.log("Got " + file);
			return rjson;
		}
	};
	xmlhttp.open("GET",file,true);
	xmlhttp.send();
	console.log("Getting " + file);
}