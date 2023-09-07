const addToShoppingCartButtons = document.querySelectorAll(".addToCart");
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener("click", addToCartClicked);
});

const comprarButton = document.querySelector(".comprarButton");
comprarButton.addEventListener("click", comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  ".shoppingCartItemsContainer"
);

// Esta función obtiene los datos del carrito de compras almacenados en LocalStorage
function getShoppingCartFromLocalStorage() {
  const shoppingCart = localStorage.getItem("shoppingCart");
  return shoppingCart ? JSON.parse(shoppingCart) : [];
}

// Esta función actualiza los datos
function updateShoppingCartLocalStorage(cart) {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Esta función carga los datos
function loadShoppingCart() {
  const shoppingCart = getShoppingCartFromLocalStorage();

  shoppingCart.forEach((item) => {
    addItemToShoppingCart(
      item.title,
      item.price,
      item.image,
      item.quantity,
      true
    );
  });

  updateShoppingCartTotal();
}
// Llama a esta función para cargar los datos del carrito de compras cuando la página se carga
loadShoppingCart();

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest(".item");

  const itemTitle = item.querySelector(".item-title").textContent;
  const itemPrice = item.querySelector(".item-price").textContent;
  const itemImage = item.querySelector(".item-image").src;

  addItemToShoppingCart(itemTitle, itemPrice, itemImage);
}
// Modifica la función addItemToShoppingCart para agregar el artículo al carrito y actualizar LocalStorage
function addItemToShoppingCart(
  itemTitle,
  itemPrice,
  itemImage,
  itemQuantity,
  isFirstLoad
) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    "shoppingCartItemTitle"
  );

  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        ".shoppingCartItemQuantity"
      );
      elementQuantity.value++;
      if (!isFirstLoad) $(".toast").toast("show");
      updateShoppingCartTotal();
      // Se obtiene el carrito actual de LocalStorage y actualiza la cantidad
      const shoppingCart = getShoppingCartFromLocalStorage();
      const existingItem = shoppingCart.find(
        (item) => item.title === itemTitle
      );
      if (existingItem) {
        existingItem.quantity++;
      }
      if (!isFirstLoad) {
        updateShoppingCartLocalStorage(shoppingCart);
      }
      return;
    }
  }

  const shoppingCartRow = document.createElement("div");
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value=${itemQuantity || 1}>
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector(".buttonDelete")
    .addEventListener("click", removeShoppingCartItem);

  shoppingCartRow
    .querySelector(".shoppingCartItemQuantity")
    .addEventListener("change", quantityChanged);

  updateShoppingCartTotal();

  const shoppingCart = getShoppingCartFromLocalStorage();
  shoppingCart.push({
    title: itemTitle,
    price: itemPrice,
    image: itemImage,
    quantity: 1,
  });
  if (!isFirstLoad) {
    console.log("UPDATING LOCAL STORAGE");
    updateShoppingCartLocalStorage(shoppingCart);
  }
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

  const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      ".shoppingCartItemPrice"
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace("$", "")
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      ".shoppingCartItemQuantity"
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest(".shoppingCartItem").remove();
  updateShoppingCartTotal();

  const shoppingCart = getShoppingCartFromLocalStorage();
  const itemTitle =
    buttonClicked.parentElement.parentElement.parentElement.querySelector(
      ".shoppingCartItemTitle"
    ).innerText;

  const itemIndex = shoppingCart.findIndex((item) => item.title === itemTitle);
  if (itemIndex !== -1) {
    shoppingCart.splice(itemIndex, 1);
    updateShoppingCartLocalStorage(shoppingCart);
  }
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();

  const shoppingCart = getShoppingCartFromLocalStorage();
  const itemTitle =
    input.parentElement.parentElement.parentElement.querySelector(
      ".shoppingCartItemTitle"
    ).innerText;
  const existingItem = shoppingCart.find((item) => item.title === itemTitle);
  if (existingItem) {
    existingItem.quantity = input.value;
    updateShoppingCartLocalStorage(shoppingCart);
  }
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = "";
  updateShoppingCartTotal();
  // Borra el carrito de LocalStorage cuando se realiza la compra
  updateShoppingCartLocalStorage([]);
}

function comprarButtonClick() {}
