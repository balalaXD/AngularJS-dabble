(function () {
'use strict';

angular.module('MenuApp')
.controller('categoriesControllers', categoriesControllers);

categoriesControllers.$inject = ['MenudataService', 'categoriesData'];
function categoriesControllers(MenudataService, categoriesData) {
  var categoriesCtrl = this;
  categoriesCtrl.items = categoriesData;
}

})();
