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
  });
}
//image, description, title, price, product url. 
makeup.displayItems = function(results){
  results.forEach(item => {
    const $productContainer = $('<div>').attr("class", "productContainer");
    const { name, image_link, price, description, product_link, product_colors} = item;

    const $image = $(`<div class="productImage"><img src=${image_link} alt=${name} ></div>`);
    const $colorContainer = $("<ul class='colorSwatches'> </ul>");
    const $color = product_colors.forEach(item => {
      const { hex_value, colour_name} = item;
      $colorLi = $(`
        <li aria-live="polite" aria-label=${colour_name}>
          <div class="swatchItem" style="background: ${hex_value};"></div>
        </li>
      `);
      $colorContainer.append($colorLi);
    });
    const $title = $(`<h3> ${name}</h3>`);
    const $price =$(`<div class="price">$ ${price}</div>`);
    const $description = $(`<div class="description"> ${description}</div>`);
    const $productLink =$(`<a class="productLink" href=${product_link}>Go to Store</a>`);
    
    $productContainer.append($image, $colorContainer, $title, $price, $description, $productLink);
    $(".recommendations").append($productContainer);
  })
};


//Pick ten brands for users to select
//Maybelline, l'oreal, milani, colorpop, covergirl (shoppers brands)
// clinique, fenty, benefit, smashbox, dior (sephora)
//Category - blush, bronzer, eyebrow, eyeliner, eyeshadow, foundation, lip liner, lipstick, mascara, nail polish
//price range - 0-20; 20-40; 40-60; 60+


makeup.init = function() {
  $('form').on('submit', function(e){
    $('.recommendations').empty();

    e.preventDefault();
    const $selectElements = $("select");
    const $category = $('#category');
    const $brand = $('#brand');
    const $price = $('#price');

    const userCategory = $category.children("option:selected").val();
    const userBrand = $brand.children("option:selected").val();
    const userPrice = $price.children("option:selected").val();
    
    if(userCategory == "category" || userBrand == "brand" || userPrice =="price"){
      console.log(true);
    }

    const userResults = $(`<div class="searchResult">selected category = ${userCategory} selected brand = ${userBrand} selected price = ${userPrice}</div>`);
    $('.recommendations').append(userResults);


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

    makeup.smoothScroll();
    
  })
}
makeup.smoothScroll = function(){
  $('html, body').animate(
    {
      scrollTop: $($("input[type=submit]").attr('href')).offset().top,
    },
    500,
    'linear'
  )
}
$(function(){
  $('h1').fadeIn('3000');
  makeup.init();
});