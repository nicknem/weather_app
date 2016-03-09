// Toggle between Celsius and fahreneit
var toggleTemp = function(e) {
  $("#imperialTemp").toggleClass("hidden");
  $("#celsiusTemp").toggleClass("hidden");
  $("#toC").toggleClass("hidden");
  $("#toF").toggleClass("hidden");
}

// Toggle between temperature units
  $("#toC").click(toggleTemp);
  $("#toF").click(toggleTemp);

// API coordinates
var baseUrl = "//api.openweathermap.org/data/2.5/weather?lat=";
var API = "02049e4cb7c3619b87ed49d3181dc2e0";

  if (navigator.geolocation) {
    // Get the user position
   navigator.geolocation.getCurrentPosition(function(position) {
      // Form complete URL with lat and lng
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var url = baseUrl + lat + "&lon=" + lng + "&appid=" + API;
      // API call to get the weather
      $.get(url,function( data ) {
        // Append the weather to the .weather div
        var weather = data.weather[0].main;
        // Get the Celsius and Imperial temperatures
        var temperature = data.main.temp;
        var celsiusTemp = Math.round(temperature - 273.15);
        var imperialTemp = Math.round(temperature * 9/5 - 459.67);
        // Insert city and country
        $("#name").html( "<p>" + data.name + ", " + data.sys.country + "</p>" );
        // Insert both C and F temperatures
        $("#imperialTemp").html("<p>" + imperialTemp + " ° F" + "</p>");
        $("#celsiusTemp").html("<p>" + celsiusTemp + " ° C" + "</p>");
        $("#main").html(  weather );

      // Append a different image depending on the weather
        // Retrieve the icon code and form the icon url
        var imgUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        // Insert the icon in the html
        $("#icon").html("<img id='theIcon' src='" + imgUrl + "' />");
      })
    });
  }
  // Render an alert if the user doens't activate location
  else {
    alert("You need to activate geolocation for this app to work!");
  }

