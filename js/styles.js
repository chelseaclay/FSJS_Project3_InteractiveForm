const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const jobRoleSelect = document.getElementById("title");
const shirtDesignSelect = document.getElementById("design");
const shirtColorSelect = document.getElementById("color");
const $activitiesFieldset = $(".activities input[type='checkbox']");
const mainConference = document.querySelector("input[name='all']");
const jsFrameworks = document.querySelector("input[name='js-frameworks']");
const jslibrary = document.querySelector("input[name='js-libs']");
const expressWorkshop = document.querySelector("input[name='express']");
const nodeWorkshop = document.querySelector("input[name='node']");
const buildToolsWorkshop = document.querySelector("input[name='build-tools']");
const npmWorkshop = document.querySelector("input[name='npm']");
const displayTotal = document.createElement("p");
  displayTotal.setAttribute("class", "displayTotal");
  $(".activities").append(displayTotal);
const paymentSelect = document.getElementById("payment");
const creditCardInput = document.getElementById('cc-num');
const zipCodeInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');
const errorDiv = "<div class='errorDiv'></div>";
  //append errorDiv to all elements an error can appear
  $("#name").prev().append(errorDiv);
  $("#mail").prev().append(errorDiv);
  $(".activities legend").append(errorDiv);
  $(".activities").next().find("legend").append(errorDiv);
  $("#cc-num").prev().append(errorDiv);
  $("#zip").prev().append(errorDiv);
  $("#cvv").prev().append(errorDiv);

var activitiesTotal = 0;
var nameValid = false;
var emailValid = false;
var activitiesValid = false;
var creditValid = false;
var zipValid = false;
var cvvValid = false;

//from the "Job Role" drop down menu
jobRoleSelect.addEventListener("change", function () {
  //when the "Other" option is selected
  if(jobRoleSelect.options.selectedIndex == 5) {
    //A text field that will be revealed
    $("#other-title").show();
  } else {
    //Remove other-title text field when not needed
    $("#other-title").hide();
  }
});

function removeColorOptions (start, stop) {
  //Cycle through the shirt color options
  for (var i = 0; i < shirtColorSelect.length; i++) {
    //if this color should be on the list, show it
    if (start <= i && i <= stop) {
      shirtColorSelect.options.item(i).style.display = "initial";
      shirtColorSelect.options.item(i).removeAttribute("disabled");
    //if not, hide it
    } else {
      shirtColorSelect.options.item(i).style.display = "none";
      shirtColorSelect.options.item(i).setAttribute("disabled", "true");
    }
  }
}

shirtDesignSelect.addEventListener("change", function () {
  //If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
  if(shirtDesignSelect.options.selectedIndex == 1) {
    shirtColorSelect.removeAttribute("disabled");
    removeColorOptions(0,2);
    $("#colors-js-puns").show();
  //If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
  } else if(shirtDesignSelect.options.selectedIndex == 2) {
    shirtColorSelect.removeAttribute("disabled");
    shirtColorSelect.options.selectedIndex = 3;
    removeColorOptions(3,5);
    $("#colors-js-puns").show();
  // when no option is selected, disable the color select menu
  } else {
    shirtColorSelect.setAttribute("disabled", "true");
    $("#colors-js-puns").hide();
  }
});

//calculator to keep up with selected and unselected activities
function activitiesCal (operator, value) {
  if (operator === "add") {
    activitiesTotal += value;
  } else if (operator === "sub") {
    activitiesTotal -= value;
  }
}

mainConference.addEventListener("change", function () {
  if (mainConference.checked) {
    //add to total when clicked
    activitiesCal("add", 200);
  } else {
    //subtract to total when clicked
    activitiesCal("sub", 200);
  }
});

jsFrameworks.addEventListener("change", function () {
  if (jsFrameworks.checked) {
    //add to total when clicked
    activitiesCal("add", 100);
    //disable activites that run at the same time
    expressWorkshop.disabled = true;
    expressWorkshop.parentNode.style.color = "gray";
  } else {
    //subtract to total when clicked
    activitiesCal("sub", 100);
    //make sure activites is enabled if conflicting activity is unchecked
    expressWorkshop.disabled = false;
    expressWorkshop.parentNode.style.color = "initial";
  }
});

jslibrary.addEventListener("change", function () {
  if (jslibrary.checked) {
    //add to total when clicked
    activitiesCal("add", 100);
    //disable activites that run at the same time
    nodeWorkshop.disabled = true;
    nodeWorkshop.parentNode.style.color = "gray";
  } else {
    //subtract to total when clicked
    activitiesCal("sub", 100);
    //make sure activites is enabled if conflicting activity is unchecked
    nodeWorkshop.disabled = false;
    nodeWorkshop.parentNode.style.color = "initial";
  }
});

expressWorkshop.addEventListener("change", function () {
  if (expressWorkshop.checked) {
    //add to total when clicked
    activitiesCal("add", 100);
    //disable activites that run at the same time
    jsFrameworks.disabled = true;
    jsFrameworks.parentNode.style.color = "gray";
  } else {
    //subtract to total when clicked
    activitiesCal("sub", 100);
    jsFrameworks.disabled = false;
    //make sure activites is enabled if conflicting activity is unchecked
    jsFrameworks.parentNode.style.color = "initial";
  }
});

nodeWorkshop.addEventListener("change", function () {
  if (nodeWorkshop.checked) {
    //add to total when clicked
    activitiesCal("add", 100);
    //disable activites that run at the same time
    jslibrary.disabled = true;
    jslibrary.parentNode.style.color = "gray";
  } else {
    //subtract to total when clicked
    activitiesCal("sub", 100);
    //make sure activites is enabled if conflicting activity is unchecked
    jslibrary.disabled = false;
    jslibrary.parentNode.style.color = "initial";
  }
});

buildToolsWorkshop.addEventListener("change", function () {
  if (buildToolsWorkshop.checked) {
    //add to total when clicked
    activitiesCal("add", 100);
  } else {
    //subtract to total when clicked
    activitiesCal("sub", 100);
  }
});

npmWorkshop.addEventListener("change", function () {
  if (npmWorkshop.checked) {
    //add to total when clicked
    activitiesCal("add", 100);
  } else {
    //subtract to total when clicked
    activitiesCal("sub", 100);
  }
});

$activitiesFieldset.on("change", function () {
  if (activitiesTotal > 0) {
    //display the total of the activites selected
    displayTotal.textContent = "Total: $" + activitiesTotal;
    $(".displayTotal").show();
  } else {
    //hide the total if no activity is selected
    $(".displayTotal").hide();
  }
});

paymentSelect.addEventListener("change", function () {
  //If credit card is selected
  if (paymentSelect.options.selectedIndex == 1) {
    //show credit card options
  $("#credit-card").show();
    //hide other options
    $("#credit-card").next().hide();
    $("#credit-card").next().next().hide();
  //If paypal is selected
  } else if (paymentSelect.options.selectedIndex == 2) {
    //show credit card options
  $("#credit-card").next().show();
    //hide other options
    $("#credit-card").hide();
    $("#credit-card").next().next().hide();
  //If bitcoin is selected
  } else if (paymentSelect.options.selectedIndex == 3) {
    //show credit card options
  $("#credit-card").next().next().show();
    //hide other options
    $("#credit-card").hide();
    $("#credit-card").next().hide();
  }
});

function formError (errorMessage, errorLocation, isValid) {
  //create a new element for the error message to live in
  var errorItem = '<p class="error">' + errorMessage + '</p>'
  //replace the content
  errorLocation.innerHTML = errorItem;
  //style the error to stand out
  $(".error").css("color", "#f44242");
  $(".error").css("fontSize", "10pt");
  //change the valid variable variable so the user can fix the errored fields
  isValid = false;
}

function nameError () {
  //Name field can't be blank
  if (nameInput.value === "") {
    const errorMessage = "Please enter your name.";
    formError(errorMessage, nameInput.previousElementSibling.querySelector(".errorDiv"), nameValid);
    $("#name").prev().find(".errorDiv").show();
  //hide the error message when name is given
  } else {
    $("#name").prev().find(".errorDiv").hide();
    nameValid = true;
  }
}

function emailError () {
  function ValidateEmail(mail) {
    //test to see if vaild characters are being used
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    } else {
      return (false)
    }
  }

  //Email field must be a validly formatted e-mail address
  if (ValidateEmail(emailInput.value) === false) {
    const errorMessage = "Please enter a vaild email address.";
    formError(errorMessage, emailInput.previousElementSibling.querySelector(".errorDiv"), emailValid);
    $("#mail").prev().find('.errorDiv').show();
  //hide the error message when email is valid
  } else {
    $("#mail").prev().find('.errorDiv').hide();
    emailValid = true;
  }
}

function creditError () {
  //If the selected payment option is "Credit Card,"
  if (paymentSelect.options[paymentSelect.selectedIndex].value === "credit card") {
    //make sure credit card number field is not blank
    if (creditCardInput.value === "") {
      const errorMessage = "Please enter a credit card number.";
      formError(errorMessage, creditCardInput.previousElementSibling.querySelector(".errorDiv"), creditValid);
      $('#cc-num').prev().find(".errorDiv").show();
    //make sure a number is given for credit card number field
    } else if (isNaN(creditCardInput.value)) {
      const errorMessage = "Credit cards should only contain numbers";
      formError(errorMessage, creditCardInput.previousElementSibling.querySelector(".errorDiv"), creditValid);
      $('#cc-num').prev().find(".errorDiv").show();
    //make sure credit card number is a vaild length
    } else if (creditCardInput.value.length < 13 || creditCardInput.value.length > 16) {
      const errorMessage = "Credit card number length invalid.";
      formError(errorMessage, creditCardInput.previousElementSibling.querySelector(".errorDiv"), creditValid);
      $('#cc-num').prev().find(".errorDiv").show();
    } else {
      $('#cc-num').prev().find(".errorDiv").hide();
      creditValid = true;
    }
  } else {
    $('#cc-num').prev().find(".errorDiv").hide();
    creditValid = true;
  }
}

function zipError () {
  //If the selected payment option is "Credit Card,"
  if (paymentSelect.options[paymentSelect.selectedIndex].value === "credit card") {
    //make sure a zip code is given
    if (zipCodeInput.value === "") {
      const errorMessage = "Please enter a zip code.";
      formError(errorMessage, zipCodeInput.previousElementSibling.querySelector(".errorDiv"), zipValid);
      $('#zip').prev().find(".errorDiv").show();
    //make sure zip code is 5 digits long
    } else if (zipCodeInput.value.length != 5) {
      const errorMessage = "Zip code length invalid.";
      formError(errorMessage, zipCodeInput.previousElementSibling.querySelector(".errorDiv"), zipValid);
      $('#zip').prev().find(".errorDiv").show();
    } else {
      $('#zip').prev().find(".errorDiv").hide();
      zipValid = true;
    }
  } else {
    $('#zip').prev().find(".errorDiv").hide();
    zipValid = true;
  }
}

function cvvError () {
  //If the selected payment option is "Credit Card,"
  if (paymentSelect.options[paymentSelect.selectedIndex].value === "credit card") {
    //make sure a CVV value is given
    if (cvvInput.value === "") {
      const errorMessage = "Please enter a CVV.";
      formError(errorMessage, cvvInput.previousElementSibling.querySelector(".errorDiv"), cvvValid);
      $('#cvv').prev().find(".errorDiv").show();
    //make sure cvv is 3 digits long
    } else if (cvvInput.value.length != 3) {
      const errorMessage = "CVV length invalid.";
      formError(errorMessage, cvvInput.previousElementSibling.querySelector(".errorDiv"), cvvValid);
      $('#cvv').prev().find(".errorDiv").show();
    } else {
      $('#cvv').prev().find(".errorDiv").hide();
      cvvValid = true;
    }
  } else {
    $('#cvv').prev().find(".errorDiv").hide();
    cvvValid = true;
  }
}

//Validate name as user types
nameInput.addEventListener("keyup", function () {
    nameError();
});

//Validate email as user types
emailInput.addEventListener("keyup", function () {
    emailError();
});

//Validate credit card number as user types
creditCardInput.addEventListener("keyup", function () {
  creditError();
});


//Validate credit card zip code as user types
zipCodeInput.addEventListener("keyup", function () {
  zipError();
});


//Validate credit card cvv as user types
cvvInput.addEventListener("keyup", function () {
  cvvError();
});


$("form button[type='submit']").on("click", function (e) {
  e.preventDefault();

  //Must select at least one checkbox under the "Register for Activities" section
  if (activitiesTotal === 0) {
    const errorMessage = "Please select at least one activity.";
    formError(errorMessage, document.querySelector('.activities .errorDiv',activitiesValid));
    $('.activities .errorDiv').show();
  } else {
    $('.activities .errorDiv').hide();
    activitiesValid = true;
  }

  //validate other fields
  nameError();
  emailError();
  creditError();
  zipError();
  cvvError();

  // if form is valid, alert user and refresh page
  if (nameValid && emailValid && activitiesValid && creditValid && zipValid && cvvValid) {
    alert("Form has been submited. Thank you!");
    location.reload();
  }
});

//When the page loads
$(document).ready(function () {
  //give focus to the first text field
  nameInput.focus();
  // nameInput.select();
  //hide other job role input
  $("#other-title").hide();
  //hide color options
  $("#colors-js-puns").hide();
  //Credit card payment option should be seleceted by default
  paymentSelect.options.selectedIndex = 1;
  //hide other payment options
  $("#credit-card").next().hide();
  $("#credit-card").next().next().hide();
});
