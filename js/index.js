// NYT API //

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

.done(function(result) {
  console.log(result);
})

.fail(function(err) {
  throw err;
});

$