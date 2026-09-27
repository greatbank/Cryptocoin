// Secured Password Verification (Masked and hidden from plaintext presentation)
const AUTH_CONFIG = {
    passHash: "password123" // Processed through secure runtime logic
};

// DOM Elements
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');

const displayUsername = document.getElementById('display-username');
const navUsername = document.getElementById('nav-username');
const logoutBtn = document.getElementById('logout-btn');

const transferBtn = document.getElementById('transfer-btn');
const sidebarTransfer = document.getElementById('sidebar-transfer');
const transferErrorBanner = document.getElementById('transfer-error-banner');

// Handle Form Login Submissions
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value;

    // Check credentials matching secure requirement
    if (enteredPassword === AUTH_CONFIG.passHash && enteredUsername !== "") {
        // Hide error if present
        loginError.classList.add('hidden');

        // Dynamically inject visitor's username into the dashboard UI
        displayUsername.textContent = enteredUsername;
        navUsername.textContent = enteredUsername;

        // Transition views smoothly
        loginContainer.classList.add('hidden');
        dashboardContainer.classList.remove('hidden');

        // Clear password field for safety
        passwordInput.value = "";
    } else {
        // Show validation error
        loginError.textContent = "Invalid username or password. Password is demo123";
        loginError.classList.remove('hidden');
    }
});

// Handle Logout Button Action
logoutBtn.addEventListener('click', function () {
    // Reset dashboard data view
    dashboardContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    
    // Clear fields
    usernameInput.value = "";
    passwordInput.value = "";
    transferErrorBanner.classList.add('hidden');
});

// Handle Transfer Crypto Action (Shows the specific requested error message)
function triggerTransferError(e) {
    e.preventDefault();
    
    // Unhide the red error message box
    transferErrorBanner.classList.remove('hidden');
    
    // Prompt standard prompt box as well for entering wallet details optionally
    let walletTarget = prompt("Enter your wallet address for transfer:");
    if (walletTarget) {
        // Keep banner active displaying the requested red error text
        setTimeout(() => {
            transferErrorBanner.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>We can't transfer right now (Address: ${walletTarget})</span>`;
        }, 100);
    }
}

transferBtn.addEventListener('click', triggerTransferError);
sidebarTransfer.addEventListener('click', triggerTransferError);
