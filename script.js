const text = document.querySelector(".text-inner");
const firstOption = document.querySelector(".first-option");
const secondOption = document.querySelector(".second-option");
const menu = document.querySelector(".menu");
const secondaryMenu = document.querySelector(".secondary-menu");
const wrapper = document.querySelector(".wrapper");
let clickCounterFirst = 0;
let clickCounterSecond = 0;
let matchCounter = 2;

function countClicksFirst() {
    clickCounterFirst++;
    console.log("1st " + clickCounterFirst)
    console.log("2nd " + clickCounterSecond)

    if (clickCounterFirst == 1 && clickCounterSecond == 0) {
        findMatches();
    } else if (clickCounterFirst == 2 && clickCounterSecond == 0) {
        lightMatch();
    } else if (clickCounterFirst == 3 && clickCounterSecond == 0) {
        pullString();
    }
}

function countClicksSecond() {
    clickCounterSecond++;
    console.log("1st " + clickCounterFirst)
    console.log("2nd " + clickCounterSecond)

    if (clickCounterFirst == 1 && clickCounterSecond == 1) {
        keepFumbling();
    }
}



function findMatches() {
    text.innerHTML = "You find a matchbox.<br> You can feel two matches inside.";
    firstOption.innerHTML = "Light a match";
    secondOption.style = "display: unset";
}


function keepFumbling() {
    text.innerHTML = "You keep fumbling.<br> You can feel a string in front of you.";
    firstOption.innerHTML = "Pull the string";
    secondOption.innerHTML = "Keep fumbling";
}

function lightMatch() {
    text.innerHTML = "You light a match.<br>You can see a string in front of you.";
    firstOption.innerHTML = "Pull the string";
    secondOption.innerHTML = "Light another match.";
    matchCounter--;
}

function lightAnotherMatch() {
    text.innerHTML = "You light a match.<br>You can see a string in front of you.";
    firstOption.innerHTML = "Pull the string";
    secondOption.innerHTML = "Light another match.";
    matchCounter--;
}

function pullString() {
    text.innerHTML = "You pull the string. The light goes on.<br>You can finally see that you are in a cabin.<br>There is a window, a door, a table with some<br>things on it and a fireplace.";
    firstOption.style = "display:none";
    secondOption.style = "display:none";
    menu.style = "display:flex";
    wrapper.style = "background-color:white";
    text.style = "color:black";
}