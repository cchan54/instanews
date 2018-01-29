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
        return item.multimedia.length;
      }).slice(0, 12);

      console.log(results);

      $.each(results, function(key, value) {
        var image = value.multimedia[4].url,
            words = value.abstract,
            url = value.url;

          stories += '<div class="article">';
          stories += '<a href="' + url + '">' + words + '</a>';
          stories += '<img class="article-img" src="' + image + '">';
          stories += '</div>';

        $('.gallery').append(stories);

      });
    });
  });
});
