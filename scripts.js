const userChoiceBtn = document.querySelector('.user-input-btn');
const userChoice = document.querySelector('.user-input');
const sketchContainer = document.querySelector('.sketch-container');
const clearBoardBtn = document.querySelector('.clear')

let mouseState = 'up';

document.body.onmousedown = function(e) {
    if (sketchContainer.contains(e.target)) {
        e.preventDefault()
        mouseState = 'down';
    }
}

document.body.onmouseup = function() {
    mouseState = 'up';
}

userChoiceBtn.addEventListener('click', () => checkUserInput(userChoice.value))

userChoice.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') checkUserInput(userChoice.value)
})

clearBoardBtn.addEventListener('click', () => clearColor(sketchContainer))

function checkUserInput(input) {
    const errorMessage = document.querySelector('.error-message');
    if (isNaN(Number(input))) {
        errorMessage.innerText = "Please enter a number";
    } else if (Number(input) < 1 || Number(input) > 64) {
        errorMessage.innerText = "Input must be between 1 and 64";
    } else {
        errorMessage.innerText = ""
        userChoice.value = ""
        createDivs(Number(input))
    }
}

function createDivs(numDivs) {
    clearDivs(sketchContainer) // removes existing divs
    sketchContainer.style.setProperty('grid-template-columns', `repeat(${numDivs}, auto)`)
    sketchContainer.style.setProperty('grid-template-rows', `repeat(${numDivs}, auto)`)
    
    
    for (let i = 0; i < numDivs * numDivs; i++) {
        const div = document.createElement('div');
        sketchContainer.appendChild(div);
    }
    
    sketchContainer.querySelectorAll('div').forEach(element => {
        element.addEventListener('mouseover', function(e) {
            if (mouseState == 'down') this.style.backgroundColor = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`;
        })
    })
}

function clearDivs(parent) {
    // removes all child elements in container
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function clearColor(parent) {
    const sketchDivs = parent.querySelectorAll('div');
    sketchDivs.forEach(element => {
        element.style.backgroundColor = "white";
    });
}

createDivs(16) // initializes with 64 divs
