const makeup = {};
// ?brand = ${ brand }& product_type=${ productType }& price_less_than=${ lessThanPrice }& price_greater_than=${ greaterThanPrice }



makeup.getItems = function(brand, productType,lessThanPrice, greaterThanPrice) {
  $.ajax({
    url: `http://makeup-api.herokuapp.com/api/v1/products.json`,
    method: 'GET',
    dataType: 'json',
    data: {
      brand: brand,
      product_type: productType,
      price_less_than: lessThanPrice,
      price_greater_than: greaterThanPrice
    }
  }).then(function(results){
   console.log(makeup)
    makeup.displayItems(results);
    // add append html function
  });
}
//image, description, title, price, product url. 
makeup.displayItems = function(results){
  results.forEach(item => {
    const $productContainer = $('<div>').attr("class", "productContainer");
    const { name, image_link, price, description, product_link, product_colors} = item;
    console.log(name, image_link, price, description, product_link, product_colors);
    const $image = $(`<img src=${image_link} alt=${name} >`);
    const $colorContainer = $("<div>");
    const $color = product_colors.forEach(item => {
      const {hex_value} = item;
      $colorSpan = $('<span>').css('background',`${hex_value}`);
      $colorContainer.append($colorSpan);
    });
    const $title = $(`<h3> ${name}</h3>`);
    const $price =$(`<div class="price">${price}</div>`);
    const $description = $(`<div class="description"> ${description}</div>`);
    const $productLink =$(`<a class="productLink" href=${product_link}>Go to Store</a>`);
    
    $productContainer.append($image, $colorContainer, $title, $price, $description, $productLink);
    $(".recommendations").append($productContainer);
  })
};

// makeup.getItems('maybelline', 'lipstick', 20);

//Pick ten brands for users to select
//Maybelline, l'oreal, milani, colorpop, covergirl (shoppers brands)
// clinique, fenty, benefit, smashbox, dior (sephora)
//Category - blush, bronzer, eyebrow, eyeliner, eyeshadow, foundation, lip liner, lipstick, mascara, nail polish
//price range - 0-20; 20-40; 40-60; 60+


makeup.init = function() {
  $('form').on('submit', function(e){
    e.preventDefault();
    const $selectElements = $("select");
    const $category = $('#category');
    const $brand = $('#brand');
    const $price = $('#price');

    const userCategory = $category.children("option:selected").val();
    const userBrand = $brand.children("option:selected").val();
    const userPrice = $price.children("option:selected").val();

    if (userPrice == "60+"){
      let greaterThanPrice = 60;
      let lessThanPrice = 1000;
      makeup.getItems(userBrand, userCategory, lessThanPrice, greaterThanPrice);
    }
    else if (userPrice === "40-60"){
      let lessThanPrice = 60;
      let greaterThanPrice = 40;
      makeup.getItems(userBrand, userCategory, lessThanPrice, greaterThanPrice);
    }
    else if (userPrice == "20-40"){
      let lessThanPrice = 40;
      let greaterThanPrice = 20;
      makeup.getItems(userBrand, userCategory, lessThanPrice, greaterThanPrice);
    }
    else {
      let lessThanPrice = 20;
      let greaterThanPrice = 0;
      makeup.getItems(userBrand, userCategory, lessThanPrice, greaterThanPrice);
    
    }
    // selectElements.each(function(){
    //   const value = $(this).children("option:selected").val();
    //   console.log(value);
    // })
    //.children("option:selected").val();
    
  })
}

makeup.init();