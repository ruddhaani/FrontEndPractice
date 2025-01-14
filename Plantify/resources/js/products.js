let products = [];

async function GetProductsFromDb() {
    try {
        const response = await fetch('http://localhost:5189/api/Product');

        if (!response.ok) {
            throw new Error(`Some error: ${response.status}`)
        }

        products = await response.json();
        console.log(products);
    } catch (error) {
        console.log(error);
    }
}

GetProductsFromDb();

async function ShowProducts() {
    let productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = ``;
    await GetProductsFromDb();
    for (let i in products) {
        let product = products[i];
        let cardElement = document.createElement("div");

        cardElement.classList.add(
            "border",
            "border-gray-200",
            "rounded-md",
            "shadow-sm",
            "p-4",
            "flex",
            "flex-col",
            "items-center",
            "bg-white",
            "hover:shadow-lg",
            "transition-shadow",
            "duration-200"
        );

        cardElement.innerHTML = `
        <img
          src="${product.productImageUrl}"
          alt="Product Image"
          class="w-full h-80 object-cover rounded-md mb-4"
        />
        <h2 class="text-lg font-semibold mb-1">${product.productName}</h2>
        <p class="text-sm text-gray-500 mb-2">Product Type: ${product.productType}</p>
        <p class="text-lg font-bold text-logo mb-4">₹${product.price}</p>
        <div class="flex gap-4">
          <button
            class="px-4 py-2 bg-logo text-white rounded-md shadow-sm hover:bg-opacity-90 transition"
          >
            Add to Cart
          </button>
          <button
            class="px-4 py-2 bg-bodyPrimary text-white rounded-md shadow-sm hover:bg-opacity-90 transition"
          >
            Buy Now
          </button>
        </div>`;

        productGrid.appendChild(cardElement);
    }
}

ShowProducts();