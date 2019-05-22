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

//Pick ten brands for users to select
//Maybelline, l'oreal, milani, colorpop, covergirl (shoppers brands)
// clinique, fenty, benefit, smashbox, dior (sephora)
//Category - blush, bronzer, eyebrow, eyeliner, eyeshadow, foundation, lip liner, lipstick, mascara, nail polish
//price range - 0-20; 20-40; 40-60; 60+


