let text = document.querySelector(".text-inner");
let firstOption = document.querySelector(".first-option");
let secondOption = document.querySelector(".second-option");

function findMatches() {
    text.innerHTML = "You find a matchbox.<br> You can feel two matches inside.";
    firstOption.innerHTML = "Light a match";
    secondOption.style = "display: unset";

}