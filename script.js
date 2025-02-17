const button = document.getElementById('convert-btn');
const input = document.getElementById('number');
const output = document.getElementById('output');

console.log('-- start --');

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        formValidation();
    }
});

button.addEventListener('click', (e) => {
    e.preventDefault();
    formValidation();
})

const formValidation = () => {
    const number = parseInt(input.value);
    if (input.value === '' || number < 1) {
        alert('Please enter a valid number');
        } else if (number > 3999) {
            alert('Please enter a number not more than 3999');
            //make this a modal
        } else {
            convertToRoman(number);
    }
}

const convertToRoman = (input) => {
    
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

        if (hits) {
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

    console.log('Output:', roman);
    output.innerText = roman;
}
