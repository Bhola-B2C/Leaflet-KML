var L = require('leaflet');
var omnivore = require('leaflet-omnivore');

var mymap = L.map('map').setView([23.552488, 87.293613],15);
var f = require('fs');

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
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

/*f.watch("./kml-files", { persistent: true }, function (event, filename) {
  location.reload();
});*/
var oldFile=[];

setInterval(function(){
  getJSON(window.location.protocol + '//'+ window.location.hostname + ':3030',
  function(err, data) {
    if (err !== null) {
      alert('Something went wrong: ' + err);
    }
    else {
      var file_arr = Object.values(data);
      //console.log(oldFile);
      //console.log(file_arr);

      var flag = false;
        if(oldFile.length!==file_arr.length)
          flag=true;
        if(oldFile.length === file_arr.length){
          for(var i=0;i<oldFile.length;i++){
            if(oldFile[i]!==file_arr[i]){
              flag=true;
            }
          }
        }

      //console.log(flag);
      if(flag) {
        mymap.eachLayer(function (layer) {
              mymap.remove(layer);
        });
        mymap = L.map('map').setView([23.552488, 87.293613],15);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoiYmhvbGEtYjJjIiwiYSI6ImNqYmdicWlmMDFnM2IycnF3bm9meDlieDIifQ.6edZqKmL3_kl0crsw-UQvw'
        }).addTo(mymap);
        for(var i=0;i<file_arr.length;i++) {
          if(file_arr[i]!=null)
          {
            omnivore.kml('./kml-files/'+file_arr[i]).addTo(mymap);
          }
        }
        oldFile=file_arr;
      }
    }
  });
  },1000);

/*console.log(window.location.protocol);
console.log(window.location.hostname);
getJSON(window.location.protocol + '//'+ window.location.hostname + ':3030',
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    var file_arr = Object.values(data);
    for(var i=0;i<file_arr.length;i++) {
      if(file_arr[i]!=null)
      {
    	 console.log(file_arr[i]);
    	 omnivore.kml('./kml-files/'+file_arr[i]).addTo(mymap);
      }
    }
  }
});*/