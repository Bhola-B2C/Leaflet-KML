var L = require('leaflet');
var omnivore = require('leaflet-omnivore');
var ip = require('ip');
var add = ip.address();

var mymap = L.map('map').setView([23.552488, 87.293613],15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18,
    	id: 'mapbox.streets',
    	accessToken: 'pk.eyJ1IjoiYmhvbGEtYjJjIiwiYSI6ImNqYmdicWlmMDFnM2IycnF3bm9meDlieDIifQ.6edZqKmL3_kl0crsw-UQvw'
}).addTo(mymap);

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};
console.log('http://'+add+':3000/');
getJSON('http://'+add+':3000/',
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    var file_arr = Object.values(data);
    for(var i=0;i<file_arr.length;i++) {
    	console.log(file_arr[i]);
    	omnivore.kml('./kml-files/'+file_arr[i]).addTo(mymap);
    }
  }
});