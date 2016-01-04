angular.module('mainApp',['ngResource','firebase'])
    .constant('FIREBASE_URL','<< FIREBASE_URL >>')
    .config(function() {})
    .factory('myService', function ($firebaseArray,FIREBASE_URL) {
        var fb =  new Firebase(FIREBASE_URL);
        var ref = $firebaseArray(fb);

        var nameService = {
            all : ref,
            update : function(name){

                var index = ref.$indexFor(name.$id);
                ref[index].first = name.first;
                ref[index].last = name.last;
                return  ref.$save(index);
            },
            delete : function(id){
                console.log("$id in MyService",id);
                var itemRef = new Firebase(FIREBASE_URL + id);
                itemRef.remove();
            }
        };

        return nameService
    })
    .controller('appController', ['$scope','myService',function ($scope,myService) {

        $scope.nameList = myService.all;

        $scope.showEdit =false;



        $scope.editname = {
            $id:null,
            first:null,
            last:null
        };

        $scope.name = {
            first:null,
            last:null
        };

        $scope.save = function(user){

            $scope.nameList.$add({ first: user.first, last: user.last}).then(function(res){
                console.log("Add Responce");
                console.log(res);
                $scope.name.first = null;
                $scope.name.last = null;
            });

        };
        $scope.enableEdit = function(name){

            $scope.showEdit =true;
            $scope.editname.$id = name.$id;
            $scope.editname.first = name.first;
            $scope.editname.last = name.last;

        };

        $scope.edit = function(name){
            console.log("Edit : ",name.$id);
           myService.update(name).then(function(result){
               $scope.showEdit = false;
           });
        };

        $scope.delete = function(name){
            myService.delete(name.$id);
        }
    }]);
