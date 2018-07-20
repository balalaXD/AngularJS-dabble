(function () {
  'use strict';

  angular.module('LunchCheck', [])
   .controller('ToBuyController', ToBuyController)
   .controller('AlreadyBoughtController', AlreadyBoughtController)
   .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController (ShoppingListCheckOffService) {
    var shopList = this;

    shopList.items = ShoppingListCheckOffService.getShopItems();

    shopList.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController (ShoppingListCheckOffService) {
    var boughtList = this;
    
    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  }


  function ShoppingListCheckOffService() {
    var service = this;

    var shopItems = [
      { name: "cookies", quantity: 10 },
      { name: "watermelons", quantity: 3 },
      { name: "Bombs", quantity: 4 },
      { name: "Bullets", quantity: 50 },
      { name: "milks", quantity: 3 }
    ];

    var boughtItems = [];

    service.removeItem = function (itemIndex) {
      var singleItemArray = shopItems.splice(itemIndex, 1);
      return singleItemArray[0];
    }

    service.getShopItems = function () {
      return shopItems;
    }

    service.getBoughtItems = function() {
      return boughtItems;
    }

    service.buyItem = function (itemIndex) {
      var boughtItem = service.removeItem(itemIndex);
      boughtItems.push(boughtItem);
    }
  }
})();