document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        window.location.href = "login.html";
        return;
    }
});

async function fetchUserDetails(authToken) {
    const apiUrl = "http://localhost:5189/api/User/me";
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const userData = await response.json();
        console.log("User Details:", userData);
    } catch (error) {
        console.error("Failed to fetch user details:", error.message);
    }
}

// Call the function on page load
document.addEventListener("DOMContentLoaded", () => {
    const authToken = localStorage.getItem("authToken"); // Assuming you store the token in localStorage
    if (authToken) {
        fetchUserDetails(authToken);
    } else {
        console.log("No auth token found. Please log in.");
    }
});
