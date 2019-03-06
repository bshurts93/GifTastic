// Array of premade buttons
var buttonItems = [
  "Peter Griffin",
  "Lois Griffin",
  "Brian Griffin",
  "Stewie Griffin"
];

var gifLimit = 10;

var animatedSrc;
var stillSrc;

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
    console.log(response);
    // Loop through gifs (based on defined limit)
    for (var i = 0; i < gifLimit; i++) {
      // Get sources
      animatedSrc = response.data[i].images.original.url;
      stillSrc = response.data[i].images.original_still.url;
      // Container to hold both gif and rating info
      var newDiv = $("<div>");
      newDiv.addClass("gif-div");
      // Retrieve url info from ajax request
      var gifURL = response.data[i].images.original_still.url;
      // Create new image element and set source
      var newGif = $("<img>");
      newGif.attr("class", "gif");
      newGif.attr("src", gifURL);
      newGif.attr("data-still", stillSrc);
      newGif.attr("data-animate", animatedSrc);
      newGif.attr("data-state", "still");
      // Append elements to created div
      $(newDiv).append(newGif);
      $(newDiv).append("<p>Rating: " + response.data[i].rating + "</p>");
      // Send div to DOM
      $(".gif-box").append(newDiv);
    }
  });
});

// On still image click, animate!
$(document).on("click", ".gif", function() {
  if ($(this).attr("data-state") === "still") {
    var animatedState = $(this).attr("data-animate");
    $(this).attr("src", animatedState);
    $(this).attr("data-state", "animated");
  } else if ($(this).attr("data-state") === "animated") {
    var stillState = $(this).attr("data-still");
    $(this).attr("src", stillState);
    $(this).attr("data-state", "still");
  }
});
