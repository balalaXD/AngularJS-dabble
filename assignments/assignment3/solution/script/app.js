(function () {
  'use strict';

  angular.module('NarrowItApp', [])
   .controller('NarrowItDownController', NarrowItDownController)
   .service('MenuSearchService', MenuSearchService)
   .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
   .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService) {
    var list = this;
    list.searchItem = "";
    list.found = [];

    list.search = function (searchItem) {
      if (searchItem === "") {
        list.found = [];
        return;
      }
      
      var promise = MenuSearchService.getMatchedMenuItems(list.searchItem);
      promise.then(function (match_items) {
        list.found = match_items
      })
      .catch(function (error) {
        console.log(error)
      })
    }

    list.removeItem = function (itemIndex) {
      return list.found.splice(itemIndex, 1);
    }
  }

  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'loader/itemsloaderindicator.template.html',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      link: FoundItemsDirectiveLink,
      bindToController: true
    };
  
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;
  
    list.isEmpty = function () {
      return !list.foundItems.length;
    };
  }

  function FoundItemsDirectiveLink(scope, element, attrs, controller) {
    scope.$watch('list.isEmpty()', function (newValue, oldValue) {
      if (newValue === true) {
        displayWarning();
      }
      else {
        hideWarning();
      }
    });
  
    function displayWarning() {
      var warningElem = element.find("div.alert");
      warningElem.css('display', 'block');
    }
  
    function hideWarning() {
      var warningElem = element.find('div.alert');
      warningElem.css('display', 'none');
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService ($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      var promise = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return promise.then(function (response) {
        var menu_items = response.data["menu_items"];
        var menu_match_items = menu_items.filter(
          (item) => item["description"].indexOf(searchTerm) !== -1)

        return menu_match_items;
      })
    }
  }
})();