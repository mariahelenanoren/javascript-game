const text = document.querySelector(".text-inner");

const firstOption = document.querySelector(".first-option");
const secondOption = document.querySelector(".second-option");
const button = [firstOption, secondOption]

const menu = document.querySelector(".menu");
const secondaryMenu = document.querySelector(".secondary-menu");
const wrapper = document.querySelector(".wrapper");

let matchCounter = 2;

currentScene = 0;

const actions = [
    /* index 0 */
    startScene = {
        description: "Its dark<br>I can't see anything.<br>Where am I?<br>",
        choices: ["Fumble in the dark"],
        nextScene: [1]
    },
    /* index 1 */
    findMatchbox = {
        description: "You find a matchbox.<br> You can feel two matches inside.",
        choices: ["Light a match", "Keep fumbling"],
        nextScene: [2, 4]
    },
    /* index 2 */
    lightMatch = {
        description: "You light a match.<br>You can see a string in front of you.",
        choices: ["Pull string", "Light another match"],
        nextScene: [5, 3]
    },
    /* index 3 */
    lightAnotherMatch = {
        description: "You light another match.<br>You can still only see the string in front of you.<br>You are out of matches.",
        choices: ["Pull string"],
        nextScene: [5]
    },
    /* index 4 */
    keepFumbling = {
        description: "You keep fumbling around in the dark.<br>You can feel a string infront of you.",
        choices: ["Pull string", "Light a match"],
        nextScene: [5, 2]
    },
    /* index 5 */
    pullString = {
        description: "You pull the string.<br>The light goes on. You are in a cabin.<br>You can see a window, a door, a fireplace<br>and a table with some things on it."
    }
];

window.onload = changeDescription(), changeButtons();

function changeDescription() {
    text.innerHTML = actions[currentScene].description;
}

function changeButtons() {
    button[0].innerHTML = actions[currentScene].choices[0];
    button[1].innerHTML = actions[currentScene].choices[1];
    if (actions[currentScene].nextScene.length < 2) { // Removes second button if only one choice exists
        button[1].style = "display:none";
    }
    else {
        button[1].style = "display:unset";
    }
}

let btn = document.querySelector('#buttons');
    document.addEventListener('click', e => {
      if (e.target.matches('button')) {
        const chosenAnswer = e.target.innerHTML;
        changeScene(chosenAnswer);
      }
    });

function changeScene(answer) {
    if (answer === actions[currentScene].choices[0]) {
        currentScene = actions[currentScene].nextScene[0];
        changeDescription();
        changeButtons();
    }
    else if (answer === actions[currentScene].choices[1]) {
        currentScene = actions[currentScene].nextScene[1];
        changeDescription();
        changeButtons();
    }

    if (answer === actions[1].choices[0]) {
        matchCounter--;
    }
    if (answer === actions[2].choices[1]) {
        matchCounter--;
    }
    console.log(matchCounter);
}