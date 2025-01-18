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


function RedirectToProductsPage(){
    console.log("clicked");
    window.location.href = "product.html";
}


let buttonExplore = document.getElementById("exploreButton");

buttonExplore.addEventListener("click" , ()=>{
    RedirectToProductsPage();
})