var lat = 0;
var long = 0;

$(document).ready(function(){

//Connects to the Flickr API and reads the results of the query into a JSON array. This query uses the 'flickr.photos.search' method to access all the photos in a particular person's user account. It also uses arguments to read in the latitude and longitude of each picture. It passes the resultant JSON array to the 'displayImages3' function below.
$.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=34ff37a0b36e703f8d138dfbe632601e&user_id=170858628@N08&has_geo=1&extras=geo&format=json&nojsoncallback=1", displayImages3);

function displayImages3(data){

                    //Loop through the results in the JSON array. The 'data.photos.photo' bit is what you are trying to 'get at'. i.e. this loop looks at each photo in turn.
                    $.each(data.photos.photo, function(i,item){

                        //Read in the lat and long of each photo and stores it in a variable.
                        lat = item.latitude;
                        long = item.longitude;

                        //Get the url for the image.
                        var photoURL = 'https://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
                        htmlString = '<img src="' + photoURL + '">';
                        var contentString = '<div id="content">' + htmlString + '</div>';

                        //Create a new info window using the Google Maps API
                        var infowindow = new google.maps.InfoWindow({
                             //Adds the content, which includes the html to display the image from Flickr, to the info window.
                             content: contentString,
                             maxWidth: 400
                        });

                        //Create a new marker position using the Google Maps API.
                        var myLatlngMarker = new google.maps.LatLng(lat,long);
                        var myTitle = "" +item.title;



                        //Create a new marker using the Google Maps API, and assigns the marker to the map created below.

                        var marker = new google.maps.Marker({
                        position: myLatlngMarker,
                        animation: google.maps.Animation.DROP,
                        map: myMap,
                        title: item.title
                        });

                        function toggleBounce() {
                        if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                        } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                      }
                    }

                        //Uses the Google Maps API to add an event listener that triggers the info window to open if a marker is clicked.
                        google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(myMap,marker);
                        });

        });
}

});

//Using the Google Maps API to create the map.
var myLatlngCenter = new google.maps.LatLng(39.899992, -99.234714);
var mapOptions = {
          center: myLatlngCenter,
          zoom: 5,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
                      {elementType: 'geometry', stylers: [{color: '#557AA1'}]},
                      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                      {elementType: 'labels.text.fill', stylers: [{color: '#e5e5e5'}]},
                      {
                        featureType: 'administrative.locality',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#e5e5e5'}]
                      },
                      {
                        featureType: 'poi',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#77AAE0'}]
                      },
                      {
                        featureType: 'poi.park',
                        elementType: 'geometry',
                        stylers: [{color: '#334961'}]
                      },
                      {
                        featureType: 'poi.park',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#6b9a76'}]
                      },
                      {
                        featureType: 'road',
                        elementType: 'geometry',
                        stylers: [{color: '#7EB4ED'}]
                      },
                      {
                        featureType: 'road',
                        elementType: 'geometry.stroke',
                        stylers: [{color: '#7EB4ED'}]
                      },
                      {
                        featureType: 'road',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#7EB4ED'}]
                      },
                      {
                        featureType: 'road.highway',
                        elementType: 'geometry',
                        stylers: [{color: '#7EB4ED'}]
                      },
                      {
                        featureType: 'road.highway',
                        elementType: 'geometry.stroke',
                        stylers: [{color: '#7EB4ED'}]
                      },
                      {
                        featureType: 'road.highway',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#7EB4ED'}]
                      },
                      {
                        featureType: 'transit',
                        elementType: 'geometry',
                        stylers: [{color: '#7EB4ED'}]
                      },
                      {
                        featureType: 'transit.station',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#7EB4ED'}]
                      },
                      {
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [{color: '#1F2C3B'}]
                      },
                      {
                        featureType: 'water',
                        elementType: 'labels.text.fill',
                        stylers: [{color: '#1F2C3B'}]
                      },
                      {
                        featureType: 'water',
                        elementType: 'labels.text.stroke',
                        stylers: [{color: '#1F2C3B'}]
                      }
                    ]
};
var myMap = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
