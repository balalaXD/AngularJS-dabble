(function () {
  'use strict';
  
angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/MenuApp/templates/items.template.html',
  bindings: {
    items: '<'
  }
});

})();
