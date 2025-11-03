// Select the menu button and navigation links elements
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i"); // Select the icon inside the menu button

// Toggle navigation menu on button click
menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open"); // Toggle the 'open' class on the nav links

  const isOpen = navLinks.classList.contains("open"); // Check if nav links are open
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line"); // Change icon based on menu state
});

// Close the navigation menu when a link is clicked
navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open"); // Remove the 'open' class to hide nav links
  menuBtnIcon.setAttribute("class", "ri-menu-line"); // Reset the menu button icon
});

// ScrollReveal configuration for animation options
const scrollRevealOption = {
  origin: "bottom", // Animation starts from the bottom
  distance: "50px", // Animation distance
  duration: 1000, // Animation duration in milliseconds
};

// ScrollReveal animations for header elements
ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right", // Animation starts from the right for the header image
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 500, // Delay before animation starts
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000, // Longer delay for the main header text
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500, // Delay for the buttons
});

// ScrollReveal animations for the bestsellers section
ScrollReveal().reveal(".bestsellers__card", {
  ...scrollRevealOption,
  interval: 500, // Staggered animation for each card
});

// ScrollReveal animations for the services section
ScrollReveal().reveal(".service__image img", {
  ...scrollRevealOption,
  origin: "left", // Animation starts from the left for the image
});
ScrollReveal().reveal(".service__content h4", {
  ...scrollRevealOption,
  delay: 500, // Delay for the heading
});
ScrollReveal().reveal(".service__content p", {
  ...scrollRevealOption,
  delay: 1000, // Delay for the paragraph text
});
ScrollReveal().reveal(".service__btn", {
  ...scrollRevealOption,
  delay: 1500, // Delay for the button
});

// ScrollReveal animations for the banner section
ScrollReveal().reveal(".banner__card", {
  ...scrollRevealOption,
  interval: 500, // Staggered animation for each banner card
});

// ScrollReveal animations for the "more" section
ScrollReveal().reveal(".more__card", {
  ...scrollRevealOption,
  interval: 500, // Staggered animation for each card
});

// Swiper initialization for the review slider
const swiper = new Swiper(".swiper", {
  slidesPerView: 3, // Number of slides visible at the same time
  spaceBetween: 20, // Space between each slide in pixels
  loop: true, // Enables infinite looping of slides
});
