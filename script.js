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

let messageInput = document.createElement("input");
let nameInput = document.createElement("input");
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
        choices: ["Write a message"],
        nextScene: [10]
    },
    /* index 7 */
    theDoor = {
        description: "The door is closed.<br>It looks to be as old as the cabin.",
        choices: ["Try turning the handle"],
        nextScene: [22]
    },
    /* index 8 */
    theFireplace = {
        description: "The cabin is cold.<br>There is firewood next to the fireplace.",
        choices: ["Put wood in the fireplace"],
        nextScene: [19]
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
        description: "I try the silver key.<br>It fits in the lock.<br>The door is now open.",
        choices: ["Leave the cabin"],
        nextScene: [23]
    },
    /* index 13 */
    turningHandleWrongKey = {
        description: "I try the bronze key.<br>It doesn't fit in the lock.",
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
    theBronzeKey = {
        description: "A bronze key.",
        choices: ["Pick up the bronze key"],
        nextScene: [15]
    },
    /* index 16 */
    theGuestbook = {
        description: "The newest entry is from 1962.<br>It was signed by Walter Buck.",
        choices: ["Sign the guestbook"],
        nextScene: [21]
    },
    /* index 17 */
    thePen = {
        description: "A regular pen.",
        choices: ["Pick up the pen"],
        nextScene: [17]
    },
    /* index 18 */
    signTheGuestbook = {
        description: "Should I really sign my real name,<br> I still don't know how I got here...",
        choices: ["Done"],
        nextScene: [16]
    },
    /* index 19 */
    putWood = {
        description: "I put a couple of logs in the fireplace.<br>Underneath there lays a silver key.",
        choices: ["Pick up the silver key"],
        nextScene: [20]
    },
    /* index 20 */
    pickUpSilverKey = {
        description: "I put the silver key in my pocket.",
        choices: ["Light the fireplace"],
        nextScene: [8]
    },
    /* index 21 */
    noPenGuestbook = {
        description: "I don't have a pen to write in the guestbook with.",
        choices: [],
        nextScene: []
    },
    /* index 22 */
    turningDoorHandle = {
        description: "The door is locked.",
        choices: [],
        nextScene: []
    },
    /* index 22 */
    leavingTheCabin = {
        description: "The air feels cool and crisp.<br>Snow is still the only thing in sight.<br>I wonder where I go from here...",
        choices: ["Play again"],
        nextScene: [0]
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
            secondaryMenu.style.display = "none";
            changeDescription();
            changeButtons();
        }
        else if (answer === "The door") {
            currentScene = 7;
            secondaryMenu.style.display = "none";
            changeDescription();
            changeButtons();
        } 
        else if (answer === "The fireplace") {
            currentScene = 8;
            secondaryMenu.style.display = "none";
            changeDescription();
            changeButtons();
        } 
        else if (answer === "The table") {
            currentScene = 9;
            secondaryMenu.style.display = "flex";
            changeDescription();
            changeButtons();
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

    if (answer === "Pick up the pen") {
        pickedUpPen();
        if (penObtained === true) {
            changeGuestbook();
        }
    }

    if (answer === "Pick up the bronze key") {
        pickedUpBronzeKey();
    }

    if (answer === "Pick up the silver key") {
        pickedUpSilverKey();
    }

    if (answer === "Light the fireplace") {
        checkMatches();
        if (fireIsBurning === true) {
            defrostWindow();
        }
        if (fireIsBurning === false) {
            changeFireplaceScene();
        }
    }

    if (answer === "Done") {
        getInput();
    }

    if (answer === "Try turning the handle") {
        checkKeys();
    }

    if (currentScene === 10) {
        showMessageInputBox();
    }
    else if (currentScene === 18) {
        showNameInputBox();
    }
    else {
        messageInput.style.display = "none";
        nameInput.style.display = "none";
    }

    /*if (currentScene === 23) {
        menu.style.display = "none!important";
        secondaryMenu.style.display = "none!important";
        console.log("twentytwo")
    }*/

    if (currentScene > 4 ) {
        changeSceneColors();
    }
    else {
        wrapper.style.backgroundColor = "black";
        text.style.color = "white";
        footer.setAttribute("style", "border-top: 1px solid white; color: white");
    }
    console.log("currentScene: " + currentScene)
}

function changeSceneColors() {
    wrapper.style.backgroundColor = "white";
    text.style.color = "black";
    footer.setAttribute("style", "border-top: 1px solid black; color: black");
    if (currentScene !== 23) {
        menu.style.display = "unset";
    }
    else if (currentScene === 23) {
        menu.style.display = "none";
    }
}

function getInput() {
    let userInputMessage = messageInput.value;
    let userInputName = nameInput.value;
    if (userInputMessage !== "") {
        showInputMessage(userInputMessage);
    }
    if (userInputName !== "") {
        showInputName(userInputName);
    }
    changeDescription();
    changeButtons();
}

function showMessageInputBox() {
    element.appendChild(messageInput);
    messageInput.setAttribute("style", "display:flex; width: 80%");
    nameInput.style.display = "none";
}

function showNameInputBox() {
    element.appendChild(nameInput);
    nameInput.setAttribute("style", "display:flex; width: 80%");
    messageInput.style.display = "none";
}

function showInputMessage(message) {
    actions[6].description = "The window says: " + message;
    actions[6].choices = [];
    actions[6].nextScene = [];
}
function showInputName(name) {
    actions[16].description = "I decided to write " + name + " in the guestbook.";
    actions[16].choices = [];
    actions[16].nextScene = [];
}

function pickedUpPen() {
    penObtained = true;
    actions[17].description = "I put the pen in my pocket.";
    actions[17].choices = [];
    actions[17].nextScene = [];
    changeDescription();
    changeButtons();
}

function pickedUpBronzeKey() {
    keysObtained.push("bronzeKey");
    actions[15].description = "I put the bronze key in my pocket.";
    actions[15].choices = [];
    actions[15].nextScene = [];
    changeDescription();
    changeButtons();
}

function pickedUpSilverKey() {
    keysObtained.push("silverKey");
}

function changeGuestbook() {
    actions[16].nextScene = [18];
    changeDescription();
    changeButtons();
}

function defrostWindow() {
    actions[8].description = "The fire is burning.<br>The cabin is slowly getting warmer.";
    actions[8].choices = []
    actions[8].nextScene = [];
    actions[6].description = "I look out.<br>There is snow as far as the eye can see.";
    actions[6].choices = []
    actions[6].nextScene = [];
    changeDescription();
    changeButtons();
}

function checkMatches() {
    if (matchCounter > 0) {
        fireIsBurning = true;
    }
    else {
        fireIsBurning = false;
    }
}

function changeFireplaceScene() {
    actions[8].description = "I have no matches to light the fireplace with.<br>The cabin is cold.";
    actions[8].choices = [];
    actions[8].nextScene = [];
    changeDescription();
    changeButtons();
}

function checkKeys() {
    if (keysObtained.includes("bronzeKey") && keysObtained.length === 1) {
       openingDoorBronzeKey();
    }
    else if (keysObtained.includes("silverKey") && keysObtained.length === 1){
       openingDoorSilverKey();
    }
    else if (keysObtained.length === 2) {
        openingDoorBothKeys();
    }
    else if (keysObtained.length === 0) {
        openingDoorNoKeys();
    }
    changeDescription();
    changeButtons();
}

function openingDoorBronzeKey() {
    actions[22].description = "The door is locked."
    actions[22].choices[0] = "Try the bronze key"
    actions[22].nextScene[0] = 13;
    wrapper.setAttribute( "style", "align-items: unset; grid-template-areas: 'menu text secondary-menu''menu options secondary-menu''footer footer footer'")
} 
function openingDoorSilverKey() {
    actions[22].description = "The door is locked."
    actions[22].choices[0] = "Try the silver key"
    actions[22].nextScene[0] = 12;
    wrapper.setAttribute( "style", "align-items: unset; grid-template-areas: 'menu text secondary-menu''menu options secondary-menu''footer footer footer'")
} 
function openingDoorBothKeys() {
    actions[22].description = "The door is locked."
    actions[22].choices[0] = "Try the silver key"
    actions[22].nextScene[0] = 12;
    actions[22].choices[1] = "Try the bronze key"
    actions[22].nextScene[1] = 13;
    wrapper.setAttribute( "style", "align-items: unset; grid-template-areas: 'menu text secondary-menu''menu options secondary-menu''footer footer footer'")
} 

function openingDoorNoKeys() {
    actions[22].description = "The door is locked.<br>Perhaps there's a key somewhere."
    actions[22].choices = [];
    actions[22].nextScene = [];
}