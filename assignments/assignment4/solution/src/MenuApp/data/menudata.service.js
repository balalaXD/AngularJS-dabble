(function () {
  'use strict';
  
  angular.module('data')
  .service('MenudataService', MenudataService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")

  MenudataService.$inject = ['$http', 'ApiBasePath']
  function MenudataService($http, ApiBasePath) {
    var service = this;
  
    service.getAllCategories = function () {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      }).then(function (response) {
        return response.data;
      })
    };

    service.getItemsForCategory = function (categoryShortName) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {
          category: categoryShortName
        }
      }).then(function (response) {
        return response.data['menu_items'];
      })
    }
    
  }
})();
  