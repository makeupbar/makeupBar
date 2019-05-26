const makeup = {};


makeup.modal = function (category, brand) {
  if (category == "category" || brand == "brand") {
    $(".modalContainer").show(200);
    $(".goBack").click(function () {
      location.reload();
    })
  }
}


makeup.getItems = function(brand, productType,lessThanPrice, greaterThanPrice) {
  $.ajax({
    url: `https://makeup-api.herokuapp.com/api/v1/products.json`,
    method: 'GET',
    dataType: 'json',
    data: {
      brand: brand,
      product_type: productType,
      price_less_than: lessThanPrice,
      price_greater_than: greaterThanPrice
    }
  }).then(function(results){
    makeup.displayItems(results);
  });
}


makeup.displayItems = function(results){  
  const resultNum = $(`<h2>there are ${results.length} results</h2>`);
  $('.searchResult').prepend(resultNum);
  results.forEach((item, index) => {
    const $productContainer = $(`<div>`).attr("class", "productContainer");
    const { name, image_link, price, description, product_link, product_colors} = item;

    const $image = $(`<div class="productImage"><img src=${image_link} alt="${name}" ></div>`);
    const $colorContainer = $("<ul class='colorSwatches'> </ul>");
    const $color = product_colors.forEach(item => {
      const { hex_value, colour_name} = item;
      $colorLi = $(`
        <li aria-live="polite" aria-label="${colour_name}">
          <div class="swatchItem" title="${colour_name}" style="background: ${hex_value};"></div>
        </li>
      `);
      $colorContainer.append($colorLi);
    });
    const decimalPrice = (parseFloat(price).toFixed(2));
    const $title = $(`<h3> ${name}</h3>`);
    const $price =$(`<div class="price">$ ${decimalPrice}</div>`);
    const $description = $(`<div class="description"> ${description}</div>`);
    const $productLink = $(`<div class="storeLink" tabindex=${index + 10}><a class="productLink" href=${product_link}>Go to Store</a></div>`);
    
    $productContainer.append($image, $colorContainer, $title, $price, $description, $productLink);
    $(".recommendations").append($productContainer);
  })
};


makeup.searchResultsPara = function(category, brand, price) {
  const userResults = $(`
    <div class="searchResult">
      <div class="userSelected">
        <h2><em>selected category :</em> ${category}</h2>   
        <h2><em>selected brand :</em> ${brand}</h2>
        <h2><em>selected price :</em> ${price}</h2>
      </div>
    </div>
  `);
  $('.recommendations').append(userResults);
}


makeup.filterPriceResults = function(userPrice, userBrand, userCategory) {
  if (userPrice == "60+") {
    let greaterThanPrice = 60;
    let lessThanPrice = 1000;
    makeup.getItems(userBrand, userCategory, lessThanPrice, greaterThanPrice);
  }
  else if (userPrice === "40-60") {
    let lessThanPrice = 60;
    let greaterThanPrice = 40;
    makeup.getItems(userBrand, userCategory, lessThanPrice, greaterThanPrice);
  }
  else if (userPrice == "20-40") {
    let lessThanPrice = 40;
    let greaterThanPrice = 20;
    makeup.getItems(userBrand, userCategory, lessThanPrice, greaterThanPrice);
  }
  else {
    let lessThanPrice = 20;
    let greaterThanPrice = 0;
    makeup.getItems(userBrand, userCategory, lessThanPrice, greaterThanPrice);
  }
}


makeup.init = function() {
  $('form').on('submit', function(e){
    e.preventDefault();
    $('.recommendations').empty();

    const $category = $('#category');
    const $brand = $('#brand');
    const $price = $('#price');

    const userCategory = $category.children("option:selected").val();
    const userBrand = $brand.children("option:selected").val();
    const userPrice = $price.children("option:selected").val();
    
    makeup.modal(userCategory, userBrand);
    makeup.searchResultsPara(userCategory, userBrand, userPrice);
    makeup.filterPriceResults(userPrice, userBrand, userCategory);
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
  $('h1').fadeIn('5000');
  makeup.init();
});