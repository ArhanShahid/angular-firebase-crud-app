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

    $scope.save = function () {
        data.push({name: 'Arhan', contact: '0333333333'});
        getData();
    };
    $scope.enableEdit = function (data) {
        $scope.showEdit = true;
        $scope.editData.$id = data.id;
        $scope.editData.name = data.name;
        $scope.editData.contact = data.contact;

    };

    $scope.edit = function (name) {
        console.log("Edit : ", name.$id);
        // fbService.update(name).then(function (result) {
        //     $scope.showEdit = false;
        // });
    };

    $scope.delete = function (obj) {
        data.child(obj.id).remove().then(function () {
            $scope.dataList.splice(search(obj.id, $scope.dataList), 1);
            $scope.$apply();
        });
    };

    function search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].id == nameKey) {
                return i;
            }
        }
    }

}]);
