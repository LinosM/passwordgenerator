// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Picks a random character from an array
function arrayRandomizer(x) {
  return x[Math.floor(Math.random() * x.length)];
}

// Random number generator from 0 to x - 1
function randomNum(x) {
  return Math.floor(Math.random() * x);
}

// Shuffles the password via array sort
function shuffle(pass) {
  var tempArray = pass.split('');
  
  tempArray.sort(function() {
    return 0.5 - Math.random();
  });
  pass = tempArray.join('');                
  return pass;                              
}

function generatePassword() {
  // The characters from each character type
  var lowerSet = "abcdefghijklmnopqrstuvwxyz";
  var upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numSet = "1234567890";
  var specSet = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  var allowedSet = []; // An array for each character type the user allows
  var password = "";

  // Initializing each password criteria
  var passLength = 0;
  var isLower = false;
  var isUpper = false;
  var isNum = false;
  var isSpec = false;

  while (passLength < 8 || passLength > 128) {
    passLength = prompt("Choose length of password between 8-128 characters");
    if (passLength < 8 || passLength > 128) {
      alert("Error, password needs to be between 8-128 characters");
    }
  }

  while (!isLower && !isUpper && !isNum && !isSpec) {
    isLower = confirm("Do you want lowercase in your password?");
    isUpper = confirm("Do you want uppercase in your password?");
    isNum = confirm("Do you want numbers in your password?");
    isSpec = confirm("Do you want special characters in your password?");

    if (!isLower && !isUpper && !isNum && !isSpec) {
      alert("Error, choose at least one character type");
    }

    // Adds the character types the user chooses to the allowSet array

    // Also adds in 1 random character from each set to the password to guarantee the password has at least 1 character type from each specified criteria
    if (isLower) {
      allowedSet.push(lowerSet);
      password += arrayRandomizer(lowerSet);
    }
    if (isUpper) {
      allowedSet.push(upperSet);
      password += arrayRandomizer(upperSet);
    }
    if (isNum) {
      allowedSet.push(numSet);
      password += arrayRandomizer(numSet);
    }
    if (isSpec) {
      allowedSet.push(specSet);
      password += arrayRandomizer(specSet);
    }
  }

  for (i = 0; i < passLength - allowedSet.length; i++) {
    // x = picks random number to use for the allowedSet array
    var x = randomNum(allowedSet.length);
    
    // y = picks a random character from the previously selected array (x)
    var y = randomNum(allowedSet[x].length);

    // Random characters are added to the password from x array and y subarray
    password += allowedSet[x][y];

  }

  // Password is shuffled one last time so the first 1-4 characters arent always in a set order created from the arrayRadomizer() earlier
  password = shuffle(password);
  return password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);