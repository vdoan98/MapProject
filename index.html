<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">

    <link rel="stylesheet" href="css/style.css">


    <style>
      @media screen and (max-width: 600px){
        #dropdown-content {
            display: none;
            width: 100%;
            height: 100%;
            position: fixed;
            left: 0;
            top: 20px;
        }
      }


      #dropdown-content{
        display: block;
      }
    </style>


  </head>

  <body>
    <div class="container">
      <div id="map"></div>
      <div class="column">
        <div class="col-6 dropdown">
          <button id="dropbtn" onclick="toggleMenu()">Menu</button>

          <div id="dropdown-content" style="">
            <h1> Welcome to Denver!</h1>
            <div>
              <input id="show-listings" type="button" value="Show Listings" data-bind="click: showListings">
              <input id="hide-listings" type="button" value="Hide Listings" data-bind="click: hideListings">
            </div>
            <script src="js/knockout-3.4.2.js"></script>


            <div id="search-box">
              <h2> What is your next destination?</h2>

              Search for location:

              <ul data-bind="foreach: allLocations">
                <li data-bind="text: name,
                              value: status,
                              click: $root.searchLocation,
                              visible: visible"></li>
              </ul>

              <!-- <select multiple="multiple" size= "3" type="text" data-bind="options: allLocations, value: selectedLocation"> </select> -->

              <!-- <button data-bind="enable: selectedLocation,
                                click: searchLocation">Search</button> -->

              
            </div>


            <div id="filterCheckBox">
              <h2>What are you looking for?</h2>

              Filter locations:
              <select data-bind="options: types,
                                optionsCaption: 'Filter...',
                                optionsText: 'type',
                                value: chosenType"></select>
              <button data-bind="enable: chosenType,
                                click: filterLocation">Filter</button>
              <button data-bind="enable: chosenType,
                                click: resetType">Clear</button>

              <p data-bind="with: chosenType">
                Good choice! Here are the <span data-bind= "text: type" id="choice"></span> locations.
              </p>


            </div>

          </div>
        </div>
      </div>

      <div class="column">
        <div class="col-12">
          <h1 id="nytimes-header" data-bind="text: nytHeaderText"></h1>
          <div class="article-container">
            <ul id="nytimes-articles" class="article-list" data-bind="foreach: nytArticles">
              <li class="article"><a data-bind="attr: { href: url, title: name }, text: name"></a><p data-bind="text: snippet"></p></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <script src="js/libs/jquery.min.js"></script>
    <script defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUxoO8IVbqCc8vuKGTGSS0sIzQhcdPs5s&callback=initMap" onerror="googleError()">
    </script>
    <script type="text/javascript" src="js/map.js"></script>

    <script>
      function toggleMenu() {
        var x = document.getElementById('dropdown-content');
        if (x.style.display === 'none') {
          x.style.display = 'block';
        } else {
          x.style.display = 'none';
        }
      }
    </script>
  </body>
</html>
