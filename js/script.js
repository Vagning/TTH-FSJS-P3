//Check if document is loaded before running any javscript
//$( document ).ready(function() {

	//Adding the title select and other title field as const for later usages
  const titleSelect = document.getElementById('title');
  const otherTitle = document.getElementById('other-title');
  const tshirtDesign = document.getElementById('design');
  const tshirtColor = document.getElementById('color');
  const tshirtColorOptions = tshirtColor.children;

	//Set the name text field to be active when the page loads.
  $('#name').focus();

  //Hiding the other title field when the page loads
  $(otherTitle).hide();

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
  	let designType;

  	//Sets the designType depending on which design is choosen by the user.
  	switch (tagetValue) {
  		case 'js puns':
  			designType = 'JS Puns';
  			break;
  		case 'heart js':
  			designType = 'I ♥ JS';
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


  



//});