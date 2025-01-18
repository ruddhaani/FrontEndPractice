async function ValidateToken() {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return false;
  }

  const response = await fetch("http://localhost:5189/api/User/validate", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.ok;
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!(await ValidateToken())) {
    localStorage.clear();
    window.location.href = "login.html";
  }
});

let user;

function signOut(){
  localStorage.clear();
  window.location.href = "login.html";
}

async function updateUserInDb(name, email, phone) {
  const token = localStorage.getItem("authToken");
  try {
    const response = await fetch("http://localhost:5189/api/User/updateUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        PhoneNumber: phone,
      }),
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}

async function UpdatePasswordInDb(oldPassword , newPassword){
  try {
    const token = localStorage.getItem("authToken");

    const response = fetch("http://localhost:5189/api/User/password" , {
      method : 'PUT',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body : JSON.stringify({
        Password : newPassword,
        OldPassword : oldPassword
      })
    });

    if(!response.ok){
      throw new Error(`${(await response).status}`);
    }

  } catch (error) {
    console.log(error);
  }
}

async function loadUserDetails() {
  let token = localStorage.getItem("authToken");

  try {
    const response = await fetch("http://localhost:5189/api/User/userDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    user = await response.json();
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}

let container = document.getElementById("profileSection");

async function showUserDetails(index = 0) {
  container.innerHTML = ``;

  await loadUserDetails();

  let innerDiv = document.createElement("div");

  innerDiv.className = `max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6`;

  let innerHTMLString = `<h2 class="text-2xl font-semibold text-gray-700 text-center font-poppins mb-6">
        Profile
      </h2>
  
      <!-- Profile Details -->
      <div class="space-y-6">
        <!-- Name -->
        <div class="flex items-center justify-between border-b border-gray-300 pb-3">
          <span class="text-gray-600 font-medium">Name</span>
          <span class="text-gray-800 font-semibold">${user.name}</span>
        </div>
  
        <!-- Email -->
        <div class="flex items-center justify-between border-b border-gray-300 pb-3">
          <span class="text-gray-600 font-medium">Email</span>
          <span class="text-gray-800 font-semibold">
          ${user.email}
          </span>
        </div>
  
        <!-- Phone Number -->
        <div class="flex items-center justify-between border-b border-gray-300 pb-3">
          <span class="text-gray-600 font-medium">Phone Number</span>
          <span class="text-gray-800 font-semibold">${user.phoneNumber}</span>
        </div>
      </div>
  
      <!-- Buttons -->
      <div class="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition font-poppins w-full sm:w-auto" onclick = "UpdatePassword(0)"
        >
          Change Password
        </button>
        <button
          class="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition font-poppins w-full sm:w-auto" onclick="UpdateProfile(0)"
        >
          Update Profile
        </button>

        <button
      class="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition font-poppins w-full sm:w-auto" onclick="signOut()"
    >
    Sign Out
    </button>

        <button
          class="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition font-poppins w-full sm:w-auto"
        >
          <a href="history.html">History</a>
        </button>
      </div>`;

  if (index == 1) {
    innerHTMLString = `<h2 class="text-2xl font-semibold text-gray-700 text-center font-poppins mb-6">
  Profile
</h2>

<div class="space-y-6">
  <!-- Name -->
  <div class="flex items-center justify-between w-full border-b border-gray-300 pb-3">
    <label for="name" class="text-gray-600 w-1/2 font-medium">Name</label>
    <input 
      type="text" 
      id="updatedName" 
      name="name" 
      class="text-gray-800 font-semibold bg-gray-50 rounded px-2 py-1 text-right w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter your name"
      value="${user.name}"
    />
  </div>

  <!-- Email -->
  <div class="flex items-center w-full justify-between border-b border-gray-300 pb-3">
    <label for="email" class="text-gray-600 w-1/2 font-medium">Email</label>
    <input 
      type="text" 
      id="updatedEmail" 
      name="email" 
      class="text-gray-800 font-semibold w-1/2 bg-gray-50 rounded px-2 py-1 text-right w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter your email"
      value="${user.email}"
    />
  </div>

  <!-- Phone Number -->
  <div class="flex items-center justify-between w-full border-b border-gray-300 pb-3">
    <label for="phone" class="text-gray-600 w-1/2 font-medium">Phone Number</label>
    <input 
      type="number" 
      id="updatedPhone" 
      name="phone" 
      class="text-gray-800 font-semibold w-1/2 bg-gray-50 rounded px-2 py-1 text-right w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter your phone number"
      value="${user.phoneNumber}"
    />
  </div>
</div>

<!-- Buttons -->
<div class="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
  <button
    class="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition font-poppins w-full sm:w-auto" onclick="UpdatePassword(0)"
  >
    Change Password
  </button>
  <button
    class="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition font-poppins w-full sm:w-auto"
    onclick="UpdateProfile(1)"
  >
    Update Profile
  </button>
  <button
    class="bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 transition font-poppins w-full sm:w-auto"
  >
    <a href="history.html">History</a>
  </button>
</div>
`;
  } else if (index == 2) {
    innerHTMLString = `<h2 class="text-2xl font-semibold text-gray-700 text-center font-poppins mb-6">
    Profile
  </h2>
  
  <div class="space-y-6">
    <!-- Name -->
    <div class="flex items-center justify-between border-b border-gray-300 pb-3">
          <span class="text-gray-600 font-medium">Name</span>
          <span class="text-gray-800 font-semibold">${user.name}</span>
        </div>
  
        <!-- Email -->
        <div class="flex items-center justify-between border-b border-gray-300 pb-3">
          <span class="text-gray-600 font-medium">Email</span>
          <span class="text-gray-800 font-semibold">
          ${user.email}
          </span>
        </div>
  
        <!-- Phone Number -->
        <div class="flex items-center justify-between border-b border-gray-300 pb-3">
          <span class="text-gray-600 font-medium">Phone Number</span>
          <span class="text-gray-800 font-semibold">${user.phoneNumber}</span>
        </div>

         <div class="flex items-center justify-between w-full border-b border-gray-300 pb-3">
    <label for="name" class="text-gray-600 w-1/2 font-medium">Enter Old Password</label>
    <input 
      type="text" 
      id="oldPassword" 
      name="name" 
      class="text-gray-800 font-semibold bg-gray-50 rounded px-2 py-1 text-right w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter old Password"
      value=""
    />
  </div>

  <div class="flex items-center justify-between w-full border-b border-gray-300 pb-3">
    <label for="name" class="text-gray-600 w-1/2 font-medium">Enter New Password</label>
    <input 
      type="text" 
      id="newPassword" 
      name="name" 
      class="text-gray-800 font-semibold bg-gray-50 rounded px-2 py-1 text-right w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter new Password"
      value=""
    />
  </div>

    
  </div>
  
  <!-- Buttons -->
  <div class="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
    <button
      class="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition font-poppins w-full sm:w-auto" onclick = "UpdatePassword(1)"
    >
      Change Password
    </button>
    <button
      class="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition font-poppins w-full sm:w-auto" onclick = "UpdateProfile(0)"
      onclick="UpdateProfile(1)"
    >
      Update Profile
    </button>

    <button
      class="bg-gray-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-gray-600 transition font-poppins w-full sm:w-auto"
    >
      <a href="history.html">History</a>
    </button>
  </div>
  `;
  }

  innerDiv.innerHTML = innerHTMLString;
  container.appendChild(innerDiv);
}

async function UpdateProfile(flag) {
  if (flag == 0) {
    await showUserDetails(1);
  } else {
    let name = document.getElementById("updatedName").value;
    let email = document.getElementById("updatedEmail").value;
    let phone = document.getElementById("updatedPhone").value;

    await updateUserInDb(name, email, phone);

    await showUserDetails();
  }
}

async function UpdatePassword(flag) {
  if(flag == 0){
    showUserDetails(2);
  }else{
    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;

    await UpdatePasswordInDb(oldPassword , newPassword);

    await showUserDetails();
  }
}

showUserDetails();
