document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    header.style.backgroundColor = "#007BFF"; // Change header color to blue

    const dynamicElements = document.querySelectorAll(".dynamic");
    dynamicElements.forEach((element) => {
        element.style.color = "blue"; // Change color of dynamic elements to blue
    });

    const dynamicButtons = document.querySelectorAll(".dynamic-button");
    dynamicButtons.forEach((button) => {
        button.addEventListener("click", function () {
            alert("Button clicked!"); // Add click event to dynamic buttons
        });
    });
});
