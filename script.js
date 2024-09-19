const qs = (selector) => document.querySelector(selector);
const question = qs(".question");
const gif = qs(".gif");
const [yesBtn, noBtn] = [".yes-btn", ".no-btn"].map(qs);

const handleYesClick = () => {
  question.innerHTML = "Good girl, you made the right choice! Now you get to pick where we're going and the activities we're doing.";
    gif.src = "https://media.giphy.com/media/UMon0fuimoAN9ueUNP/giphy.gif";

    // Remove the 'mouseover' event listener from noBtn
    noBtn.removeEventListener("mouseover", handleNoMouseOver);

    // Remove the noBtn from the DOM
    noBtn.remove();

    // Create and style a new button for Let's Go!
    const letsGoBtn = document.createElement("button");
    letsGoBtn.textContent = "Let's Go!";
    letsGoBtn.classList.add("letsgo-btn");
    letsGoBtn.style.position = "absolute";
    
    // Adjust the left position based on screen width
    letsGoBtn.style.left = window.innerWidth <= 800 ? "95%" : "63%";
    letsGoBtn.style.transform = "translate(-50%, -50%)";
    letsGoBtn.style.width = "200px";

    // Add a click event listener to redirect the user
    letsGoBtn.addEventListener("click", () => {
        // Replace 'secondpage.html' with the URL of the page you want to redirect to
        window.location.href = 'Secpage.html';
    });

    // Replace yesBtn with the new letsGoBtn
    yesBtn.replaceWith(letsGoBtn);
};

const handleNoMouseOver = () => {
    const { width, height } = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height;

    noBtn.style.position = "absolute";
    noBtn.style.left = `${Math.floor(Math.random() * maxX)}px`;
    noBtn.style.top = `${Math.floor(Math.random() * maxY)}px`;
};

yesBtn.addEventListener("click", handleYesClick);
noBtn.addEventListener("mouseover", handleNoMouseOver);
