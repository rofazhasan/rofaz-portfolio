document.getElementById("home-btn").addEventListener("click", () => {
    document.getElementById("title").textContent = "Md Rofaz Hasan Rafiu";
    document.getElementById("description").textContent = "Computer Science Student at RUET | Backend Developer | AI Enthusiast";
});

document.getElementById("projects-btn").addEventListener("click", () => {
    // Load and display projects dynamically
    // You can fetch your projects from an API or use hardcoded data
    // Update the content using JavaScript
});

document.getElementById("contact-btn").addEventListener("click", () => {
    document.getElementById("title").textContent = "Contact Me";
    document.getElementById("description").textContent = "Email: mdrofaz@example.com | LinkedIn: linkedin.com/in/mdrofaz | Facebook: facebook.com/mdrofaz";
});

// Popup functionality
const popup = document.getElementById("popup");
const popupCloseBtn = document.getElementById("close-popup");

popupCloseBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Show popup after a delay (for demonstration purposes)
setTimeout(() => {
    popup.style.display = "flex";
}, 2000);
