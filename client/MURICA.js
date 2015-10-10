var INSTAID = '97773eaa6e4c4defa77d4c49b137a01d';
var ACCESSTOKEN = "";
Meteor.startup(function() {

  getNewPhotos({lat: '37.538950', lng:'126.990399', distance:'300'});


});

Deps.autorun(function(){

  if(Meteor.user()){
    Meteor.call("getAccessToken", function(error, accessToken){
       ACCESSTOKEN = accessToken;
    })
  }
})

Template.insta.photoset = function(){
  return Session.get('photoset');
}

function showIt(json){
  var myData = json.data;
    for (var i = 0; i < myData.length; i++) {
      // get lat, lng data this way
      //  myData[i].location.latitude, myData[i].location.longitude
      console.log(myData[i].images.low_resolution.url);
    }

    Session.set('photoset', myData);
  console.log(myData);
  // show all images on screen
}

var getNewPhotos = function (data) {
  $.ajax({
    url: 'https://api.instagram.com/v1/media/search?callback=?',
    dataType: 'json',
    data: {'order': '-createdAt', lat: data.lat, lng: data.lng, distance:data.dist, client_id: INSTAID, access_token: ACCESSTOKEN},
    success: showIt,
    statusCode: {
      500: function () {
        alert('Sorry, service is temporarily down.');
      }
    }
  });
};
