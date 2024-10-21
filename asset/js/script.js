

// Retrieve the active index from localStorage, or default to 0
var savedSlideIndex = localStorage.getItem('activeSlideIndex') ? parseInt(localStorage.getItem('activeSlideIndex')) : 0;

// Initialize Swiper
var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    mousewheel: {
        sensitivity: 1,
        thresholdDelta: 20,
        releaseOnEdges: false,
    },
    slidesPerView: 1,
    centeredSlides: true,
    freeMode: false,
    speed: 600,
    allowTouchMove: true,
    
    // Start from the saved slide index
    initialSlide: savedSlideIndex,

    // Event listener to save the current slide index on slide change
    on: {
        slideChange: function() {
            localStorage.setItem('activeSlideIndex', this.activeIndex);
        }
    }
});

// Function to animate counters
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / 200; // Adjust to control speed

    const updateCounter = () => {
        count += increment;
        if (count < target) {
            counter.textContent = Math.ceil(count);
            setTimeout(updateCounter, 10); // Adjust to control speed
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
}

// Function to observe when the section is in view
function startCounting(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => animateCounter(counter));
            observer.disconnect(); // Stop observing once animation starts
        }
    });
}

// Create an observer
const observer = new IntersectionObserver(startCounting, {
    threshold: 0.5 // Adjust to trigger when 50% of the section is in view
});

// Target the counter section
observer.observe(document.querySelector('.counter-section'));



// Texts with color changes for specific words
const texts = [
    [
        { text: "A ", class: "" }, // Normal text
        { text: "Dental Service ", class: "text-blue" }, // Highlighted word in blue
        { text: "Provider! ", class: "" } // Normal punctuation
    ]
];

let textIndex = 0;  // Which line we're typing
let wordIndex = 0;  // Which word in the line we're typing
let charIndex = 0;  // Which character in the current word
const typingSpeed = 150;  // Speed of typing

function typeEffect() {
    const typingTextElement = document.getElementById("typing-text");

    // Get the current line and word
    const currentLine = texts[textIndex];
    const currentWordObj = currentLine[wordIndex];
    const currentWord = currentWordObj.text;

    // Create a span for the word if it doesn't exist yet
    let currentSpan = typingTextElement.querySelectorAll('span')[wordIndex];
    if (!currentSpan) {
        currentSpan = document.createElement('span');
        currentSpan.className = currentWordObj.class;
        typingTextElement.appendChild(currentSpan);
    }

    // Type each character of the current word
    if (charIndex < currentWord.length) {
        currentSpan.innerHTML += currentWord.charAt(charIndex); // Append the next character
        charIndex++;
        setTimeout(typeEffect, typingSpeed); // Continue typing
    } else {
        // Move to the next word if available
        wordIndex++;
        if (wordIndex < currentLine.length) {
            charIndex = 0; // Reset the character index for the next word
            setTimeout(typeEffect, typingSpeed); // Continue typing the next word
        } else {
            // Move to the next line if available
            textIndex++;
            if (textIndex < texts.length) {
                wordIndex = 0; // Reset word index for the next line
                charIndex = 0; // Reset character index for the next line
                // Add a line break before the next line
                const lineBreak = document.createElement('br');
                typingTextElement.appendChild(lineBreak);
                setTimeout(typeEffect, 1000); // Pause for 1 second before typing the next line
            } else {
                // After all lines are typed, remove the cursor
                typingTextElement.style.borderRight = "none"; // Stop cursor when done typing
            }
        }
    }

    // Add blinking cursor effect only to the current line
    typingTextElement.classList.remove('blinking-cursor');
    if (wordIndex < currentLine.length) {
        typingTextElement.classList.add('blinking-cursor');
    }
}

// Start the typing effect when the page loads
window.onload = function () {
    typeEffect();
};




