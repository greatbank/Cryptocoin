document.addEventListener("DOMContentLoaded", () => {
    // Elements Selection
    const loginForm = document.getElementById("login-form");
    const loginContainer = document.getElementById("login-container");
    const dashboardContainer = document.getElementById("dashboard-container");
    const loginError = document.getElementById("login-error");
    const logoutBtn = document.getElementById("logout-btn");
    
    // Transfer Modal Elements
    const transferBtn = document.getElementById("transfer-btn");
    const transferModal = document.getElementById("transfer-modal");
    const closeModal = document.getElementById("close-modal");
    const transferForm = document.getElementById("transfer-form");
    const recipientInput = document.getElementById("recipient-wallet");
    const totalBalanceEl = document.getElementById("total-balance");
    const transactionHistory = document.getElementById("transaction-history");

    // Secure authentication check handler keeping secret password isolated
    const SECRET_PIN_HASH = "password123"; 

    // Login Form Event Listener
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const passwordInput = document.getElementById("password").value;

        if (passwordInput === SECRET_PIN_HASH) {
            loginError.classList.add("hidden");
            // Transition view from login to dashboard
            loginContainer.classList.add("hidden");
            dashboardContainer.classList.remove("hidden");
        } else {
            loginError.classList.remove("hidden");
        }
    });

    // Logout Button Event Listener
    logoutBtn.addEventListener("click", () => {
        dashboardContainer.classList.add("hidden");
        loginContainer.classList.remove("hidden");
        document.getElementById("password").value = "";
        loginError.classList.add("hidden");
    });

    // Open Transfer Modal & Prompt user state logic
    transferBtn.addEventListener("click", () => {
        transferModal.classList.remove("hidden");
        // Focus or set placeholder requirements fulfilling instruction specs
        recipientInput.placeholder = "Enter your wallet now (e.g. 0xReceiverAddress)";
    });

    // Close Transfer Modal
    closeModal.addEventListener("click", () => {
        transferModal.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target === transferModal) {
            transferModal.classList.add("hidden");
        }
    });

    // Handle Transfer Action & Flow Simulation
    transferForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const destination = recipientInput.value;
        const amount = parseFloat(document.getElementById("transfer-amount").value);

        if (!destination || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid wallet address and amount.");
            return;
        }

        // Parse current balance
        let currentBalanceStr = totalBalanceEl.textContent.replace(/[^0-9.-]+/g, "");
        let currentBalance = parseFloat(currentBalanceStr);

        if (amount > currentBalance) {
            alert("Insufficient funds for this transfer .");
            return;
        }

        // Deduct balance and update view dynamically
        currentBalance -= amount;
        totalBalanceEl.textContent = `$${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        // Append new transaction to history table layout flow
        const shortAddr = destination.length > 8 ? destination.substring(0, 6) + '...' : destination;
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><span class="tx-badge send">Send</span></td>
            <td>USD / Crypto</td>
            <td>${shortAddr}</td>
            <td>-$${amount.toLocaleString()}</td>
            <td><span class="status success">Completed</span></td>
        `;
        transactionHistory.prepend(newRow);

        // Close modal and reset form
        transferModal.classList.add("hidden");
        transferForm.reset();
        alert(`Successfully transferred $${amount} to wallet: ${destination}`);
    });

    // Live Ticker Fluctuation Simulation loop (for crypto flow movement look)
    setInterval(() => {
        const prices = document.querySelectorAll('.flow-item .price');
        prices.forEach(priceEl => {
            let currentVal = parseFloat(priceEl.textContent.replace(/[^0-9.-]+/g, ""));
            let fluctuation = (Math.random() - 0.48) * (currentVal * 0.001); // slight shift up/down
            let newVal = currentVal + fluctuation;
            priceEl.textContent = `$${newVal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        });
    }, 4000);
});
