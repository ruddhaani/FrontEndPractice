async function ValidateToken() {
  const token = localStorage.getItem("authToken");
  if (!token) {
      return false; 
  }

  const response = await fetch("http://localhost:5189/api/User/validate", {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
      }
  });

  return response.ok;
}

const paginationContainer = document.getElementById('paginationContainer');

document.addEventListener("DOMContentLoaded", async () => {
  if (!(await ValidateToken())) {
      localStorage.clear();
      window.location.href = "login.html";
  }
});

let products = [];

let totalPages;

async function GetProductsFromDb(searchText = null, pageNumber = 1, pageSize = 8) {
    try {
        const queryParams = new URLSearchParams({
            PageNumber: pageNumber,
            PageSize: pageSize,
        });

        if (searchText) {
            queryParams.append("SearchText", searchText);
        }

        const response = await fetch(`http://localhost:5189/api/Product?${queryParams.toString()}`);

        if (!response.ok) {
            throw new Error(`Some error: ${response.status}`);
        }

        // Extract the total pages from the response headers
        const totalPagesHeader = response.headers.get("X-TotalPages");
        if (totalPagesHeader) {
            totalPages = parseInt(totalPagesHeader, 10); // Convert to a number and store it
        }

        // Get the products from the response body
        products = await response.json();

    } catch (error) {
        console.log(error);
    }
}


GetProductsFromDb();

async function addToCart(productId){
  try {
    let token = localStorage.getItem("authToken");
    const response = await fetch(`http://localhost:5189/api/Cart?productId=${productId}` , {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
       }
    });

    if(!response.ok){
      throw new Error(`${response.status}`);
    }


  } catch (error) {
    console.log(error);
  }
}

async function ShowProducts(searchText = null , pageNumber = 1 , pageSize = 8) {
    let productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = ``;
    paginationContainer.innerHTML = ``;
    let currentPage = pageNumber;
    await GetProductsFromDb(searchText , pageNumber , pageSize);
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
        <a class = "flex flex-col p-4 items-center" href=product-details.html?productId=${product.productId}>
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
            class="px-4 py-2 bg-logo text-white rounded-md shadow-sm hover:bg-opacity-90 transition" onclick="addToCart(${product.productId})"
          >
            Add to Cart
          </button>
          <button
            class="px-4 py-2 bg-bodyPrimary text-white rounded-md shadow-sm hover:bg-opacity-90 transition"
          >
            Explore
          </button>
        </div> </a>`;

        productGrid.appendChild(cardElement);
    }

    for(let i = 1; i <= totalPages ; i++){
      const button = document.createElement('button');
        button.textContent = i;
        button.className = `
          px-4 py-2 rounded-lg font-medium text-white transition 
          ${i === currentPage ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'} text-center
          focus:outline-none focus:ring-2 focus:ring-blue-300
        `;
        button.addEventListener('click' , () => {
          ShowProducts(searchText , i , pageSize);
          console.log(i);
        });
        paginationContainer.appendChild(button);
    }
}

async function SearchProduct(){
  let searchBoxValue = document.getElementById("productSearchInput").value;
  await ShowProducts(searchBoxValue , 1 , 8);
}




ShowProducts();