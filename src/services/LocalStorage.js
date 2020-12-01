/**
* This return a new date format 
* @return {string} New date
*/
let gettingDate = () => { 
    let date = new Date();
    let newDateFormat = 
        ("00" + (date.getMonth() + 1)).slice(-2) 
        + "-" + ("00" + date.getDate()).slice(-2) 
        + "-" + date.getFullYear() + " " 
        + ("00" + date.getHours()).slice(-2) + ":" 
        + ("00" + date.getMinutes()).slice(-2) 
        + ":" + ("00" + date.getSeconds()).slice(-2); 
    return newDateFormat;
} 

/**
* This function sets a new item to Local Storage API, for this project, the key is always a datetime
* @param  {string}  value  Item to save 
* @return {void} 
*/
async function setLocalStorage(value){ 
    localStorage.setItem(gettingDate(), value);
}

/**
* This function gets all the items from Local Storage API 
* @return {json} Return all the entries 
*/
async function getLocalStorage(){ 
    return Object.entries(localStorage);
}

/**
* This function deletes a item from Local Storage API
* @param  {string}  value  Item to delete 
* @return {void} 
*/
async function deleteLocalStorage(value){ 
    localStorage.removeItem(value); 
}

export {
  setLocalStorage,
  getLocalStorage, 
  deleteLocalStorage
};
