const text = document.querySelector(".text-inner");

const firstOption = document.querySelector(".first-option");
const secondOption = document.querySelector(".second-option");
const button = [firstOption, secondOption]
const buttonWrapper = document.querySelector(".button-container")

const menu = document.querySelector(".menu");
const secondaryMenu = document.querySelector(".secondary-menu");
const wrapper = document.querySelector(".wrapper");
const footer = document.querySelector(".footer");

const inputMessage = document.querySelector(".text-input-container");

menuButtons = [
    windowBtn = document.querySelector("#window"),
    doorBtn = document.querySelector("#door"),
    fireplaceBtn = document.querySelector("#fireplace"),
    tableBtn = document.querySelector("#table"),
];

let matchCounter = 2;

currentScene = 0;

const actions = [
    /* index 0 */
    startScene = {
        description: "It's dark<br>I can't see anything.<br>Where am I?<br>",
        choices: ["Fumble in the dark"],
        nextScene: [1]
    },
    /* index 1 */
    findMatchbox = {
        description: "I find a matchbox.<br>I can feel two matches inside.",
        choices: ["Light a match", "Keep fumbling"],
        nextScene: [2, 4]
    },
    /* index 2 */
    lightMatch = {
        description: "I light a match.<br>I can see a string in front of me.",
        choices: ["Pull string", "Light another match"],
        nextScene: [5, 3]
    },
    /* index 3 */
    lightAnotherMatch = {
        description: "I light another match.<br>I can still only see the string in front of me.<br>I am out of matches.",
        choices: ["Pull string"],
        nextScene: [5]
    },
    /* index 4 */
    keepFumbling = {
        description: "I keep fumbling around in the dark.<br>I can feel a string infront of me.",
        choices: ["Pull string", "Light a match"],
        nextScene: [5, 2]
    },
    /* index 5 */
    pullString = {
        description: "I pull the string.<br>The light goes on. I am in a cabin.<br>I can see a window, a door, a fireplace<br>and a table with some things on it.",
        choices: [],
        nextScene: []
    },
    /* index 6 */
    theWindow = {
        description: "I look out.<br>There is snow as far as the eye can see.",
        choices: [],
        nextScene: []
    },
    /* index 7 */
    theDoor = {
        description: "The door looks old.",
        choices: [],
        nextScene: []
    },
    /* index 8 */
    theFireplace = {
        description: "the Fireplace",
        choices: [],
        nextScene: []
    },
    /* index 9 */
    theTable = {
        description: "the Table",
        choices: [],
        nextScene: []
    },
    /* index 10 */
    writeMessage = {
        description: "The frost feels cold against my fingers.",
        choices: [],
        nextScene: []
    }
];

window.onload = changeDescription(), changeButtons();

function changeDescription() {
    text.innerHTML = actions[currentScene].description;
}

function changeButtons() {
    button[0].innerHTML = actions[currentScene].choices[0];
    button[1].innerHTML = actions[currentScene].choices[1];
    if (actions[currentScene].nextScene.length === 1) { // Removes second button if only one choice exists
        button[1].style.display = "none";
        button[0].style.display = "unset"
        buttonWrapper.style.display = "flex";
        wrapper.setAttribute( "style", "align-items: unset; grid-template-areas: 'menu text secondary-menu''menu options secondary-menu''footer footer footer'")
    }
    else if (actions[currentScene].nextScene.length === 0) {
        button[0].style.display = "none";
        button[1].style.display = "none";
        buttonWrapper.style.display = "none";
        wrapper.setAttribute( "style", "align-items: center; grid-template-areas: 'menu text secondary-menu''menu text secondary-menu''footer footer footer'")
    }
    else {
        button[0].style.display = "unset";
        button[1].style.display = "unset";
        buttonWrapper.style.display = "flex";
    }
}

let btn = document.querySelector('.button-container');
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
    else {
        if (answer === "The window") {
            currentScene = 6;
            console.log("clickedMenuButtons currentScene: " + currentScene)
            changeDescription();
            changeButtons();
            changeSceneColors();
        }
        else if (answer === "The door") {
            currentScene = 7;
            console.log("clickedMenuButtons currentScene: " + currentScene)
            changeDescription();
            changeButtons();
            changeSceneColors();
        } 
        else if (answer === "The fireplace") {
            currentScene = 8;
            console.log("clickedMenuButtons currentScene: " + currentScene)
            changeDescription();
            changeButtons();
            changeSceneColors();
        } 
        else if (answer === "The table") {
            currentScene = 9;
            console.log("clickedMenuButtons currentScene: " + currentScene)
            changeDescription();
            changeButtons();
            changeSceneColors();
        } 
        else if (answer === "Done") {
            currentScene = 11;
            console.log("clickedMenuButtons currentScene: " + currentScene)
            changeDescription();
            changeButtons();
            changeSceneColors();
        } 
    }

    if (answer === actions[1].choices[0] || answer === actions[2].choices[1]) {
        matchCounter--;
    }

    if (currentScene > 4 ) {
        changeSceneColors();
    }

    if (currentScene === 10) {
        inputMessage.style.display = "flex";
        wrapper.setAttribute( "style", "align-items: unset; grid-template-areas: 'menu text secondary-menu''menu options secondary-menu''footer footer footer'")
        changeSceneColors();
    }

    console.log(matchCounter);
    console.log("changeScene currentScene: " + currentScene);
    console.log(answer);
}

function changeSceneColors() {
    wrapper.style.backgroundColor = "white";
    text.style.color = "black";
    footer.setAttribute("style", "border-top: 1px solid black; color: black")
    menu.style.display = "unset";
}

fireIsBurning = false;

if (fireIsBurning !== true) {
    actions[6].description = "I look out.<br>There is snow as far as the eye can see.<br>The window is frosty.<br>";
    actions[6].choices.push("Write a message");
    actions[6].nextScene.push(10);
}