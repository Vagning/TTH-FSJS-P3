//Check if document is loaded before running any javscript
//$( document ).ready(function() {

	//Array containing the elements with errors
	var errorArray = [];

	//Object for storing all input fields which should be validated.
	const inputFields = {
		"name" : document.getElementById('name'),
		"email" : document.getElementById('mail'),
		"activities" : document.querySelectorAll('.activities input'),
		"lastActivity" : document.querySelector('.activities').lastChild,
		"payment" : document.getElementById('payment'),
		"creditCard" : document.getElementById('cc-num'),
		"zip" : document.getElementById('zip'),
		"cvv" : document.getElementById('cvv')

	}

	//Setting up variables and elements for the real time email validation
	const emailError = document.createElement('P');
	$(emailError).addClass("error");
	$(emailError).css("marginBottom", "10px");
	//Append it the DOM and hide it as default.
	$(emailError).insertBefore(inputFields['email']);
	$(emailError).hide();

	//Fucntion for removing value from array
	function removeElement(element, array) {
		const index = array.indexOf(element);
		array.splice(index, 1);

	}

	//Function used for checking if an error is shown on the object already or not. If it is delete it, if not show it.
	function toggleErrorOnElement(element, toggle, error = ""){
		if (toggle === "show") {
			$(element).addClass("error");
			$("<p class='error' style='margin-bottom: 20px'> "+ error +" <p>").insertAfter(element);
			errorArray.push(element);
			console.log(errorArray);

		} else {
			//Check if next element has class Error, if it does, remove it.
			if ($(element).next().hasClass("error")){
				$(element).next().remove();
			}
			$(element).removeClass("error");
			removeElement(element, errorArray);
			console.log(errorArray);

		}

	}

	//function for checking if name input is blank. If it is add error to error Arrays
	function validateName() {
		//Make sure that there is no error show on the name element, before showing a new one
		toggleErrorOnElement(inputFields["name"], "hide");

		if (inputFields['name'].value == "") {
			toggleErrorOnElement(inputFields["name"], "show", "The name field must be filled out.");
		} else {
			toggleErrorOnElement(inputFields["name"], "hide")

		}
	}

	//function for checking if email input is blank. If it is add error to error Arrays
	function validateEmail() {
		//Make sure that there is no error show on the email element, before showing a new one
		toggleErrorOnElement(inputFields["email"], "hide");

		if (inputFields['email'].value == "") {
			toggleErrorOnElement(inputFields["email"], "show", "The email field must be filled out.");
		} else {
			toggleErrorOnElement(inputFields["email"], "hide");

		}
	}

	//Real-time checking that the email adress is formatted like a real email adress.
	$(inputFields['email']).on('input propertychange paste', (event) => {
		//create a variable for the current value
		const value = event.target.value;

		//Check if the value contains a @
		if (value.indexOf('@') == -1) {
			//If the value doesn't contain a @ show email error message 
			$(emailError).show();
			$(emailError).html("Your email adress doesn't seem to be a real email adrees. Did you rember the &quot;@&quot;?");
			errorArray.push(inputFields['email']);

		} else if (value.split('@')[1].indexOf('.') == -1) {
			//If the value does contain a @ check if the string after the @ contains a dot. If not this block will be executed
			$(emailError).show();
			$(emailError).html("You have entered an invalid email address!");
			errorArray.push(inputFields['email']);

		} else {
			//Nothing is wrong hide the error message
			$(emailError).hide();
			removeElement(inputFields['email'], errorArray);

		}

	});

	//Function for validating that at least one of the activities has been checked off, by looping through all of them.
	function validateActivities() {

		//Make sure that there is no error show on the activities element, before showing a new one
		toggleErrorOnElement(inputFields["lastActivity"], "hide");

		//Count for check amout for checked input fields
		let checkedCounter = 0;

		for (var i = 0; i < inputFields['activities'].length; i++) {
			//If the current input field is check. If it is add one to the counter
			if ($(inputFields['activities'][i]).is(':checked')) {
				checkedCounter++;

			}
		
		}

		//If the checkedCounter is greater than zero add erorr message to the errorsArray
		if (checkedCounter === 0) {
			toggleErrorOnElement(inputFields["lastActivity"], "show", "At least one activity must be selected.");
		} else {
			toggleErrorOnElement(inputFields["lastActivity"], "hide");

		}

	}

	//Function for check if credit card is selected as payment method, if it is validate the input fields.
	function validateCreditCard() {
		//Setting varibles for the values for Credit Card number, Zip code & cvv
		const ccNum = inputFields['creditCard'].value;
		const zip = inputFields['zip'].value;
		const cvv = inputFields['cvv'].value;

		//Make sure that there is no error show on the credit card, zip and cvv element, before showing a new one
		toggleErrorOnElement(inputFields["creditCard"], "hide");
		toggleErrorOnElement(inputFields["zip"], "hide");
		toggleErrorOnElement(inputFields["cvv"], "hide");

		if (isNaN(ccNum) || ccNum == "") {

			//If the credit card field is empty add error messages.
			toggleErrorOnElement(inputFields["creditCard"], "show", "Please enter a credit card number.");

		} else if (ccNum.length >= 13 && ccNum.length <= 16) {
			toggleErrorOnElement(inputFields["creditCard"], "hide");
		} else {
			//If the credit card number isn't empty check if the number is short than 13 or longer than 16 digits
			toggleErrorOnElement(inputFields["creditCard"], "show", "Please enter a credit card number between 13 and 16 digitis long.");

		}

		//Check if zip code is 5 not five digits or if it's not a number. If not show error.
		if (zip.length != 5 || isNaN(zip)) {
			toggleErrorOnElement(inputFields["zip"], "show", "Please enter a valid Zip code.");

		} 

		//Check if cvv is 3 not five digits or if it's not a number. If not show error else clear error.
		if (cvv.length != 3 || isNaN(cvv)) {
			toggleErrorOnElement(inputFields["cvv"], "show", "Please enter a valid CVV.");

		} 

	}

	//Check for when the submit button is pressed.
	$('button[type=submit]').click((event) => {
		//Prevent reload of page in order to do validation.
		event.preventDefault();

		//Run the function for validating the name field.
		validateName();

		//Run the function for validating the email field.
		validateEmail();

		//Run the function for validating the activities 
		validateActivities();

		//Check if payment type is credit card. If it is validate that input.
		if (inputFields["payment"].value === "credit card") {
			//Run the function for validating the credit card fields.
			validateCreditCard()
		}

		if (errorArray.length === 0) {
			//If no errors was found trigger submit event.
			$('form').submit();

		}


	});



//});