// Array of premade buttons
var buttonItems = [
  "Peter Griffin",
  "Lois Griffin",
  "Stewie Griffin",
  "Brian Griffin",
  "Meg Griffin"
];

var gifLimit = 10;

// Populate button-box with array elements
for (var i = 0; i < buttonItems.length; i++) {
  // Create button element
  newBtn = $("<button>");
  // Make text match name
  newBtn.text(buttonItems[i]);
  // Give class of gif-btn
  newBtn.attr("class", "gif-btn");
  // Append to button-box
  $(".button-box").append(newBtn);
}

// On search, the input will create a new functioning button
$(document).on("click", "#create-new", function() {
  // Get value from user input
  var input = $("#user-input")
    .val()
    .trim();
  // Create new button element
  var newSearchBtn = $("<button>");
  // Text of button is same as input
  newSearchBtn.text(input);
  newSearchBtn.attr("class", "gif-btn");
  $(".button-box").append(newSearchBtn);
});

// On button click, populate page with gifs
$(document).on("click", ".gif-btn", function() {
  // Empty gif-box on new click
  $(".gif-box").empty();

  // Search query string
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=eECVxqdhtweCEdB6lK3bCbSMlcNnq0mi&q=" +
    $(this).text() +
    "&limit=" +
    gifLimit +
    "&offset=0&rating=PG&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // Loop through gifs (based on defined limit)
    for (var i = 0; i < gifLimit; i++) {
      var gifURL = response.data[i].images.original.url;
      var newGif = $("<img>");
      newGif.attr("src", gifURL);
      $(".gif-box").append(newGif);
      $(".gif-box").append("<p>Rating: " + response.data[i].rating + "</p>");
    }
  });
});
