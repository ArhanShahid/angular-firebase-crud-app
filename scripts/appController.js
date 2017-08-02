app.controller('appController', ['$scope', 'fbService', function ($scope, fbService) {

    var data = fbService.data;
    $scope.dataList = [];
    $scope.showEdit = false;
    $scope.editData = {
        id: null,
        name: null,
        contact: null
    };
    $scope.newData = {
        name: null,
        contact: null
    };

    function getData() {
        $scope.dataList = [];
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
    }

    getData();

    $scope.save = function (obj) {
        if (obj.name && obj.contact) {
            data.push({name: obj.name, contact: obj.contact});
            getData();
        } else {
            alert("Required data missing.")
        }

    };
    $scope.enableEdit = function (data) {
        $scope.editData = {
            id: data.id,
            name: data.name,
            contact: data.contact
        };
        $scope.showEdit = true;

    };

    $scope.edit = function (obj) {
        if (obj.id && obj.name && obj.contact) {
            data.child(obj.id).set({name: obj.name, contact: obj.contact});
            $scope.editData = {
                id: null,
                name: null,
                contact: null
            };
            $scope.showEdit = false;
             getData();
        } else {
            alert("Required data missing.")
        }
    };

    $scope.delete = function (obj) {
        data.child(obj.id).remove().then(function () {
            $scope.dataList.splice(search(obj.id, $scope.dataList), 1);
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
