function displayLocation(latitude,longitude){
  // This function uses the googleapis to turn latitude and longitude into city, state format
    var request = new XMLHttpRequest();
    
    var method = 'GET';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
    var async = true;
    
    request.open(method, url, async);
    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        var city = data.results[0].address_components[2].long_name;// gets the long version of the city name
        // May need another variable here for the 5 digit zip code for weather api? 
        var state = data.results[0].address_components[5].short_name; //gets the 2 letter abbreviation of the current state
        $("#location").html(city+", "+state);  //sets the inner text of the div with ID of location
      }
    };
    request.send();
}

var successCallback = function(position){
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    displayLocation(x,y);
};

var errorCallback = function(error){
    var errorMessage = 'Unknown error';
    switch(error.code) {
      case 1:
        errorMessage = 'Permission denied';
        break;
      case 2:
        errorMessage = 'Position unavailable';
        break;
      case 3:
        errorMessage = 'Timeout';
        break;
    }
    document.write(errorMessage);
};

var options = {
    enableHighAccuracy: true,
    timeout: 1000,
    maximumAge: 0
};

navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);

