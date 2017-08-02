app.controller('appController', ['$scope', 'fbService', function ($scope, fbService) {

    $scope.dataList = [];
    $scope.nameList = [];

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
        //  console.log('child_added');
        //  console.log(res.key);
        //  console.log(res.val());
        // $scope.dataList = res.val();
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
        data.push({name: 'Arhan', contact: '0333333333'});
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
        // fbService.update(name).then(function (result) {
        //     $scope.showEdit = false;
        // });
    };

    $scope.delete = function (name) {
        // fbService.delete(name.$id);
    }
}]);
