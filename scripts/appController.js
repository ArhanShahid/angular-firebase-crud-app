app.controller('appController', ['$scope', 'myService', function ($scope, myService) {

    $scope.nameList = myService.all;
    console.log("ALL");


    // firebase.database().ref('users/').set({
    //     username: 'Arhan',
    //     email: 'a@a.com'
    // });
    var user =  firebase.database().ref('users/');

    user.on('child_added', function(data) {
        console.log('child_added');
        console.log(data.val());
    });
    //
    // user.push({name: 'Arhan', email: 'a@a.com'});

    // var aa  = firebase.database().ref('users/').once('value').then(function(users) {
    //     console.log(users.val());
    // });

    var aax  = firebase.database().ref('users/').once('value').then(function(users) {
        console.log(users.val());
    });

    $scope.showEdit = false;


    $scope.editname = {
        $id: null,
        first: null,
        last: null
    };

    $scope.name = {
        first: null,
        last: null
    };

    $scope.save = function () {
        user.push({name: 'Arhan', email: 'a@a.com'});
        // $scope.nameList.$add({first: user.first, last: user.last}).then(function (res) {
        //     console.log("Add Responce");
        //     console.log(res);
        //     $scope.name.first = null;
        //     $scope.name.last = null;
        // });

    };
    $scope.enableEdit = function (name) {

        $scope.showEdit = true;
        $scope.editname.$id = name.$id;
        $scope.editname.first = name.first;
        $scope.editname.last = name.last;

    };

    $scope.edit = function (name) {
        console.log("Edit : ", name.$id);
        myService.update(name).then(function (result) {
            $scope.showEdit = false;
        });
    };

    $scope.delete = function (name) {
        myService.delete(name.$id);
    }
}]);
