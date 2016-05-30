function loadArticleURL(){
	if(location.search.length <= 1){
		location.search = "?0";
	}
	var s = location.search;
	var id = parseInt(s.slice(1));
	loadArticle(id,"articles");
}

function loadArticle(articleID, ParentID){
	getJSONFile("articles\\ReviewIndex.json","",function getArticle(reviewIndex){
		if(articleID >= reviewIndex.articles.length){
			articleID = 0;
		}
		var file = reviewIndex.articles[articleID].file;
		getJSONFile("articles\\"+file,ParentID,assignArticle);
	});
}

function assignArticle(json,ParentID){
	var htmlArticle = document.getElementById(ParentID);
	htmlArticle.getElementsByClassName("articlehead")[0].innerHTML=review.articletitle;
	htmlArticle.getElementsByClassName("articleimg")[0].setAttribute("src","img\\"+review.img);
	htmlArticle.getElementsByClassName("articlescore")[0].innerHTML=review.score;
	htmlArticle.getElementsByClassName("articledate")[0].innerHTML=review.date;
	htmlArticle.getElementsByClassName("articlebody")[0].innerHTML=review.bod;
}

function getJSONFile(file, other, callback){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			var rjson = JSON.parse(xmlhttp.responseText);
			callback(rjson,other);
		}
	};
	xmlhttp.open("GET",file,true);
	xmlhttp.send();
}