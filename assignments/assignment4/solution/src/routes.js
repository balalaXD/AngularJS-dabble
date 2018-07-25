(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/MenuApp/templates/home.view.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/MenuApp/templates/menuapp.view.html',
    controller: 'categoriesControllers as categoriesList',
    resolve: {
      categoriesData: ['MenudataService', function (MenudataService) {
        return MenudataService.getAllCategories();
      }]
    }
  })

  // Item detail
  .state('categories.items', {
    url: '/{categoryShortName}',
    templateUrl: 'src/MenuApp/templates/items.view.html',
    controller: 'ItemsController as itemsCtrl',
    resolve: {
      itemsData: ['MenudataService', '$stateParams',
      function (MenudataService, $stateParams) {
        return MenudataService.getItemsForCategory($stateParams.categoryShortName);
      }]
    }
  });

}

})();
