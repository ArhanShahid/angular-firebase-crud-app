app.factory('myService', function ($firebaseArray) {
    var ref = firebase.database().ref();
    // var fb =  new Firebase('');
    //  var ref = $firebaseArray(fb);

    return {
        all: ref,
        update: function (name) {
            var index = ref.$indexFor(name.$id);
            ref[index].first = name.first;
            ref[index].last = name.last;
            return ref.$save(index);
        },
        delete: function (id) {
            console.log("$id in MyService", id);
            var itemRef = new Firebase(FIREBASE_URL + id);
            itemRef.remove();
        }
    };
});

