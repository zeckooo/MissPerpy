const qs = (selector) => document.querySelector(selector);
const question = qs(".question");
const gif = qs(".gif");
const scaredBtn = qs(".scared-btn");

let moveAttempts = 0;
const maxAttempts = 5;

// Store the original position of the button
const originalPosition = {
    left: getComputedStyle(scaredBtn).left,
    top: getComputedStyle(scaredBtn).top
};

// Function to move the button
const moveButton = () => {
    const { width, height } = scaredBtn.getBoundingClientRect();
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height;

    // Move button left and right
    if (moveAttempts < maxAttempts) {
        scaredBtn.style.position = "absolute";
        scaredBtn.style.left = `${Math.floor(Math.random() * maxX)}px`;
        scaredBtn.style.top = `${Math.floor(Math.random() * maxY)}px`;

        moveAttempts++;
    } else {
        // Stop moving and move back to the original position
        scaredBtn.style.position = "relative";
        scaredBtn.style.left = originalPosition.left;
        scaredBtn.style.top = originalPosition.top;
        scaredBtn.style.transform = "none";
        
        // Scroll down to show the button
        scaredBtn.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Remove the mouseover event listener
        scaredBtn.removeEventListener("mouseover", handleScaredMouseOver);
    }
};

// Function to handle button click
const handleScaredClick = () => {
    if (moveAttempts >= maxAttempts) {
        // Hide the button
        scaredBtn.style.display = "none";

        // Display the message below the button
        const message = document.createElement("div");
        message.textContent = "Oops! Looks like I forgot to fix that button—guess there's no turning back miss perpy! 😅";
        message.style.fontSize = "1.6rem"; // Increase font size
        message.style.fontWeight = "bold"; // Make text bold
        message.style.color = "#d32f2f"; // Dark red color for better contrast
        message.style.marginTop = "20px"; // Increase space above message
        message.style.padding = "15px"; // Add padding around the message
        message.style.borderRadius = "12px"; // Rounded corners
        message.style.textAlign = "center"; // Center align text
        message.style.maxWidth = "90%"; // Limit width to 90% of its container
        message.style.margin = "20px auto"; // Center the message horizontally
        scaredBtn.parentElement.appendChild(message);
    }
};

const handleScaredMouseOver = () => {
    moveButton();
};

// Adding event listeners
scaredBtn.addEventListener("click", handleScaredClick);
scaredBtn.addEventListener("mouseover", handleScaredMouseOver);
