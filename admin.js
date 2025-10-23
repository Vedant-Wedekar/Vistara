// Global variables
window.isAdmin = false;
window.currentUser = null;

// Login handler
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            // Store user data
            window.currentUser = data.user;
            window.isAdmin = data.user.isAdmin;

            // Show/hide admin section
            const adminSection = document.getElementById("admin");
            if (window.isAdmin) {
                adminSection.classList.remove("hidden");
            } else {
                adminSection.classList.add("hidden");
            }

            // Show home section
            showSection("home");
            alert(`Welcome ${data.user.name}!`);
        } else {
            alert(data.message);
        }

    } catch (err) {
        console.error(err);
        alert("Error logging in. Please try again.");
    }
}

// Logout handler
function logout() {
    window.currentUser = null;
    window.isAdmin = false;
    
    // Hide admin section
    const adminSection = document.getElementById("admin");
    adminSection.classList.add("hidden");
    
    // Show login section
    showSection("login");
    
    alert("Logged out successfully!");
}

// Check admin status on page load
document.addEventListener("DOMContentLoaded", function() {
    const adminSection = document.getElementById("admin");
    if (!window.isAdmin) {
        adminSection.classList.add("hidden");
    }
});
