var map;
var locations;
var markers = [];
var infoWindows = [];

var nytLoadData = function(key, name){
  var $nytHeaderElem = $('#nytimes-header');
  var $nytElem = $('#nytimes-articles');

  $nytElem.text("");

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
      for (var i = 0; i < articles.length; i++) {
          var article = articles[i];

          var snippet;
          if (article.snippet) {
            snippet = article.snippet;
          } else {
            snippet = "Snippet not available";
          }

          var articleObject = {
            name: article.headline.main,
            snippet: snippet,
            url: article.web_url
          };
          vm.nytArticles.push(articleObject);


          // $nytElem.append('<li class="article">'+
          //     '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
          //     '<p>' + article.snippet + '</p>'+
          // '</li>');
      }

  }).error(function(e){
      $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
  });
};

function initMap(){

  // var nyt = new nytLoadData("denver");

  //Constructor for new maps. Initilized as soon as page loaded
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.7475, lng: -104.9428},
    zoom: 13
  });

  var largeInfoWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  var defaultIcon = makeMarkerIcon('20B2AA');
  var highlightedIcon = makeMarkerIcon('FFA07A');

  locations = [
    {
      name: 'Denver Museum of Nature History',
      location: {lat: 39.7475, lng: -104.9428},
      category: 'Museum',
      key: 'science'
    },
    {
      name: 'Tattered Cover Book Store',
      location: {lat: 39.740620, lng: -104.956524},
      category: 'Bookstore',
      key: 'book'
    },
    {
      name: 'BookBar',
      location: {lat: 39.7752, lng: -105.0439},
      category: 'Bookstore',
      key: 'book'
    },
    {
      name: 'Bluebird Theater',
      location: {lat: 39.7403, lng: -104.9484},
      category: 'Entertainment',
      key: 'movie'
    },
    {
      name: 'Denver Zoo',
      location: {lat: 39.7494, lng: -104.9498},
      category: 'Entertainment',
      key: 'animals'
    },
    {
      name: '16th Street Mall',
      location: {lat: 39.7478, lng: -104.9949},
      category: 'Entertainment',
      key: 'shopping'
    },
    {
      name: 'Kilgore Books',
      location: {lat: 39.7367, lng: -104.9790},
      category: 'Bookstore',
      key: 'book'
    }
  ];


  function clickMarker(marker, infowindow){
    populateInfoWindow(marker, infowindow);
    toggleBounce(marker);
  };

  function mouseOver(marker, highlight){
    marker.setIcon(highlight);
  };

  function mouseOut(marker, defaultIcon){
    marker.setIcon(defaultIcon);
  };

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
    var self = this;

    markers.push(marker);
    infoWindows.push(largeInfoWindow);

    bounds.extend(marker.position);

    //Action listeners for every locations, marker and infowindow
    marker.addListener('click', clickMarker(self, largeInfoWindow));

    marker.addListener('mouseover', mouseOver(self, highlightedIcon));

    marker.addListener('mouseout', mouseOut(self, defaultIcon));

  }

}


// function clickMarker(marker, infowindow){
//   populateInfoWindow(marker, infowindow);
//   toggleBounce(marker);
// };
//
// function mouseOver(marker, highlight){
//   marker.setIcon(highlight);
// };
//
// function mouseOut(marker, defaultIcon){
//   marker.setIcon(defaultIcon);
// };


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
  this.locations = [
    {
      name: 'Denver Museum of Nature History',
      key: 'science'
    },
    {
      name: 'Tattered Cover Book Store',
      key: 'book'
    },
    {
      name: 'BookBar',
      key: 'book'
    },
    {
      name: 'Bluebird Theater',
      key: 'movie'
    },
    {
      name: 'Denver Zoo',
      key: 'animals'
    },
    {
      name: '16th Street Mall',
      key: 'shopping'
    },
    {
      name: 'Kilgore Books',
      key: 'book'
    }
  ];

  this.chosenLocation = ko.observable();

  //Function animate the marker that marked
  //the chosen location to draw user attention
  this.searchLocation = function(){
    for (var i = 0; i < locations.length; i++){
      if(locations[i].name === $("#search").text()){
        toggleBounce(markers[i]);
        new nytLoadData(locations[i].key, locations[i].name);
      }
    }
  };

  this.types = [
    { type: 'Museum' },
    { type: 'Bookstore' },
    { type: 'Entertainment' }
  ];

  this.chosenType = ko.observable();

  //Filter for location based on category
  this.filterLocation = function(){
    for (var i = 0; i < locations.length; i++){
      if(locations[i].category !== self.chosenType().type){
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

  this.showListings = function() {
    for(var i = 0; i < markers.length; i++){
      markers[i].setVisible(true);
    }
  }

  this.hideListings = function(){
    for(var i = 0; i < markers.length; i++){
      markers[i].setVisible(false);
    }
  }

  this.nytArticles = ko.observableArray();
  this.nytHeaderText = ko.observable('NYT Articles Today');
};


var vm = new viewModel();
ko.applyBindings(vm);
vm.searchLocation;
vm.filterLocation;
