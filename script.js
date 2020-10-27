const text = document.querySelector(".text-inner");
const firstOption = document.querySelector(".first-option");
const secondOption = document.querySelector(".second-option");
const menu = document.querySelector(".menu");
const secondaryMenu = document.querySelector(".secondary-menu");
const wrapper = document.querySelector(".wrapper");
/*let clickCounterFirst = 0;
let clickCounterSecond = 0;*/
inventory = [];

currentScene = 0;

const actions = [
    /* 0 */
    startScene = {
        description: "Its dark<br>I can't see anything.<br>Where am I?<br>",
        choices: ["Fumble in the dark"],
        nextScene: [1]
    },
    /* 1 */
    findMatchbox = {
        description: "You find a matchbox.<br> You can feel two matches inside.",
        choices: ["Light a match", "Keep fumbling"],
        nextScene: [2, 4]
    },
    /* 2 */
    lightMatch = {
        description: "You light a match.<br>You can see a string in front of you.",
        choices: ["Pull string", "Light another match"],
        nextScene: [5, 3]
    },
    /* 3 */
    lightAnotherMatch = {
        description: "You light another match.<br>You can still only see the string in front of you.<br>You are out of matches.",
        choices: ["Pull string"],
        nextScene: [5]
    },
    /* 4 */
    keepFumbling = {
        description: "You keep fumbling around in the dark.<br>You can feel a string infront of you.",
        choices: ["Pull string", "Light a match"],
        nextScene: [5, 2]
    },
    /* 5 */
    pullString = {
        description: "You pull the string.<br>The light goes on. You are in a cabin.<br>You can see a window, a door, a fireplace<br>and a table with some things on it. ",
    }
];

window.onload = changeDescription(), changeButtons();

function changeDescription() {
    text.innerHTML = actions[currentScene].description;
}

function changeButtons() {
    firstOption.innerHTML = actions[currentScene].choices[0];
    secondOption.innerHTML = actions[currentScene].choices[1];
    if (actions[currentScene].nextScene.length < 2) { // Removes second button if only one choice exists
        secondOption.style = "display:none";
    }
}

function clickButtons() {

}

function handleAnswer() {
    answer = actions[currentScene].choices;
    changeScene(answer);
}

function changeScene() {
    if (answer === scenes[currentScene].choices[0]) {
        currentScene = scenes[currentScene].nextScene[0];
    }
    if (answer === scenes[currentScene].choices[1]) {
        currentScene = scenes[currentScene].nextScene[1];
    }
}

/* function countClicksFirst() {
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
} */