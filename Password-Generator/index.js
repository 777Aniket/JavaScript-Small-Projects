const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upparcaseCheck = document.querySelector("#upparcase");
const lowercaseCheck = document.querySelector("#lowercase");
const symbolCheck = document.querySelector("#symbol");
const numberCheck = document.querySelector("#number");
const indicatorCheck = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '`~!@#$%^&*()*+,-./;:"= ';

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set Password length

function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

// setIndicator

function setIndicator(color) {
  indicatorCheck.style.backgroundColor = color;
}

function getRandIntiger() {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRandIntiger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRandIntiger(97, 122));
}

function generateUpperCase() {
  return String.fromCharCode(getRandIntiger(65, 90));
}

function generateSymbol() {
  const ranNum = getRandIntiger(0, symbols.length);
  //return symbols[getRandIntiger(0,symbols.length)]
  return symbols.charAt(ranNum);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasSym = false;
  let hasNum = false;
  if (upparcaseCheck.checked) hasUpper = true;
  if (lowercaseCheck.checked) hasLower = true;
  if (symbolCheck.checked) hasSym = true;
  if (numberCheck.checked) hasNum = true;

  if (hasUpper && hasLower && (hasSym || hasNum) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasUpper || hasLower) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#f00");
  } else {
    setIndicator("#00f");
  }
}

function shufflePassword(shufflePassword){
  //fisher yeetes method 
   for(let i=array.length-1; i>0;i--){
    const j=  Math.floor(Math.random()*(i+1));
    const temp=array[i];
    array[i]=array[j];
    array[j]=temp;
   }
   let str="";
   array.forEach((el)=>(str+=el));
   return str;
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "Copied";
  } catch (e) {
    copyMsg.innerText = "Failed to copy";
  }
  copyMsg.classList.add("active");
  setTimeout(() => {
    //  copyMsg.innerText="Copy";
    copyMsg.classList.remove("active");
  }, 2000);
}

inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });

  // special Condition
  if (passwordLength < checkCount) {   
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckBoxChange);
});

copyBtn.addEventListener("click", (e) => {
  if (passwordDisplay.value) copyContent();
});

generateBtn.addEventListener('click', () => {
  // none of the check box hass been clicked
  if (checkCount == 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  //lets start jurney to find the password
console.log("Chaliye Shru kete hai")
  // remove old password
  password = "";

  //let put the new stuff mentio in checkbox
   
  // if(upparcaseCheck.checked){
  //   password +=generateUpperCase()
  // }

  // if(lowercaseCheck.checked){
  //   password +=generateLowerCase()
  // }

  // if(symbolCheck.checked){
  //   password +=generateSymbol()
  // }

  // if(numberCheck.checked){
  //   password += generateRandomNumber()
  // }

 let funArr=[];

 if(upparcaseCheck.checked){
  funArr.push(generateUpperCase);
 }

 if(lowercaseCheck.checked){
  funArr.push(generateLowerCase)
 }

 if(numberCheck.checked){
  funArr.push(generateRandomNumber)
 }
 if(symbolCheck.checked){
  funArr.push(generateSymbol)
 }

 //Compulsary Addition

 for( let i=0;i < funArr.length; i++){
  password += funArr[i]()
 }
 console.log("Chaliye Shru kete hai Addition krna  ")


 //remaining addition

 for (let i=0; i<passwordLength-funArr.length;i++){
   let randIndex=getRandIntiger(0,funArr.length)
   password +=funArr[randIndex]()
 }
console.log("Chaliye Shru kete hai baki ki addditon don e  ")


 //Shuffel the password

 password=shufflePassword(Array.from(password));
console.log("Chaliye  shuflng done hogyee")


 //show 
 passwordDisplay.value=password
console.log(" ui additon done  ")

 //calculate function strenght
 calcStrength()
});
