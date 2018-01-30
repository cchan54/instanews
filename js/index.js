$(function() {
  $("select").on("change", function() {
    event.preventDefault();

    //load wheel
    $(".loader").show();

    //grabbing of stories
    var selector = $(this).val();
    var url = "https://api.nytimes.com/svc/topstories/v2/";

    url += selector + ".json";
    url +=
      "?" +
      $.param({
        "api-key": "d66269381eee43a2a61ef8c5e152affa"
      });

    $.ajax({
      url: url,
      method: "GET",
      dataType: "json"
    })
    .done(function(data) {
      var stories = "";
      var results = data.results.filter(function(item){
        return item.multimedia.length >=5;
      }).slice(0, 12);

      console.log(results);

        $.each(results, function(key, value) {
        var image = value.multimedia[4].url,
            headline = value.abstract,
            url = value.url;
          
          stories += '<li>';
          // stories += '<a href="' + url + '">' + headline + '</a>';
          stories += '<div class="article" style="background-image: url(' + image + ')">';
          stories += '<div class="caption">'
          stories += '<p>'+ headline +'</p>';
          stories += '</div>'
          stories += '</div>';
          stories += '</li>';

        $('.gallery').append(stories);
    });
  });
});
});
