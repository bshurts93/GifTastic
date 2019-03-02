// Input form to add new button

// On button click, populate page with gifs
$(document).on("click", ".gif-btn", function() {
  var animal = $(this).attr("data-animal");
  var queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    animal +
    "&api_key=eECVxqdhtweCEdB6lK3bCbSMlcNnq0mi&limit=5";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
});
