const button = document.getElementById('convert-btn');
const input = document.getElementById('number');
const container = document.querySelector('.output-container');
const reset = document.getElementById('reset-btn');
let outputDiv = null;
let tooltipDiv = null
let isAllowed = true;

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        formValidation(isAllowed);
    }
});

button.addEventListener('click', (e) => {
    e.preventDefault();
    formValidation(isAllowed);
})

const formValidation = (allowed) => { //fires when the button is clicked or the enter key is pressed
    console.log('is allowed?', allowed);
    const number = parseInt(input.value);
    if (input.value === '' || number < 1) {
        alert('Please enter a valid number');
    } else if (number > 3999 || number.length < 5) {
        alert('Please enter a number not more than 3999');
        resetButton();
    } else if (allowed) {
        convertToRoman(number);
    } else if (!allowed)
        alertUser();
}

const scrollToBottom = () => {
    container.scrollTop = container.scrollHeight;
}

input.addEventListener('input', (e) => { //fires when the input field is being typed in
    let bubbleCount = container.childElementCount;
    container.classList.remove('collapse')
    container.classList.remove('hidden');

    if (bubbleCount % 2 === 0) {
        console.log('Creating TOOLTIP div');
        tooltipDiv = document.createElement("div");
        tooltipDiv.id = `tooltip-${bubbleCount}`;
        container.appendChild(tooltipDiv);
    }

    if (input.value.length < 5) {
        tooltipDiv.innerText = `${e.target.value} is equivalent to: `;
    } else {
        alert('Please enter a number not more than 3999');
        resetButton();
    }
    scrollToBottom();
    return isAllowed = true;
})

const alertUser = () => {
    let bubbleCount = container.childElementCount;
    const output = document.getElementById(`output-${bubbleCount-1}`);
    output.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.02)" }, { transform: "scale(1)" }],
        { duration: 200, easing: "ease-out" }
      );      
}

const resetButton = () => {
        reset.classList.remove('collapse');
        reset.classList.remove('hidden');
}

const convertToRoman = (input) => {
    let bubbleCount = container.childElementCount;
    let roman = '';
    const romanNum = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    }

    for (const [key, value] of Object.entries(romanNum)) {
        let hits = Math.floor(input / value);

        if (false) {
            console.log(`Roman: ${key}, ${value}`);
            console.log('Hits:', hits);
            console.log('Value:', input);
        }

        if (hits === 1) {
            roman += key;
            input -= value;
        } 

        else if (hits > 1 && hits < 4) {
            roman += key.repeat(hits);
            input -= value * hits;
        }
    }

    outputDiv = document.createElement("div");
    outputDiv.classList.add('output'); //class that displays the output of the conversion
    outputDiv.classList.add('hidden'); //class that hides the output of the conversion
    outputDiv.id = `output-${bubbleCount}`;
    container.insertAdjacentElement('beforeend',outputDiv);

    const output = document.getElementById(`output-${bubbleCount}`);

    output.innerText = roman;
    output.classList.remove('hidden');
    resetButton();
    scrollToBottom();
    return isAllowed = false;
}

    reset.addEventListener('click',() => {

        container.classList.add('collapse')
        reset.classList.add('collapse')
        input.value = '';
        setTimeout(() => {
            while (container.firstChild) {
                console.log('Removed: ', container.removeChild(container.firstChild));;
            }
        }, 1000);
    })

// console.log('is output?', new Boolean(isOutput));

