const UrlSearchParams = new URLSearchParams(window.location.search);

const productId = UrlSearchParams.get("productId");

console.log(productId);

let product;

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

async function GetProductDetails(productId){
    try {
        const response = await fetch(`http://localhost:5189/api/Product/productDetails?productId=${productId}`);

        if(!response.ok){
            alert("Something went wrong!");
        }

        product = await response.json();

        document.getElementById("productImage").src = product.productImageUrl;
        document.getElementById("productName").innerHTML = product.productName;
        document.getElementById("productType").innerHTML = `Type : ${product.productType}`
        document.getElementById("productPrice").innerHTML = `₹ ${product.price}`
        document.getElementById("productDescription").innerHTML = product.productDescription;
        let button = document.getElementById("addToCartBtn");
        button.addEventListener('click' , async()=>{
            await addToCart(productId);
        })
    } catch (error) {
        console.log(error);
    }
}

GetProductDetails(productId);