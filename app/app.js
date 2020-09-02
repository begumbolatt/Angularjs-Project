var myApp=angular.module('myApp',[]);
myApp.controller('myAppController', function($scope,$http){

  $scope.photo = " ";
  
  $scope.getImage= function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();  
      reader.onload = function (item) {
          document.getElementById("item").src = item.target.result; 
          $scope.photo = item.target.result;
          console.log(item.target.result);
        };
         reader.readAsDataURL(input.files[0]);
        }
       }
      
        $scope.getItem = function () {
            $http.get("/items").then(function (res) {
                console.log(res);
                console.log("Hello");
                $scope.items = res.data;
            })
        }
        $scope.getItem();
        
        $scope.addItem = function () {
          $scope.item.url = $scope.photo;
            $http.post("/items",$scope.item).then(function (res) {
                console.log(res);
                $scope.getItem();
            })
        }

        $scope.removeItem = function(item){
            console.log(item);
            $http.delete('/items/'+ item._id ).then(function (res){
               console.log(res);
               $scope.getItem();
            })
        }
        
        $scope.editItem = function(item) {
            console.log(item);
            $http.get('/items/' + item._id).then(function (res) {
              $scope.item = res.data; 
            })
        }
          
        $scope.update = function() {
            console.log($scope.item._id);
            $scope.item.url=$scope.photo;
            $http.put('/items/' + $scope.item._id, $scope.item).then(function(res) {
                console.log(res);
                $scope.getItem();
            })
        } 

 })