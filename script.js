const firstOption = document.querySelector(".first-option");
const secondOption = document.querySelector(".second-option");
/** 
 * An array for the option buttons 
 * @type {Array}
 * */
const button = [firstOption, secondOption]
const buttonWrapper = document.querySelector(".button-container")

const text = document.querySelector(".text-inner");
const menu = document.querySelector(".menu");
const secondaryMenu = document.querySelector(".secondary-menu");
const wrapper = document.querySelector(".wrapper");
const footer = document.querySelector(".footer");

let messageInput = document.createElement("input");
let nameInput = document.createElement("input");
const element = document.querySelector(".user-inputs");

/** 
 * An array of variables for the menu buttons
 * @type {Array}
 */
menuButtons = [
    windowBtn = document.querySelector("#window"),
    doorBtn = document.querySelector("#door"),
    fireplaceBtn = document.querySelector("#fireplace"),
    tableBtn = document.querySelector("#table"),
];

let fireIsBurning = false;
let nameWritteninGuestbook = false;
let messageWrittenOnWindow = false;
let penObtained = false;
let keysObtained = [];
let matchCounter = 2;

currentScene = 0;

/**
 * An array of all the scenes. The scenes are objects with a description, choices and the following scene
 * @type {Array{description: string, choices: string, nextScene: number}}
 */
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

/**
 * Changes the descrition and buttons as soon as the page has been loaded
 */
window.onload = changeDescription(), changeButtons();

/**
 * Changes the description to fit the current scene
 */
function changeDescription() {
    text.innerHTML = actions[currentScene].description;
}

/**
 * Changes the buttons to fit the choices of the current scene
 */
function changeButtons() {
    button[0].innerHTML = actions[currentScene].choices[0];
    button[1].innerHTML = actions[currentScene].choices[1];
    if (actions[currentScene].choices.length === 1) {
        button[1].style.display = "none";
        button[0].style.display = "unset"
        buttonWrapper.style.display = "flex";
    }
    else if (actions[currentScene].choices.length === 0) {
        button[0].style.display = "none";
        button[1].style.display = "none";
        buttonWrapper.style.display = "none";
    }
    else {
        button[0].style.display = "unset";
        button[1].style.display = "unset";
        buttonWrapper.style.display = "flex";
    }
}

/**
 * When a button is pressed the innerHTML of the button is sent to changeScene()
 */
let btn = document.querySelector('.button-container');
    document.addEventListener('click', e => {
      if (e.target.matches('button')) {
        const chosenAnswer = e.target.innerHTML;
        changeScene(chosenAnswer);
      }
    });

/**
 * Changes the scene based of the button pressed by the player
 * @param {string} answer the innerHTML of the button which triggered the function
 */
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

    /** Removes a matchstick if the player lights one */
    if (answer === actions[1].choices[0] || answer === actions[2].choices[1]) {
        matchCounter--;
    }

    /**
    * If player clicked on the button to pick up pen, trigger pickedUpPen()
    */
    if (answer === "Pick up the pen") {
        pickedUpPen();
        /** If pen has been obtained, trigger changeGuestbook() */
        if (penObtained === true) {
            changeGuestbook();
        }
    }

    /** If player clicked on the button to pick up bronze key, trigger pickedUpBronzeKey() */
    if (answer === "Pick up the bronze key") {
        pickedUpBronzeKey();
    }
    /** If player clicked on the button to pick up silver key, trigger function pickedUpSilverKey() */
    if (answer === "Pick up the silver key") {
        pickedUpSilverKey();
    }

    /** 
     * If player clicked on the button to light the fireplace, check if player still has matches
     */
    if (answer === "Light the fireplace") {
        checkMatches();
        /** If fire is burning, defrost the window */
        if (fireIsBurning === true) {
            defrostWindow();
        }
        /** If fire is not burning, change the fireplace scene */
        if (fireIsBurning === false) {
            changeFireplaceScene();
        }
    }

    /** If player clicked on the "Done" button, get the input */
    if (answer === "Done") {
        getInput();
    }

    /** If player clicked button to try turning the handle, check if player has obtained keys */
    if (answer === "Try turning the handle") {
        checkKeys();
    }

    /** If the current scene is the writeWindow scene, create message input */
    if (currentScene === 10) {
        createMessageInput();
    }
    /** If the current scene is the signTheGuestbook scene, create name input */
    else if (currentScene === 18) {
        createNameInput();
    }
    else {
        messageInput.style.display = "none";
        nameInput.style.display = "none";
    }

    /** If the current scene is after the light has been turned on, change scene colors to light */
    if (currentScene > 4 ) {
        changeSceneColors();
    }
    /** If the current scene is before the light has been turned on, change scene colors to dark */
    else {
        wrapper.style.backgroundColor = "#1e1e1e";
        text.style.color = "white";
        footer.setAttribute("style", "border-top: 1px solid white; color: white");
    }
}

/**
 * Changes colors based on the scene
 */
function changeSceneColors() {
    wrapper.style.backgroundColor = "white";
    text.style.color = "black";
    footer.setAttribute("style", "border-top: 1px solid black; color: black");
    if (currentScene !== 23) {
        menu.style.display = "flex";
    }
    else if (currentScene === 23) {
        menu.style.display = "none";
    }
}

/**
 * Creates an input field for the window scene
 */
function createMessageInput() {
    element.appendChild(messageInput);
    messageInput.setAttribute("style", "display:flex; width: 80%");
    nameInput.style.display = "none";
}

/**
 * Creates an input field for the window scene
 */
function createNameInput() {
    element.appendChild(nameInput);
    nameInput.setAttribute("style", "display:flex; width: 80%");
    messageInput.style.display = "none";
}

/**
 * Fetches the text the player has written into the input fields
 */
function getInput() {
    let userInputMessage = messageInput.value;
    let userInputName = nameInput.value;
    if (userInputMessage !== "") {
        showInputMessage(userInputMessage);
    }
    if (userInputName !== "") {
        showInputName(userInputName);
    }
}


/**
 * Updates the window scene and displays the message
 * @param {string} message input value given by the player
 */
function showInputMessage(message) {
    actions[6].description = "The window says: " + message;
    actions[6].choices = [];
    actions[6].nextScene = [];
    changeDescription();
    changeButtons();
}

/**
 * Updates the guestbook scene and displays the name
 * @param {string} name input value given by the player 
 */
function showInputName(name) {
    actions[16].description = "I decided to write " + name + " in the guestbook.";
    actions[16].choices = [];
    actions[16].nextScene = [];
    changeDescription();
    changeButtons();
}

/**
 * Changes value of penObtained to true and changes the pen scene
 */
function pickedUpPen() {
    penObtained = true;
    actions[17].description = "I put the pen in my pocket.";
    actions[17].choices = [];
    actions[17].nextScene = [];
    changeDescription();
    changeButtons();
}

/**
 * Adds bronzeKey to the array keysObtained and changes the bronze key scene
 */
function pickedUpBronzeKey() {
    keysObtained.push("bronzeKey");
    actions[15].description = "I put the bronze key in my pocket.";
    actions[15].choices = [];
    actions[15].nextScene = [];
    changeDescription();
    changeButtons();
}

/**
 * Adds silverKey to the array keysObtained
 */
function pickedUpSilverKey() {
    keysObtained.push("silverKey");
}

/**
 * Changes the guestbook scene
 */
function changeGuestbook() {
    actions[16].nextScene = [18];
    changeDescription();
    changeButtons();
}

/**
 * Changes the fireplace and window scene
 */
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

/**
 * If the player still has matches, light the fire
 */
function checkMatches() {
    if (matchCounter > 0) {
        fireIsBurning = true;
    }
    else {
        fireIsBurning = false;
    }
}

/**
 * Changes the fireplace scene
 */
function changeFireplaceScene() {
    actions[8].description = "I have no matches to light the fireplace with.<br>The cabin is cold.";
    actions[8].choices = [];
    actions[8].nextScene = [];
    changeDescription();
    changeButtons();
}

/**
 * Checks which keys has been obtained and triggers seperate functions
 */
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

/**
 * Changes the door scene based on the bronze key being obtained
 */
function openingDoorBronzeKey() {
    actions[22].description = "The door is locked."
    actions[22].choices[0] = "Try the bronze key"
    actions[22].nextScene[0] = 13;
}

/**
 * Changes the door scene based on the silver key being obtained
 */
function openingDoorSilverKey() {
    actions[22].description = "The door is locked."
    actions[22].choices[0] = "Try the silver key"
    actions[22].nextScene[0] = 12;
}

/**
 * Changes the door scene based on both keys being obtained
 */
function openingDoorBothKeys() {
    actions[22].description = "The door is locked."
    actions[22].choices[0] = "Try the silver key"
    actions[22].nextScene[0] = 12;
    actions[22].choices[1] = "Try the bronze key"
    actions[22].nextScene[1] = 13;
} 

/**
 * Changes the door scene based on no keys being obtained
 */
function openingDoorNoKeys() {
    actions[22].description = "The door is locked.<br>Perhaps there's a key somewhere."
    actions[22].choices = [];
    actions[22].nextScene = [];
}