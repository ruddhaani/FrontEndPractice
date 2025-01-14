async function createUser(name, email, phone, password) {
    try {
        const response = await fetch("http://localhost:5189/api/User", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "phoneNumber": phone,
                "password": password
            })
        });

        if (!response.ok) {
            confirm("There was some issue! Try again!");
            location.reload();
            return;
        }

        confirm("Thankyou for your time, you may login now!");
            window.location.href = 'login.html';
        } catch (error) {
        console.log(error);
    }
}

async function SignUp(){
    let _name = document.getElementById("nameSignup").value;
    console.log(_name);
    let _email = document.getElementById("emailSignup").value;
    console.log(_email);
    let _phone = document.getElementById("phoneSignup").value;
    console.log(_phone);
    let _password = document.getElementById("passwordSignup").value;
    console.log(_password);

    if(_name != "" && _email != "" && _phone!="" && _password!=""){
        await createUser(_name , _email , _phone , _password);
    }else{
        alert("Please add valid values in the form");
    }
}