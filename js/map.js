var map;
var locations;
var markers = [];
var largeInfoWindow;
var vm;

locations = [
    {
      name: 'Denver Museum of Nature History',
      location: {lat: 39.7475, lng: -104.9428},
      category: 'Museum',
      key: 'science',
      visible: ko.observable(true)
    },
    {
      name: 'Tattered Cover Book Store',
      location: {lat: 39.740620, lng: -104.956524},
      category: 'Bookstore',
      key: 'book, used',
      visible: ko.observable(true)
    },
    {
      name: 'BookBar',
      location: {lat: 39.7752, lng: -105.0439},
      category: 'Bookstore',
      key: 'book',
      visible: ko.observable(true)
    },
    {
      name: 'Bluebird Theater',
      location: {lat: 39.7403, lng: -104.9484},
      category: 'Entertainment',
      key: 'movie',
      visible: ko.observable(true)
    },
    {
      name: 'Denver Zoo',
      location: {lat: 39.7494, lng: -104.9498},
      category: 'Entertainment',
      key: 'animals',
      visible: ko.observable(true)
    },
    {
      name: '16th Street Mall',
      location: {lat: 39.7478, lng: -104.9949},
      category: 'Entertainment',
      key: 'shopping',
      visible: ko.observable(true)
    },
    {
      name: 'Kilgore Books',
      location: {lat: 39.7367, lng: -104.9790},
      category: 'Bookstore',
      key: 'book, Denver',
      visible: ko.observable(true)
    }
  ];

var nytLoadData = function(key, name){


  var nytimesUrl ="https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytimesUrl += '?' + $.param({
      'api-key': "af75878939f64cd890a0bf968a4f660c",
      'q': key
    });

  //Function used API url, search for article with the
  //word "Denver" and append it to the unordered list
  $.getJSON(nytimesUrl, function(data){

      // $nytHeaderElem.text('News that are brewing in Denver');
      vm.nytHeaderText('News relevant to ' + name);

      articles = data.response.docs;
      var content= "";
      for (var i = 0; i < articles.length; i++) {
          var article = articles[i];

          var snippet;
          if (article.snippet) {
            snippet = article.snippet;
            content += snippet;
          } else {
            snippet = "Snippet not available";
          }

          var articleObject = {
            name: article.headline.main,
            snippet: snippet,
            url: article.web_url
          };
          vm.nytArticles.push(articleObject);

      }


  }).fail(function(e){
    var $nytHeaderElem = $('#nytimes-header');
    $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
  });
};

function initMap(){


  //Constructor for new maps. Initilized as soon as page loaded
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.742043, lng: -104.991531},
    zoom: 13
  });

  largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  var defaultIcon = makeMarkerIcon('20B2AA');
  var highlightedIcon = makeMarkerIcon('FFA07A');
  


  function clickMarker(){
    populateInfoWindow(this, largeInfoWindow);
    toggleBounce(this);
  }

  function mouseOver(){
    this.setIcon(highlightedIcon);
  }

  function mouseOut(){
    this.setIcon(defaultIcon);
  }

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
    locations[i].marker = marker;


    bounds.extend(marker.position);

    //Action listeners for every locations, marker and infowindow
    marker.addListener('click', clickMarker);

    marker.addListener('mouseover', mouseOver);

    marker.addListener('mouseout', mouseOut);

  }
  vm = new viewModel();
  ko.applyBindings(vm);

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
var viewModel = function(){
  var self = this;

  this.allLocations = ko.observableArray(locations);

  this.selectedLocation = ko.observable("");
  
  //Function animate the marker that marked
  //the chosen location to draw user attention
  this.searchLocation = function(location){
    google.maps.event.trigger(location.marker, 'click'); 
    nytLoadData(location.key, location.name);
  };

  this.types = [
    { type: 'Museum' },
    { type: 'Bookstore' },
    { type: 'Entertainment' }
  ];

  this.chosenType = ko.observable('');


  //Filter for location based on category
  this.filterLocation = function(location){
    for (var i = 0; i < locations.length; i++){
      if(locations[i].category !== self.chosenType().type){
        markers[i].setVisible(false);
        self.allLocations[i].visible(false);
      }else if (locations[i].category === self.chosenType().type){
        markers[i].setVisible(true);
        self.allLocations[i].visible(true);
      }
    }
  };

  //Show all markers, including ones that are filtered
  //out
  this.resetType = function() {
    this.chosenType(null);
    for (var i = 0; i < locations.length; i++){
      markers[i].setVisible(true);
      self.allLocations[i].visible(true);
      
    }
  };

  this.showListings = function() {
    for(var i = 0; i < markers.length; i++){
      markers[i].setVisible(true);
    }
  };

  this.hideListings = function(){
    for(var i = 0; i < markers.length; i++){
      markers[i].setVisible(false);
    }
  };

  this.nytArticles = ko.observableArray();
  this.nytHeaderText = ko.observable('NYT Articles Today');
};




