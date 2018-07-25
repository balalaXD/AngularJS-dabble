(function () {
  'use strict';
  
  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);
  
  ItemsController.$inject = ['$stateParams', 'itemsData'];
  function ItemsController($stateParams, itemsData) {
    var itemsCtrl = this;
    itemsCtrl.title = $stateParams.categoryShortName;
    itemsCtrl.items = itemsData;
  }
  
  })();
  