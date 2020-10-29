const text = document.querySelector(".text-inner");

const firstOption = document.querySelector(".first-option");
const secondOption = document.querySelector(".second-option");
const button = [firstOption, secondOption]
const buttonWrapper = document.querySelector(".button-container")

const menu = document.querySelector(".menu");
const secondaryMenu = document.querySelector(".secondary-menu");
const wrapper = document.querySelector(".wrapper");
const footer = document.querySelector(".footer");
const subButton = document.querySelector(".submit");

const messageInput = document.createElement("input");
const nameInput = document.createElement("input");
const element = document.querySelector(".user-inputs");

let nameWritteninGuestbook = false;

menuButtons = [
    windowBtn = document.querySelector("#window"),
    doorBtn = document.querySelector("#door"),
    fireplaceBtn = document.querySelector("#fireplace"),
    tableBtn = document.querySelector("#table"),
];

let fireIsBurning = false;
let messageWrittenOnWindow = false;
let keysObtained = [] //push the keys, if right key is obtained door can be opened
let penObtained = false;

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
        description: "The door is closed.<br>It looks to be as old as the cabin.",
        choices: ["Try turning the handle"],
        nextScene: [12]
    },
    /* index 8 */
    theFireplace = {
        description: "the Fireplace",
        choices: [],
        nextScene: []
    },
    /* index 9 */
    theTable = {
        description: "The table seems tattered.<br>On it lays a newspaper,<br>a key, guestbook and a pen.",
        choices: [],
        nextScene: []
    },
    /* index 10 */
    writeMessage = {
        description: "The frost feels cold against my fingers.",
        choices: ["Done"],
        nextScene: [6]
    },
    /* index 11 */
    turningHandleNoKey = {
        description: "The door seems to be locked.<br>Perhaps there is a key somewhere.",
        choices: [],
        nextScene: []
    },
    /* index 12 */
    turningHandleRightKey = {
        description: "You try the silver key.<br>It fits in the lock.<br>The door is now open.",
        choices: [],
        nextScene: [/* Add the final scene */]
    },
    /* index 13 */
    turningHandleWrongKey = {
        description: "You try the bronze key.<br>It doesn't fit in the lock.",
        choices: [],
        nextScene: []
    },
    /* index 14 */
    theNewspaper = {
        description: "The paper has the date October 17, 1962.<br>The New York Yankees defeated the<br>San Fransisco Giants in the world series.",
        choices: [],
        nextScene: []
    },
    /* index 15 */
    theKey = {
        description: "A bronze key.",
        choices: ["Pick up the key"],
        nextScene: [15]
    },
    /* index 16 */
    theGuestbook = {
        description: "The newest entry is from 1962.<br>It was signed by Walter Buck.",
        choices: ["Sign the guestbook"],
        nextScene: [18]
    },
    /* index 17 */
    thePen = {
        description: "A regular pen.",
        choices: ["Pick up the Pen"],
        nextScene: [17]
    },
    /* index 18 */
    signTheGuestbook = {
        description: "Should I really sign my real name,<br> I still don't know how I got here...",
        choices: ["Done"],
        nextScene: [16]
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

/*subButton.addEventListener("click", getMessage);

function getMessage() {
    let message = document.querySelector("#input-message").value;
    let name = document.querySelector("#input-message").value;
    messageWrittenOnWindow = true;
    nameWritteninGuestbook = true;
    if (messageWrittenOnWindow === true) {
        actions[6].description = "The window says: " + message;
        actions[6].choices = [];
        actions[6].nextScene = [];
    }
    if (messageWrittenOnWindow === true) {
        actions[16].description = "I decided to write " + name + "in the guestbook.";
        actions[16].choices = [];
        actions[16].nextScene = [];
    }
}*/

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
            secondaryMenu.style.display = "none";
        }
        else if (answer === "The door") {
            currentScene = 7;
            console.log("clickedMenuButtons currentScene: " + currentScene)
            changeDescription();
            changeButtons();
            changeSceneColors();
            secondaryMenu.style.display = "none";
        } 
        else if (answer === "The fireplace") {
            currentScene = 8;
            console.log("clickedMenuButtons currentScene: " + currentScene)
            changeDescription();
            changeButtons();
            changeSceneColors();
            secondaryMenu.style.display = "none";
        } 
        else if (answer === "The table") {
            currentScene = 9;
            console.log("clickedMenuButtons currentScene: " + currentScene)
            changeDescription();
            changeButtons();
            changeSceneColors();
            secondaryMenu.style.display = "flex";
        }
        else {
            if (answer === "The newspaper") {
                currentScene = 14;
                changeDescription();
                changeButtons();
            }
            else if (answer === "The key") {
                currentScene = 15;
                changeDescription();
                changeButtons();
            }
            else if (answer === "The guestbook") {
                currentScene = 16;
                changeDescription();
                changeButtons();
            }
            else if (answer === "The pen") {
                currentScene = 17;
                changeDescription();
                changeButtons();
            }
        }
    }

    if (answer === actions[1].choices[0] || answer === actions[2].choices[1]) {
        matchCounter--;
    }

    if (currentScene === 10) {
    element.appendChild(messageInput);
    messageInput.setAttribute("style", "display:flex; width: 80%")
    }
    else if (currentScene === 18) {
    element.appendChild(nameInput);
    nameInput.setAttribute("style", "display:flex; width: 80%")
    }
    else {
        messageInput.style.display = "none";
        nameInput.style.display = "none";
    }

    if (currentScene > 4 ) {
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

if (fireIsBurning !== true) {
    actions[6].description = "I look out.<br>There is snow as far as the eye can see.<br>The window is frosty.<br>";
    actions[6].choices.push("Write a message");
    actions[6].nextScene.push(10);
}