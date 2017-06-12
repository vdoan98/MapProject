window.onload= function loadData(){
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');

  $nytElem.text("");

  var nytimesUrl ="https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytimesUrl += '?' + $.param({
      'api-key': "af75878939f64cd890a0bf968a4f660c",
      'q': "denver"
    });

  //Function used API url, search for article with the
  //word "Denver" and append it to the unordered list
  $.getJSON(nytimesUrl, function(data){

      $nytHeaderElem.text('News that are brewing in Denver');

      articles = data.response.docs;
      for (var i = 0; i < articles.length; i++) {
          var article = articles[i];
          $nytElem.append('<li class="article">'+
              '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
              '<p>' + article.snippet + '</p>'+
          '</li>');
      }

  }).error(function(e){
      $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
  });
};
