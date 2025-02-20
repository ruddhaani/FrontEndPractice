async function loginDB(email, password) {
    try {
        const response = await fetch(`http://localhost:5189/api/User/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) { 
            confirm("Username and Password do not match. Kindly try again!");
            location.reload();
            return;
        }

        const token = await response.text(); // The token is returned as a plain string
        localStorage.setItem("authToken", token); // Store token securely
        localStorage.setItem("isLoggedIn", "true");

        window.location.href = "index.html";
    } catch (error) {
        console.log("Login error:", error);
    }
}

async function Login() {
    let _email = document.getElementById("emailLogin").value;
    let _password = document.getElementById("passwordLogin").value;

    await loginDB(_email, _password);
}
