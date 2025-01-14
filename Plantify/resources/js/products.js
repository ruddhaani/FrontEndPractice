let products = [];

async function GetProductsFromDb(){
    try {
        const response = await fetch('http://localhost:5189/api/Product');

        if(!response.ok){
            throw new Error(`Some error: ${response.status}`)
        }

        products = await response.json();
    } catch (error) {
        
    }
}