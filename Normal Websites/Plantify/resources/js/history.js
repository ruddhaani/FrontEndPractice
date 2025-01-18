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

document.addEventListener("DOMContentLoaded", async () => {
    if (!(await ValidateToken())) {
        localStorage.clear();
        window.location.href = "login.html";
    }
});

let boughtItems = [];

async function loadHistoryFromDb() {
    try {
        let token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5189/api/Sales" , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        });

        if(!response.ok){
            alert("Something went wrong");
        }

        boughtItems = await response.json()
        console.log(boughtItems);
    } catch (error) {
        console.log(error);
    }    
}

loadHistoryFromDb();

let historyElement = document.getElementById("historyContainer");
async function ShowCartItems() {
    historyElement.innerHTML = ``; // Clear the container
    await loadHistoryFromDb(); // Fetch the cart items

    for (let i in boughtItems) {
        const cartItem = boughtItems[i];
        const product = cartItem.product;

        if (!product || typeof product.price === "undefined") {
            console.warn(`Invalid product or missing price for cart item:`, cartItem);
            continue; // Skip invalid items
        }

        // Ensure product.price is a number
        const productPrice = parseFloat(product.price) || 0;
        const quantity = cartItem.quantity || 0;

        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = `bg-white rounded-lg flex border-[1px] border-borderPrimary shadow-sm cursor-pointer hover:shadow-md transform transition-all duration-300 hover:scale-105 hover:-translate-y-1`;

        cartItemDiv.innerHTML = `
            <div class="w-14 p-2 self-center">
                <img src="${product.productImageUrl}" alt="" class="rounded-lg" />
            </div>
            <div class="flex justify-between w-full px-4">
                <div class="flex flex-col p-2 justify-center">
                    <h2 class="text-bodyPrimary">${product.productName}</h2>
                    <h3 class="text-bodyPrimary">Price: ₹${productPrice.toFixed(2)}</h3>
                </div>
                <div class="gap-0 justify-self-center self-center">
                    <button class="text-bodyPrimary bg-white w-28">Quantity : ${quantity}</button>
                </div>
            </div>
        `;

        historyElement.appendChild(cartItemDiv);
    }
}

ShowCartItems();