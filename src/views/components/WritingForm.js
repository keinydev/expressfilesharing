import { postRequest } from '../../services/Fetch.js';
import { setLocalStorage } from '../../services/LocalStorage.js';
import openModal from '../../services/Modal.js';

let WritingForm = {

    render: async () => {
        return `<section class="flex-center margin">     
                    <h3>Write the text, we create the file (.txt)</h3>
                    <div class="form-group">
                      <textarea style="width: 100%" id="userText" placeholder="write here!"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="expiration">Expiration Time</label>
                        <input value="" class="expiration-input" type="hidden" placeholder="default 14" id="expirationTime">
                        <select id="expirationType">
                            <option value="">Default 14 days</option>
                            <option value="w">Weeks</option>
                            <option value="m">Months</option>
                            <option value="y">Years</option>
                        </select>
                    </div>                                     
                    <div class="row">
                      <div class="col-5 col">
                        <button id="saveText" class="btn-block btn-primary">Save</button>
                      </div>
                    </div>
                </section>`
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {

        document.getElementById("saveText").addEventListener("click",  async () => {
            
            let userText  = document.getElementById("userText").value;
            let expirationType = document.getElementById("expirationType").value;
            let expirationTime = document.getElementById("expirationTime").value;

            if (userText.trim() == "") {
                openModal("Error", "You must enter the text", "What do you want to save?");
                return;
            } 

            if (expirationType != "" && (expirationTime.trim() == "" || expirationTime <= 0)) {
                openModal("Error", "", "You must enter the expiration time, or simply select default days");
                return;
            } 

            let conditionExpiration = '' != expirationType ? 'expires='+expirationTime+expirationType : '';
            let response = await postRequest(conditionExpiration, "text="+userText, 'form');     
            
            if(response.status != 'error'){

               let message = `<p>Copy the link below, you can download whenever you want and immediately the file will be deleted from <a href="https://www.file.io/"> File.io </a> server</p>
                                <div class="row">
                                  <button id="copy-link" class="btn-success btn-block">Copy</button>
                                  <input style="width:100%" type="text" id="text-link" value="${response.link}">
                                </div> `;                    
                openModal("Yeah!", '', message);
                setLocalStorage(response.link);

            }else{
                openModal("Ops", `There is a problem with the server`);
            }
        });

        document.getElementById("expirationType").addEventListener("change", (evt) => {
            
            if(evt.target.value == ""){
                document.getElementById("expirationTime").type = "hidden";
                document.getElementById("expirationTime").value = "";
            }else{
                document.getElementById("expirationTime").type = "number";
                document.getElementById("expirationTime").value = "1";
            }

        });
    }
}

export default WritingForm;