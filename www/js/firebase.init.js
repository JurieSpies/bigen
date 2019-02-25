angular.module('firebaseConfig', ['firebase'])

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBPWAo9X3XYTd_VTkmwC5Mi9DU-nSx308w",
    authDomain: "jurie-oefen.firebaseapp.com",
    databaseURL: "https://jurie-oefen.firebaseio.com",
    storageBucket: "jurie-oefen.appspot.com",
  };
  firebase.initializeApp(config);

})

/*

.service("TodoExample", ["$firebaseArray", function($firebaseArray){
    var ref = firebase.database().ref().child("todos");
    var items = $firebaseArray(ref);
    var todos = {
        items: items,
        addItem: function(title){
            items.$add({
                title: title,
                finished: false
            })
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    return todos;
}])

*/