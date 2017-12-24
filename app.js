var L = require('leaflet');
var omnivore = require('leaflet-omnivore');

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

var map = L.map('map');
var layer = Tangram.leafletLayer({
  scene: 'scene.yaml'
})
layer.addTo(map);
map.setView([23.5515, 87.2963], 14);

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
        map.eachLayer(function (layer) {
              map.remove(layer);
        });
        map = L.map('map');
        layer = Tangram.leafletLayer({
          scene: 'scene.yaml'
        })
        layer.addTo(map);
        map.setView([23.5515, 87.2963], 14);

        for(var i=0;i<file_arr.length;i++) {
          if(file_arr[i]!=null)
          {
            omnivore.kml('./kml-files/'+file_arr[i]).addTo(map);
          }
        }
        oldFile=file_arr;
      }
    }
  });
  },1000);