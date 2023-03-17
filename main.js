const result = document.querySelector("#result");
const copyPassword = document.querySelector("#copy");
const checkBox = document.querySelectorAll("input");
const showLenght = document.querySelector(".length-show");
const genrateBtn = document.querySelector(".gen-btn")
const err = document.querySelector(".error")

let passwordLength = 8;
const characters = { // object of letters, numbers & symbols
    numeric: "0123456789",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    symbol: "^!$%&|[](){}:;.,*+-#@<>~"
}

function updatePasswordLength() {
    passwordLength = checkBox[0].value;
    if (passwordLength < 10) {
        showLenght.innerText = `0${passwordLength}`;
    } else {
        showLenght.innerText = passwordLength;
    }
}
checkBox[0].onchange = updatePasswordLength;


function createPassword() {
    let finalPassword = '';
    let passwordCharacters = "";
    let repetition = false;
    err.style.display = "none";

    checkBox.forEach((value, key) => {
        if (key == 0) {
            return;
        }
        if (value.checked) {
            if (value.id == "space") {
                passwordCharacters += " ";
                return;
            }
            if (value.id == "repetition") {
                repetition = true;
                return;
            }
            passwordCharacters += characters[value.id];
        }

    });


    passwordCharacters = passwordCharacters.split("");
    let passwordCharactersLength =passwordCharacters.length;
    try {
        for (let i = 0; i < passwordLength; i++) {
            const rnd = Math.floor(Math.random() * passwordCharacters.length);

            if (passwordCharacters[rnd] === undefined && i == 0) {
                throw `Select one option to create your password.`;
            }
            
            if (repetition && passwordCharacters[rnd] === undefined){
                throw `There are more characters than the selected letters. You can create your password with ${passwordCharactersLength} characters`;
            }
            
            if (repetition) {
                finalPassword += passwordCharacters[rnd];
                passwordCharacters.splice(rnd,1);
            }else{
                finalPassword += passwordCharacters[rnd];
            } 

        }
        result.innerText = finalPassword;
    } catch (erro) {
        err.innerText = erro;
        err.style.display = "block";
    }

}
function copyPass() {
    if (result.innerText !== "Click To genrate for create your password") {
        copyPassword.innerText = "copied!";
        setTimeout(() => {
            copyPassword.innerText = "copy";
        }, 3000)
        navigator.clipboard.writeText(result.innerText)
    }
}
genrateBtn.addEventListener("click", createPassword);
copyPassword.addEventListener("click", copyPass)