/**
* This restore the button "Copy" in the form
* @return {void} 
*/
let restoreStatus = () => {
	setTimeout(() => { 
	    document.getElementById('copy-link').className = "btn-success btn-block"; 
	    document.getElementById('copy-link').innerHTML = "Copy";		
	}, 1000);		
}

/**
* With this function, the button has "copy" functionality using the api, here I add some classes for styling purposes
* @return {void} 
*/
let copyLink = () => {
	if(document.getElementById('copy-link')){
		document.getElementById('copy-link').addEventListener('click', () => {
		  let text = document.getElementById('text-link');
		  text.focus();
		  text.select();

		  try {
		    let successful = document.execCommand('copy');
		    
		    if(successful){    	
			    if(document.getElementById('copy-link').classList.contains("btn-success")){
			    	document.getElementById('copy-link').classList.remove("btn-success");	
			    	document.getElementById('copy-link').classList.add("btn-warning");	
			    }
			    document.getElementById('copy-link').innerHTML = "Copied!";
			    restoreStatus();
		    }
		  } catch (err) {
		    console.log('Oops, unable to copy');
		  }
		}); 
	}	
}

/**
* This function opens the modal replacing some html from parameters
* @param  {string}    title       Modal title
* @param  {string}    subtitle    Modal subtitle
* @param  {string}    message     Modal body
* @return {void}
*/
let Modal = (title, subtitle = '', message = '') => { 
    document.getElementById("modal-v").click();
    document.getElementById("modal-v-title").innerHTML = title;
    document.getElementById("modal-v-subtitle").innerHTML = subtitle;
    document.getElementById("modal-v-text").innerHTML = message;

    copyLink();
}

export default  Modal
