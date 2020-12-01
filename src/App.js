import Error404 from './views/pages/Error404.js'
import Utils from './services/Utils.js'
import Routes from './Routes.js'

//Taken from https://github.com/rishavs/vanillajs-spa/blob/master/src/app.js with some modifications

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const content = null || document.getElementById('root');
    
    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = Routes[parsedURL] ? Routes[parsedURL] : Error404;
    
    let mainOptions = document.getElementById("mainOptions");
    let options = mainOptions.children;
    let optionSelected = mainOptions.querySelector("[href='/#"+parsedURL+"']");

    [...options].forEach((option) => {
        option.classList.add("btn-secondary");
    });

    optionSelected.classList.remove("btn-secondary");
    optionSelected.classList.add("btn-primary");

    content.innerHTML = await page.render();
    await page.after_render();
  
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
