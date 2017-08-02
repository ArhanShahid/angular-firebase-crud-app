app.controller('appController', ['$scope', 'fbService', function ($scope, fbService) {

    $scope.dataList = [];

    var db = fbService.db;
    var data = fbService.data;

    data.once('value').then(function (res) {
        res.forEach(function (item) {
            $scope.dataList.push({
                id: item.key,
                name: item.val().name,
                contact: item.val().contact
            })
        });
        $scope.$apply();
    });

    data.on('child_added', function (res) {
        // $scope.dataList.push({
        //     id: res.key,
        //     name: res.val().name,
        //     contact: res.val().contact
        // });
    });

    data.on('child_removed', function (res) {
        console.log('child_removed')
    })

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
        data.push({name: 'Arhan', contact: '0333333333'});
    };
    $scope.enableEdit = function (name) {
        $scope.showEdit = true;
        $scope.editname.$id = name.$id;
        $scope.editname.first = name.first;
        $scope.editname.last = name.last;

    };

    $scope.edit = function (name) {
        console.log("Edit : ", name.$id);
        // fbService.update(name).then(function (result) {
        //     $scope.showEdit = false;
        // });
    };

    $scope.delete = function (obj) {
        data.child(obj.id).remove().then(function () {
            $scope.dataList.splice(search(obj.id, $scope.dataList), 1)
            $scope.$apply();
        });
    };

    function search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].id === nameKey) {
                return i;
            }
        }
    }

}]);
