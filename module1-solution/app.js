(function () {
  angular.module('LunchCheck', [])
   .controller('LunchCheckController', func);

  func.$inject = ['$scope']
  function func ($scope) {
    $scope.foodInput = "";
    $scope.message = "";
    $scope.messageColor = "";
    $scope.borderColor = "";

    $scope.check = function () {
      items = $scope.foodInput.split(',').filter(s => s.trim().length);
      amount = items.length;
      
      if (amount === 0) {
        $scope.borderColor = "borderRed";
        $scope.messageColor = "red";
        $scope.message = "Please enter data first";
      }
      else if (amount <= 3) {
        $scope.borderColor = "borderGreen";
        $scope.messageColor = "green";
        $scope.message = "Enjoy!";
      }
      else if (amount > 3) {
        $scope.borderColor = "borderRed";
        $scope.messageColor = "red";
        $scope.message = "Too much!";
      }
    }
  }
})();