  // Built by LucyBot. www.lucybot.com
var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
url += '?' + $.param({
  'api-key': "d66269381eee43a2a61ef8c5e152affa"
});

$.ajax({
  url: url,
  method: 'GET',
  dataType: 'json'
})

.done(function(data){
  var stories  = ''; 
  var results = data.results.filter(function(value){
    return value.multimedia.length >= 5;
  })
  // only want 12 stories
  results.splice(12);

 $.each(results, function(key,value){
   var images = value.multimedia[4].url,
       words = value.abstract,
       url = value.url;

       stories += '<li class="textpict">';
       stories += '<a href=' + url + '>';
       stories += '<div class="article" style="background-image: url(' + images + ')">';
       stories += '<p class="words" >';
       stories += words;
       stories += '</p></div></a></li>';    
      });
    });
