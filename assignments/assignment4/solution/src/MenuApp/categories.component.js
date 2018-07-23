(function () {
  'use strict';
  
angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/MenuApp/templates/categories.component.html',
  bindings: {
    items: '<'
  }
});

})();
