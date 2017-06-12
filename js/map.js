var map;
var locations;
var markers;
function initMap(){

  //Constructor for new maps. Initilized as soon as page loaded
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.7475, lng: -104.9428},
    zoom: 13
  });

  var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  locations = [
    {
      name: 'Denver Museum of Nature History',
      location: {lat: 39.7475, lng: -104.9428},
      category: 'Museum'
    },
    {
      name: 'Tattered Cover Book Store',
      location: {lat: 39.740620, lng: -104.956524},
      category: 'Bookstore'
    },
    {
      name: 'BookBar',
      location: {lat: 39.7752, lng: -105.0439},
      category: 'Bookstore'
    },
    {
      name: 'Bluebird Theater',
      location: {lat: 39.7403, lng: -104.9484},
      category: 'Entertainment'
    },
    {
      name: 'Denver Zoo',
      location: {lat: 39.7494, lng: -104.9498},
      category: 'Entertainment'
    },
    {
      name: '16th Street Mall',
      location: {lat: 39.7478, lng: -104.9949},
      category: 'Entertainment'
    },
    {
      name: 'Kilgore Books',
      location: {lat: 39.7367, lng: -104.9790},
      category: 'Bookstore'
    }
  ];

  markers = [];

  var defaultIcon = makeMarkerIcon('20B2AA');
  var highlightedIcon = makeMarkerIcon('FFA07A');

  for (var i = 0; i < locations.length; i++){
    var position = locations[i].location;
    var name = locations[i].name;

    var marker = new google.maps.Marker({
      map: map,
      position: position,
      name: name,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i,
    });


    markers.push(marker);

    bounds.extend(marker.position);

    //Action listeners for every locations, marker and infowindow
    marker.addListener('click', function(){
      populateInfoWindow(this, largeInfoWindow);
      toggleBounce(this);
    });

    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });

    //show-listings show all hidden markers
    document.getElementById('show-listings').addEventListener('click', function(){
      for(var i = 0; i < markers.length; i++){
        markers[i].setVisible(true);
      }
    });

    //hide-listings hide all markers
    document.getElementById('hide-listings').addEventListener('click', function(){
      for(var i = 0; i < markers.length; i++){
        markers[i].setVisible(false);
      }
    });
  }

}



//Populate info window. Every infoWindow is attached to a marker of a location
function populateInfoWindow(marker, infowindow){
  if (infowindow.marker != marker){
    infowindow.marker = marker;
    infowindow.setContent('<div><h4>' + marker.name + '</h4></div>');
    infowindow.open(map, marker);

    infowindow.addListener('closeclick', function(){
      infowindow.marker = null;
    });
  }
}


//Style color for marker
function makeMarkerIcon(color) {
  var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ color +
      '|40|_|%E2%80%A2',
  new google.maps.Size(21, 34),
  new google.maps.Point(0, 0),
  new google.maps.Point(10, 34),
  new google.maps.Size(21,34));
  return markerImage;
}


//Animate location markers. If marker currently doesn't have Animation, which is null
//the function animate marker. If the marker is currently aimated,
//the function stops animation.
function toggleBounce(marker) {

  if(marker.getAnimation() === null) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){ marker.setAnimation(null); }, 2800);
  }
  else {
    marker.setAnimation(google.maps.Animation.NULL);
  }
}

//SearchViewModel utilizes Knockout JS to create a
//drop down list that allow user to chose which location
//they wish to view.
var SearchViewModel = function(){
  this.locations = [
    {
      name: 'Denver Museum of Nature History'
    },
    {
      name: 'Tattered Cover Book Store'
    },
    {
      name: 'BookBar'
    },
    {
      name: 'Bluebird Theater'
    },
    {
      name: 'Denver Zoo'
    },
    {
      name: '16th Street Mall'
    },
    {
      name: 'Kilgore Books'
    }
  ];

  this.chosenLocation = ko.observable();

  //Function animate the marker that marked
  //the chosen location to draw user attention
  this.searchLocation = function(){
    for (var i = 0; i < locations.length; i++){
      if(locations[i].name === $("#search").text()){
        toggleBounce(markers[i]);
      }
    }
  };
};

//FiltersViewModel utilizes Knockout JS to create
//a dropdown list that allow user to filter for
//what kind of locations they wish to search for.
//If they are looking for bookstore, the object function
//filter and only show the locations that fit in
//the description
var FiltersViewModel = function(){
  this.types = [
    { type: 'Museum' },
    { type: 'Bookstore' },
    { type: 'Entertainment' }
  ];

  this.chosenType = ko.observable();

  //Filter for location based on category
  this.filterLocation = function(){
    for (var i = 0; i < locations.length; i++){
      if(locations[i].category !== $("#choice").text()){
        markers[i].setVisible(false);
      }else {
        markers[i].setVisible(true);
      }
    }
  };

  //Show all markers, including ones that are filtered
  //out
  this.resetType = function() {
    this.chosenType(null);
    for (var i = 0; i < locations.length; i++){
      markers[i].setVisible(true);
    };
  };
}
