"use strict";

$(document).ready(function () {
  $('.loading').hide();
  $("select").on("change", function (event) {
    event.preventDefault();

    $('.loading').show();

    //grabbing of stories
    var selector = $(this).val();
    var url = "https://api.nytimes.com/svc/topstories/v2/";
    url += selector + ".json";
    url += "?" + $.param({
      "api-key": "d66269381eee43a2a61ef8c5e152affa"
    });

    $('.gallery').empty(), $.ajax({
      url: url,
      method: "GET",
      dataType: "json"
    }).done(function (data) {

      var results = data.results.filter(function (el) {
        return el.multimedia.length > 0;
      }).slice(0, 12);

      console.log(results);

      $.each(results, function (index, value) {
        var image = value.multimedia[4].url,
            headline = value.abstract,
            link = value.url;

        var stories = "";
        stories += '<div class="article" style="background-image: url(' + image + ')">';
        stories += '<div class="caption">';
        stories += '<p><a href="' + link + '">' + headline + '</a></p>';
        stories += '</div>';
        stories += '</div>';

        $('.loading').hide();
        $('.gallery').append(stories);
      });
    }).fail(function (err) {
      throw err;
    });
  });
});

//end of JS