let toastBtn = document.getElementById("toastBtn");
let toastContainer = document.getElementById("toast-container");

let createToast = (message) => {
    let toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;


    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000);
}

toastBtn.addEventListener('click', () => {
    createToast('This is a toast notification');
});

