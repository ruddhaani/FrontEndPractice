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

let cart = [];

async function GetCartItemsFromDb(){
    try {
        let token = localStorage.getItem("authToken");

        if(!token){
            return false;
        }
        const response = await fetch("http://localhost:5189/api/Cart/cart" , {
            method : 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            }
        });

        if(!response.ok){
            throw new Error("couldnt find cart Items");
        }

        cart = await response.json();
        console.log(cart);
    } catch (error) {
        console.log(error);
    }
}


let cartItemContainer = document.getElementById("cartContainer")
async function ShowCartItems() {
    
    cartItemContainer.innerHTML = ``;
    await GetCartItemsFromDb();
    let price = 0;
    let gst = 0;
    let total = 0;
    for(i in cart){
        let cartItem = cart[i];
        let product = cartItem.product;
        let cartItemDiv = document.createElement("div");
        cartItemDiv.className = `bg-white rounded-lg flex border-[1px] border-borderPrimary shadow-sm cursor-pointer hover:shadow-md transform transition-all duration-300 hover:scale-105 hover:-translate-y-1`;

        cartItemDiv.innerHTML = `<div class="w-14 p-2 self-center">
          <img src="${product.productImageUrl}" alt="" class="rounded-lg" />
        </div>

        <div class="flex justify-between w-full px-4">
          <div class="flex flex-col p-2 justify-center">
            <h2 class="text-bodyPrimary">${product.productName}</h2>
            <h3 class="text-bodyPrimary">Price: ${product.price}</h3>
          </div>

          <div class="gap-0 justify-self-center self-center">
            <button class="text-bodyPrimary bg-white w-4">-</button>
            <button class="text-bodyPrimary bg-white w-14">${cartItem.quantity}</button>
            <button class="text-bodyPrimary bg-white w-4">+</button>
          </div>
        </div>`

        price += (product.price * cartItem.quantity);
        

        cartItemContainer.appendChild(cartItemDiv);
    }

    gst += (price * 0.18);
    total += price + gst;

    document.getElementById("priceP").innerHTML = `₹ ${price.toFixed(2)}`
    document.getElementById("gstP").innerHTML = `₹ ${gst.toFixed(2)}`
    document.getElementById("totalP").innerHTML = `₹ ${total.toFixed(2)}`
}

ShowCartItems();