let selectedProducts = [];

showPlacholders();
function getProducts() {
  let xhr = new XMLHttpRequest();
  xhr.open("get", "https://fakestoreapi.com/products");
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let productsObj = JSON.parse(xhr.responseText);
      console.log(productsObj);
      setTimeout(() => {
        showProducts(productsObj);
      }, 1000);
    }
  };
  xhr.send();
}
getProducts();
function showPlacholders() {
  let products = document.querySelector(".products");
  products.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    let product = `
  <div class="product-p">
      <div class="card" aria-hidden="true">
        <img class="d-flex justify-content-center align-items-center" src="https://res.cloudinary.com/practicaldev/image/fetch/s--Zq0PVQzj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/iq5nqzvwgssf7qfklezm.gif" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
          </h5>
          <p class="card-text placeholder-glow">
            <span class="placeholder col-7"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-4"></span>
            <span class="placeholder col-6"></span>
            <span class="placeholder col-8"></span>
          </p>
          <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
        </div>
    </div>
  </div>`;
    products.insertAdjacentHTML("beforeend", product);
  }
}
function showProducts(productsObj) {
  let products = document.querySelector(".products");
  products.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    let product = `
    <div class="product">
      <img src="${productsObj[i].image}" alt="" draggable="false" />
      <div class="add-to-cart" onclick="addTocart(this, ${i})">
        <i class="fa-solid fa-cart-plus"></i>
        <p>Add to cart</p>
      </div>
      <div class="details">
        <div class="category">${productsObj[i].category}</div>
        <div class="product-name">${productsObj[i].title}</div>
        <div class="price">$${productsObj[i].price}</div>
      </div>
    </div>`;
    products.insertAdjacentHTML("beforeend", product);
  }
}

function addTocart(e, index) {
  const ele = e;
  ele.innerHTML = `
    <div class="ma">
      <div class="minus">-</div>
      <p>1</p>
      <div class="plus">+</div>
    </div>`;
  ele.setAttribute("onclick", "plusOrminus(this)");
  ele.parentElement.style.border = "0.2rem solid #ff3c00";

  let obj = {
    id: index,
    title: e.parentElement.querySelector(".product-name").textContent,
    price: parseFloat(
      e.parentElement.querySelector(".price").textContent.substring(1)
    ),
    amount: 1,
  };

  selectedProducts.push(obj);
  console.log(selectedProducts);
  showIncart();
}

function plusOrminus(e) {
  let minus = e.querySelector(".minus");
  let amount = e.querySelector("p");
  let plus = e.querySelector(".plus");

  minus.addEventListener("click", (event) => {
    event.stopPropagation();
    let currentQuantity = parseInt(amount.textContent);
    if (currentQuantity > 1) {
      amount.textContent = currentQuantity - 1;
      updateProductAmount(
        e.parentElement.querySelector(".product-name").textContent,
        currentQuantity - 1
      );
    } else {
      removeProduct(e);
    }
    showIncart();
  });

  plus.addEventListener("click", (event) => {
    event.stopPropagation();
    let currentQuantity = parseInt(amount.textContent);
    amount.textContent = currentQuantity + 1;
    updateProductAmount(
      e.parentElement.querySelector(".product-name").textContent,
      currentQuantity + 1
    );
    showIncart();
  });
}

function updateProductAmount(title, amount) {
  selectedProducts = selectedProducts.map((product) => {
    if (product.title === title) {
      product.amount = amount;
    }
    return product;
  });
}

function removeProduct(e) {
  const title = e.parentElement.querySelector(".product-name").textContent;
  selectedProducts = selectedProducts.filter(
    (product) => product.title !== title
  );
  e.innerHTML = `
    <i class="fa-solid fa-cart-plus"></i>
    <p>Add to cart</p>`;
  e.parentElement.style.border = "1px solid #b87b5a9c";
  e.setAttribute("onclick", "addTocart(this)");
  showIncart();
}

function showIncart() {
  const cart = document.querySelector(".cart");
  cart.innerHTML = `
    <p>Your cart (${selectedProducts.length})</p>`;
  if (selectedProducts.length === 0) {
    cart.innerHTML += `
      <img
            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='128'%20height='128'%20fill='none'%20viewBox='0%200%20128%20128'%3e%3cpath%20fill='%23260F08'%20d='M8.436%20110.406c0%201.061%204.636%202.079%2012.887%202.829%208.252.75%2019.444%201.171%2031.113%201.171%2011.67%200%2022.861-.421%2031.113-1.171%208.251-.75%2012.887-1.768%2012.887-2.829%200-1.061-4.636-2.078-12.887-2.828-8.252-.75-19.443-1.172-31.113-1.172-11.67%200-22.861.422-31.113%201.172-8.251.75-12.887%201.767-12.887%202.828Z'%20opacity='.15'/%3e%3cpath%20fill='%2387635A'%20d='m119.983%2024.22-47.147%205.76%204.32%2035.36%2044.773-5.467a2.377%202.377%200%200%200%202.017-1.734c.083-.304.104-.62.063-.933l-4.026-32.986Z'/%3e%3cpath%20fill='%23AD8A85'%20d='m74.561%2044.142%2047.147-5.754%201.435%2011.778-47.142%205.758-1.44-11.782Z'/%3e%3cpath%20fill='%23CAAFA7'%20d='M85.636%2036.78a2.4%202.4%200%200%200-2.667-2.054%202.375%202.375%200%200%200-2.053%202.667l.293%202.347a3.574%203.574%200%200%201-7.066.88l-1.307-10.667%2014.48-16.88c19.253-.693%2034.133%203.6%2035.013%2010.8l1.28%2010.533a1.172%201.172%200%200%201-1.333%201.307%204.696%204.696%200%200%201-3.787-4.08%202.378%202.378%200%201%200-4.72.587l.294%202.346a2.389%202.389%200%200%201-.484%201.755%202.387%202.387%200%200%201-1.583.899%202.383%202.383%200%200%201-1.755-.484%202.378%202.378%200%200%201-.898-1.583%202.371%202.371%200%200%200-1.716-2.008%202.374%202.374%200%200%200-2.511.817%202.374%202.374%200%200%200-.493%201.751l.293%202.373a4.753%204.753%200%200%201-7.652%204.317%204.755%204.755%200%200%201-1.788-3.17l-.427-3.547a2.346%202.346%200%200%200-2.666-2.053%202.4%202.4%200%200%200-2.08%202.667l.16%201.173a2.378%202.378%200%201%201-4.72.587l-.107-1.28Z'/%3e%3cpath%20stroke='%23fff'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='.974'%20d='m81.076%2028.966%2034.187-4.16'/%3e%3cpath%20fill='%2387635A'%20d='M7.45%2051.793c-.96%208.48%2016.746%2017.44%2039.466%2019.947%2022.72%202.506%2042.08-2.16%2043.04-10.667l-3.947%2035.493c-.96%208.48-20.24%2013.334-43.04%2010.667S2.463%2095.74%203.423%2087.18l4.026-35.387Z'/%3e%3cpath%20fill='%23AD8A85'%20d='M5.823%2065.953c-.96%208.453%2016.746%2017.44%2039.573%2020.027%2022.827%202.586%2042.053-2.187%2043.013-10.667L87.076%2087.1c-.96%208.48-20.24%2013.333-43.04%2010.666C21.236%2095.1%203.53%2086.22%204.49%2077.74l1.334-11.787Z'/%3e%3cpath%20fill='%23CAAFA7'%20d='M60.836%2042.78a119.963%20119.963%200%200%200-10.347-1.627c-24-2.667-44.453%201.893-45.333%2010.373l-2.133%2018.88a3.556%203.556%200%201%200%207.066.8%203.574%203.574%200%201%201%207.094.8l-.8%207.094a5.93%205.93%200%201%200%2011.786%201.333%203.556%203.556%200%200%201%207.067.8l-.267%202.347a3.573%203.573%200%200%200%207.094.826l.133-1.2a5.932%205.932%200%201%201%2011.787%201.36l-.4%203.52a3.573%203.573%200%200%200%207.093.827l.933-8.267a1.174%201.174%200%200%201%201.307-.906%201.146%201.146%200%200%201%201.04%201.306%205.947%205.947%200%200%200%2011.813%201.334l.534-4.72a3.556%203.556%200%200%201%207.066.8%203.573%203.573%200%200%200%207.094.826l1.786-15.546a2.373%202.373%200%200%200-2.08-2.667L44.143%2055.74l16.693-12.96Z'/%3e%3cpath%20fill='%2387635A'%20d='m59.156%2057.66%201.68-14.88-16.827%2013.173%2015.147%201.707Z'/%3e%3cpath%20stroke='%23fff'%20stroke-linecap='round'%20stroke-linejoin='round'%20stroke-width='.974'%20d='M9.796%2052.06c-.667%205.866%2016.24%2012.586%2037.733%2015.04%2014.774%201.68%2027.867.906%2034.854-1.654'/%3e%3c/svg%3e"
            alt="Empty Card"
      />`;
  } else {
    selectedProducts.forEach((product) => {
      cart.innerHTML += `
        <div class="product-info">
          <div class="info">
            <p>${product.title}</p>
            <span>${product.amount} x $${product.price} = $${(
        product.amount * product.price
      ).toFixed(2)}</span>
          </div>
          <i class="fa-regular fa-circle-xmark" onclick="removeProductFromCart('${product.title.replaceAll(
            "'",
            ""
          )}')"></i>
        </div>
        <hr>`;
    });
    cart.innerHTML += `
      <div class="order-t">
        <p>Order Total</p>
        <p class="total">$${calculateTotal()}</p>
      </div>
      <button>Confirm order</button>`;
  }
}

function calculateTotal() {
  console.log(
    selectedProducts
      .reduce((total, product) => total + product.amount * product.price, 0)
      .toFixed(2)
  );
  return selectedProducts
    .reduce((total, product) => total + product.amount * product.price, 0)
    .toFixed(2);
}

function removeProductFromCart(title) {
  selectedProducts = selectedProducts.filter(
    (product) => product.title.replaceAll("'", "") !== title
  );
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    if (
      button.parentElement.querySelector(".product-name").textContent === title
    ) {
      button.innerHTML = `
        <i class="fa-solid fa-cart-plus"></i>
        <p>Add to cart</p>`;
      button.parentElement.style.border = "1px solid #b87b5a9c";
      button.setAttribute("onclick", "addTocart(this)");
    }
  });
  showIncart();
}
