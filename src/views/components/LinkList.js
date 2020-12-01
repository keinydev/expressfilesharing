import { getLocalStorage, deleteLocalStorage } from '../../services/LocalStorage.js';

let LinkList = {

    render: async () => {

        let links = await getLocalStorage();
        let table = `
            <section class="flex-center margin">
                <h3>Links in this device.  </h3>
                <p>If you clean your device history, they are gonna delete too. So save it in another part</p>
                <table id="linksTable">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        ${ links.map(key => `
                            <tr id="${key[0]}">
                                <td><small>${key[0]}"</small></td>
                                <td><small><a href="${key[1]}">${key[1]}</a></small></td>
                                <td><div class="delete-link">❌</div></td>
                            </tr>`).join('\n ')}                    
                    </tbody>
                </table>
            </section>
        `
        return table; 
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {
       
        let deleteLink = document.querySelectorAll(".delete-link");

        for (let i = 0; i < deleteLink.length; i++) {
            deleteLink[i].addEventListener ("click",  () => {
                let localId = deleteLink[i].parentNode.parentNode;
                if (confirm("Are you sure? This action can't be undone")) {
                  removeTR(localId);
                } 
            });
        }

        /**
        * This function deletes the row from DOM and the item from LocalStorage using deleteLocalStorage method 
        * @param  {html} element  TR element from the table in DOM
        * @return {void} 
        */        
        let removeTR = (element) => {
            document.getElementById("linksTable").deleteRow(element.rowIndex);
            deleteLocalStorage(element.id);
        }
    }
}

export default LinkList;
