//Check if document is loaded before running any javscript
//$( document ).ready(function() {
	
	//Array for containg all errors string
	let errorsArray = [];

	//Object for storing all input fields which should be validated.
	const inputFields = {
		"name" : document.getElementById('name'),
		"email" : document.getElementById('mail'),
		"activities" : document.querySelectorAll('.activities input'),
		"creditCard" : document.getElementById('cc-num'),
		"zip" : document.getElementById('zip'),
		"cvv" : document.getElementById('cvv')

	}

	//Setting up variables and elements for the real time email validation
	const emailError = document.createElement('P');
	$(emailError).css('color', 'red');
	$(emailError).css('fontWeight', 'Bold');
	$(emailError).css('marginBottom', '20px');
	//Append it the DOM and hide it as default.
	$(emailError).insertAfter(inputFields['email']);
	$(emailError).hide();


	//function for checking if name input is blank. If it is add error to error Arrays
	function validateName () {
		if (inputFields['name'] === "") {
			errorsArray.push("The name field must be filled out.");
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

		} else if (value.split('@')[1].indexOf('.') == -1) {
			//If the value does contain a @ check if the string after the @ contains a dot. If not this block will be executed
			$(emailError).show();
			$(emailError).html("You have entered an invalid email address!");

		} else {
			//Nothing is wrong hide the error message
			$(emailError).hide();

		}

	});

	//Function for validating that at least one of the activities has been checked off, by looping through all of them.
	function validateActivities() {

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
			errorsArray.push("At least one activity must be selected.")
		}

	}

	//Function for check if credit card is selected as payment method, if it is validate the input fields.
	function validateCreditCard() {
		//Setting varibles for the values for Credit Card number, Zip code & cvv
		const ccNum = inputFields['creditCard'].value;
		const zip = inputFields['zip'].value;
		const cvv = inputFields['cvv'].value;

		if (ccNum != "") {
			//If the credit card number isn't empty check if the number is short than 13 or longer than 16 digits
			if (ccNum <= 13 && ccNum >= 16) {
				errorsArray.push("Please Enter a credit card number between 13 and 16 digitis long.")

			}

		}


	}





//});