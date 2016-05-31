var pageLength = 5;

function loadArticleURL(){
	if(location.search.length <= 1){
		location.search = "?0";
	}
	var s = location.search;
	var id = parseInt(s.slice(1));
	loadArticle(id,"articles");
}

function loadPageURL(){
	if(location.search.length <= 1){
		location.search = "?0";
	}
	var s = location.search;
	var page = parseInt(s.slice(1));
	var startical = (page * pageLength)-1;
	getJSONFile("articles\\ReviewIndex.json","",function getArticles(reviewIndex){
		var len = reviewIndex.articles.length;
		for (var i = 0; i < pageLength; i++) {
			articleID = len - (startical + i);
			if(articleID < 0){
				removeElement(document.getElementById("article"+(i+1)));
			}else{
				console.log(articleID);
				console.log(reviewIndex);
				var file = reviewIndex.articles[articleID].file;
				getJSONFile("articles\\"+file,ParentID,assignPageArticle);
			}
		};
		
	});
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
	htmlArticle.getElementsByClassName("articlehead")[0].innerHTML=json.articletitle;
	htmlArticle.getElementsByClassName("articleheaderlink")[0].setAttribute("href","article.html?"+json.num)
	htmlArticle.getElementsByClassName("articleimg")[0].setAttribute("src","img\\"+json.img);
	htmlArticle.getElementsByClassName("articlescore")[0].innerHTML=json.score;
	htmlArticle.getElementsByClassName("articledate")[0].innerHTML=json.date;
	htmlArticle.getElementsByClassName("mp_articlebody")[0].innerHTML=json.bod;
	htmlArticle.getElementsByClassName("articleReadmore")[0].setAttribute("href","article.html?"+json.num)
}
function assignArticle(json,ParentID){
	var htmlArticle = document.getElementById(ParentID);
	htmlArticle.getElementsByClassName("articlehead")[0].innerHTML=json.articletitle;
	htmlArticle.getElementsByClassName("articleimg")[0].setAttribute("src","img\\"+json.img);
	htmlArticle.getElementsByClassName("articlescore")[0].innerHTML=json.score;
	htmlArticle.getElementsByClassName("articledate")[0].innerHTML=json.date;
	htmlArticle.getElementsByClassName("articlebody")[0].innerHTML=json.bod;
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

function removeElement(elem){
	elem.parentElement.removeChild(elem);
}