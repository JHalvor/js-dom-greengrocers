const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.25,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.55,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.45,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "vegetable"
    }
  ],
  cart: [],
  selectedFilteredType: "None",
  selectedSortingOrderType: "None"
};

function render() {}
render();

const storeList = document.querySelector(".store--item-list");
const cartList = document.querySelector(".cart--item-list");
const totalNumber = document.querySelector(".total-number");
const filters = document.querySelector(".filter-buttons");
const sorts = document.querySelector(".sort-buttons");
const addProductButton = document.getElementById("add-product-button");
let formExists = false;

function handleItemClick(storeItem) {
  //added item clicked to cart array?
  const cartItemExists = state.cart.find((item) => item.id == storeItem.id)
  if (cartItemExists) {
    cartItemExists.quantity++
  } else {
    const cartItem = { ...storeItem, quantity: 1 }
    state.cart.push(cartItem)
  }

  renderCart();
}

function handleCartItemClick(cartItem, increaseItemQuantity) {
  //added item clicked to cart array?
  if (increaseItemQuantity) {
    cartItem.quantity++
  } else {
    cartItem.quantity--
    if (cartItem.quantity <= 0) {
      const cartItemIndex = state.cart.indexOf(cartItem)
      state.cart.splice(cartItemIndex, 1)
    }
  }

  renderCart();
}

function handleFilterClick(type) {
  state.selectedFilteredType = type
  renderItems();
}

function handleSortClick(type) {
  state.selectedSortingOrderType = type
  renderItems();
}

function renderItems() {
  storeList.innerHTML = ``
  const sortedItems = sortItems(state.items)
  sortedItems.map((item) => {
    if (state.selectedFilteredType === "None" || state.selectedFilteredType === item.type) {
      let li = renderItem(item);
      storeList.appendChild(li);
    }
  });
  renderTotal();
}

function sortItems(items) {
  if (state.selectedSortingOrderType === "None") {
    return items
  }
  for (let x = 0; x < items.length; x++) {
    for (let y = 1; y < items.length; y++) {
      if (state.selectedSortingOrderType === "Price") {
        if (items[y-1].price > items[y].price) {
          const tmp = items[y]
          items[y] = items[y-1]
          items[y-1] = tmp
        }
      } else if (state.selectedSortingOrderType === "Alphabetically") {
        if (items[y-1].name.toLowerCase() > items[y].name.toLowerCase()) {
          const tmp = items[y]
          items[y] = items[y-1]
          items[y-1] = tmp
        }
      }
    }
  }
  return items
}


function renderCart() {
  cartList.innerHTML = ``
  //iterate through state.cart.map  and update the cart view
  state.cart.map((item) => {
    let li = renderCartItem(item);
    cartList.appendChild(li);
  });
  renderTotal();
}

function renderCartItem(cartItem) {
  const li = document.createElement("li");
  const img = document.createElement("img");

  img.setAttribute("class", "cart--item-icon")
  img.setAttribute("src", `./assets/icons/${cartItem.id}.svg`);
  img.setAttribute("alt", cartItem.name);

  const p = document.createElement("p");
  p.textContent = cartItem.name

  const buttonRemove = document.createElement("button");
  buttonRemove.setAttribute("class", "quantity-btn remove-btn center")
  buttonRemove.addEventListener("click", () => {
    handleCartItemClick(cartItem, false);
  });

  const span = document.createElement("span")
  span.setAttribute("class", "quantity-text center")
  span.textContent = cartItem.quantity

  const buttonAdd = document.createElement("button");
  buttonAdd.setAttribute("class", "quantity-btn add-btn center")
  buttonAdd.addEventListener("click", () => {
    handleCartItemClick(cartItem, true);
  });

  li.appendChild(img)
  li.appendChild(p)
  li.appendChild(buttonRemove)
  li.appendChild(span)
  li.appendChild(buttonAdd)

  return li;
}
function renderItem(storeItem) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.setAttribute("class", "store--item-icon");
  const img = document.createElement("img");
  img.setAttribute("src", `./assets/icons/${storeItem.id}.svg`);
  img.setAttribute("alt", storeItem.name);

  const button = document.createElement("button");
  button.innerText = "Add to cart";
  button.addEventListener("click", () => {
    handleItemClick(storeItem);
  });

  div.appendChild(img);

  li.appendChild(div);
  li.appendChild(button);

  return li;
}

function renderTotal() {
  let total = 0
  state.cart.forEach((item) => {
    total += item.price * item.quantity
  })
  totalNumber.textContent = total.toFixed(2)
}

function renderFilterButtons() {
  filters.innerHTML = ``
  filters.textContent = "Filter"

  let types = []
  state.items.forEach((item) => {
    types.push(item.type)
  })
  types = [...new Set(types)]

  renderFilterButton("None")

  types.forEach((type) => {
    renderFilterButton(type)
  })
}

function renderFilterButton(type) {
  const button = document.createElement("button")
  button.innerText = type;
  button.addEventListener("click", () => {
    handleFilterClick(type);
  });
  filters.appendChild(button)
}

function renderSortButtons() {
  sorts.innerHTML = ``
  sorts.textContent = "Sort"

  renderSortButton("None")
  renderSortButton("Alphabetically")
  renderSortButton("Price")
}

function renderSortButton(type) {
  const button = document.createElement("button")
  button.innerText = type;
  button.addEventListener("click", () => {
    handleSortClick(type);
  });
  sorts.appendChild(button)
}

function createProductForm() {
  // Create the form element
  const form = document.createElement("form");
  form.id = "add-product-form";
  
  // Create product name input
  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "product-name");
  nameLabel.innerText = "Product Name:";
  form.appendChild(nameLabel);

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "product-name";
  nameInput.required = true;
  form.appendChild(nameInput);

  // Create product price input
  const priceLabel = document.createElement("label");
  priceLabel.setAttribute("for", "product-price");
  priceLabel.innerText = "Price:";
  form.appendChild(priceLabel);

  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.id = "product-price";
  priceInput.step = "0.01";
  priceInput.required = true;
  form.appendChild(priceInput);

  // Create product type select
  const typeLabel = document.createElement("label");
  typeLabel.setAttribute("for", "product-type");
  typeLabel.innerText = "Type:";
  form.appendChild(typeLabel);

  const typeSelect = document.createElement("select");
  typeSelect.id = "product-type";
  typeSelect.required = true;

  const fruitOption = document.createElement("option");
  fruitOption.value = "fruit";
  fruitOption.innerText = "Fruit";
  typeSelect.appendChild(fruitOption);

  const vegetableOption = document.createElement("option");
  vegetableOption.value = "vegetable";
  vegetableOption.innerText = "Vegetable";
  typeSelect.appendChild(vegetableOption);

  form.appendChild(typeSelect);

  // Create submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.innerText = "Add Product";
  form.appendChild(submitButton);

  // Insert form into the document
  addProductButton.insertAdjacentElement('afterend', form);

  // Add event listener to handle form submission
  form.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();

  const productName = document.getElementById("product-name").value;
  const productPrice = parseFloat(document.getElementById("product-price").value);
  const productType = document.getElementById("product-type").value;

  if (productName && productPrice && productType) {
    const newProduct = {
      id: `${state.items.length + 1}-${productName.toLowerCase().replace(/\s/g, "-")}`,
      name: productName,
      price: productPrice,
      type: productType
    };

    state.items.push(newProduct);

    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-type").value = "fruit";

    renderItems();
  }
}

addProductButton.addEventListener("click", () => {
  if (!formExists) {
    createProductForm();
    formExists = true;
  }
});

renderItems();
renderFilterButtons();
renderSortButtons();
