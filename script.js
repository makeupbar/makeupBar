const makeup = [];
makeup.items = function(brand, productType,price) {
  $.ajax({
    url: `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${productType}&price_less_than=${price}`,
    method: 'GET',
    dataType: 'json'
  }).then(function(results){
    console.log(results);
  });
}

makeup.items('maybelline', 'lipstick', 20);

// let productType = ["bronzer", "lip_liner"]
