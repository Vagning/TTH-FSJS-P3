//Check if document is loaded before running any javscript
//$( document ).ready(function() {

	//Adding the title select and other title field as const for later usages
  const titleSelect = document.getElementById('title');
  const otherTitle = document.getElementById('other-title');
  const tshirtDesign = document.getElementById('design');
  const tshirtColor = document.getElementById('color');
  const tshirtColorDiv = document.getElementById('colors-js-puns');
  const tshirtColorOptions = tshirtColor.children;
  const activityInputs = document.querySelectorAll('.activities input');


  //Createing the Total cost text, setting text
  const totalCostText = document.createElement('P');
  $(totalCostText).text("Total cost: $");
  
  //Creating the total cost span as a container for the cost number.
  const totalCostSpan = document.createElement('SPAN');
  $(totalCostSpan).attr('id', 'totalCost');
  
  //Appends the totalCostSpan to the TotalCostText
  $(totalCostText).append(totalCostSpan);
  let totalCost = 0;
  //Object containing the workshop elements
  const workshops = {
    "jsFrameworks" : document.querySelector('.activities input[name=js-frameworks]'),
    "jsLibs" : document.querySelector('.activities input[name=js-libs]'),
    "express" : document.querySelector('.activities input[name=express]'),
    "nodejs" : document.querySelector('.activities input[name=node]')
  }
  //Object contain the payment method elements.
  const paymentInfo = {
    "select" : document.querySelector('#payment option[value=select_method]'),
    "credit" : document.querySelector('#payment option[value^=credit]'),
    "paypal" : document.querySelector('#payment option[value=paypal]'),
    "bitcoin" : document.querySelector('#payment option[value=bitcoin]'),
    "creditDiv" : document.querySelector('#credit-card'),
    "paypalDiv" : document.querySelectorAll('div')[8],
    "bitcoinDiv" : document.querySelectorAll('div')[9]
  }

	//Set the name text field to be active when the page loads.
  $('#name').focus();

  //Hiding the other title field when the page loads
  $(otherTitle).hide();

    //Hide color div from beginging
  $(tshirtColorDiv).hide();

  //appending the text field after the job role selected if the "other" option is selected
  $(titleSelect).change(() => {
  	//Check if the value of the current selected option is "other", if true show the text field if not don't
  	if ($(titleSelect).val() === 'other') {
  		$(otherTitle).show();
  	} else {
  		$(otherTitle).hide();
  	}

  });

  //When the user chosses design the script will change the color select so only the colors for the choosen design is shown.
  $(tshirtDesign).change((event) => {
  	const tagetValue = event.target.value;
  	let designType

  	//Sets the designType depending on which design is choosen by the user.
  	switch (tagetValue) {
  		case 'js puns':
  			designType = 'JS Puns';
        //Show color chooser
        $(tshirtColorDiv).show();
  			break;
  		case 'heart js':
  			designType = 'I ♥ JS';
        //Show color chooser
        $(tshirtColorDiv).show();
  			break;
  		default:
  			designType = '';
  			break;
  	}

  	//For debuging
 	 	//console.log(designType);

 	 	let isFirst = true;
  	//Loops through all color options an check if the option contains the design type string, in order to hide or show the options
  	$(tshirtColorOptions).each((index) => {
			const currentOption = tshirtColorOptions[index];

  		if (currentOption.text.indexOf(designType) != -1) {
  			//Checks if the current option is the first of this design type and changes it to be the selected one.
 				if(isFirst === true){
 					$(currentOption).prop('selected', true);
 				}
  			isFirst = false;

 				$(currentOption).show();
  		} else {
  			$(currentOption).hide();
  		}

  	});

  });

  //Function for checking if the total cost text already is appened to the DOM. If not append it.
  function appendTotalCost() {
    if (!$(".activities").find('#totalCost').length) {
        $('.activities').append(totalCostText);
    }
  }

  //Calculating the new total cost and setting the total cost span to contain the new total cost.
  function updateTotalCost(newCost, operator){
    switch (operator){
      case '+':
        totalCost += newCost;
        break;
      case '-':
        totalCost -= newCost;
        break;
      default:
        break;
    }

    $(totalCostSpan).text(totalCost);
  }

  //Function for toggle if a checkbox is disabled or not
  function toggleDisabled(checkbox){
    if ($(checkbox).attr('disabled') === 'disabled') {
      $(checkbox).attr('disabled', false);
      $(checkbox).parent().css('color', '#000');
    } else {
      $(checkbox).attr('disabled', true);
      $(checkbox).parent().css('color', '#848484')
    }

  }

  //checking all the activity checkboxes for change
  $(activityInputs).change((event) => {
    const target = event.target;
    const parent = target.parentElement;

    //Taking the string with the price and splitting it up in order return only the cost as a number
    let cost = parent.textContent.split("— ")[1];
    cost = Number(cost.split('$')[1]);

    //Executing the appendTotalCost function.
    appendTotalCost();

    //checking the if the targeted check box is being checked or uncheck in order to determin whether the cost should be added or subtracted from the total cost.
    if ( $(target).is(':checked') ){
      updateTotalCost(cost, '+');

    } else {
      updateTotalCost(cost, '-');

    }

    //Check which workshops is check and disables the corresponding one which is in the same timeframe.
    if ($(target).attr('name') === 'js-frameworks') {
      toggleDisabled(workshops.express);

    } else if ($(target).attr('name') === 'js-libs') {
      toggleDisabled(workshops.nodejs);

    } else if ($(target).attr('name') === 'express') {
      toggleDisabled(workshops.jsFrameworks);

    } else if ($(target).attr('name') === 'node') {
      toggleDisabled(workshops.jsLibs);

    }

  });

  //Set the selected payment method to credit card
  $('#payment').val('credit card');

  //Disable the Select Payment Method option
  $(paymentInfo['select']).attr("disabled", true);  

  //Hiding the paypal and bitcoin divs as default
  $(paymentInfo['paypalDiv']).hide();
  $(paymentInfo['bitcoinDiv']).hide();

  //Check if the payment selector chagnes in order to update which divs is display.
  $('#payment').change((event) => {
    //setting a variable to contain the value from the selected option.
    let value = event.target.value;

    //Check which value it is an to show the right div and hide the others.
    if (value === "credit card") {
      $(paymentInfo['creditDiv']).show();
      $(paymentInfo['paypalDiv']).hide();
      $(paymentInfo['bitcoinDiv']).hide();

    } else if (value === "paypal") {
      $(paymentInfo['paypalDiv']).show();
      $(paymentInfo['creditDiv']).hide();
      $(paymentInfo['bitcoinDiv']).hide();

    } else if (value === "bitcoin") {
      $(paymentInfo['bitcoinDiv']).show();
      $(paymentInfo['creditDiv']).hide();
      $(paymentInfo['paypalDiv']).hide();

    }


  });


  



//});