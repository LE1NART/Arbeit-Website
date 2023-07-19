/* Getting the Input Element and adding an event Listener for changing the userFiles list*/
const input = document.getElementById("file");
input.addEventListener("change", addToInputList);

//File list for InputElement and drag and drop
const userFilesInput = [];
const userFilesExport = [];

//adding the Files from the Input element to our own UserFile list
function addToInputList(){
    const curFiles = input.files;
    if(curFiles.length != 0){
        for(const file of curFiles) {
            if(checkIfExists(file.name) == false){
                userFilesInput.push(file) 
                addVisualInputListElement(file)
            }
        }
    }
}

//Event Handler for dropping files into the drop area
function dropHandler(ev){
    //prevent Default tab opening for file
    ev.preventDefault();

    const zone = document.getElementById("inputArea");
    //CSS Class for drop Area
    zone.classList.remove("dragAndDropHover");

    const curFiles = ev.dataTransfer.files;
    if(curFiles.length != 0){
        for(const file of curFiles) {
            if(file.type === "text/plain"){
                console.log(file)
                if(checkIfExists(file.name) == false){
                    userFilesInput.push(file) 
                    addVisualInputListElement(file)
                }
            }
        }
    }

}

//checks if the file already exists in FileList
function checkIfExists(name){
    for(let file of userFilesInput){
        if(file.name == name){
            return true
        }
    }
    return false
}

/*adds for the receiving file an visuell Element in the list with 
    - name
    - delete button
*/
function addVisualInputListElement (file) {
    //get liste from html 
    const liste = document.getElementById("listeInput")
    // create listelement, p for name and button for deleteButton
    const listItem = document.createElement("li");
    const para = document.createElement("p");
    const deleteButton = document.createElement("button");

    //add DeleteButton Function etc
    deleteButton.classList.add("deleteButton");
    deleteButton.onclick = function(){deleteInputListElement(deleteButton);}
    deleteButton.innerHTML = "Del";

    //adds elements to the listelement and add listelement to the list
    para.textContent = file.name;
    listItem.appendChild(para);
    listItem.appendChild(deleteButton);
    liste.appendChild(listItem);

}


//function that deletes the listElement, receive button from corresponding listelement
function deleteInputListElement(button){
    //get listItem over button
    let listItem = button.parentElement;
    //search for the file in file list and remove it from the list
    for(let child of listItem.children){
        if(child.tagName =="P" || child.tagName == "p"){
            let fileName = child.textContent;
            for(const[index,element] of userFilesInput.entries()){
                if(element.name == fileName){
                    userFilesInput.splice(index,1);
                }
            }
            //remove the visuell list element from html list
            listItem.remove();
            break
        }
    }
}

//function to add draganddrop effect on inputarea
function dragOverHandler(ev){
    console.log("File in drop zone");

    ev.preventDefault();

    const zone = document.getElementById("inputArea");
    zone.classList.add("dragAndDropHover");
}

//function to remove draganddrop effect on inputarea
function dragLeaveHandler(ev){
    console.log("File left the zone");

    const zone = document.getElementById("inputArea");
    zone.classList.remove("dragAndDropHover");
}

function preventDefaultHandler(ev){
    ev.preventDefault();
}

//function to read the files
function reader(file){
    //return as promise so we use asynchron
    return new Promise((resolve,reject) =>{ 
        //create a fileReader
        const fr = new FileReader();
        //if loads succesfull we resolve otherwise we reject with error
        fr.onload = () => resolve(fr);
        fr.onerror = (err) => reject(err);
        //we read as text
        fr.readAsText(file);
    });
}

async function start(){
    /*with Promise.allSettled we resolve all promises in the array
    as
    - {status:"fulfilled", value:result} for successful responses,
    - {status:"rejected", reason:error} for errors.
    */
    let results = await Promise.allSettled(userFilesInput.map(file =>reader(file)));

    //now for every result
    results.forEach((result,num) =>{
        if(result.status ==  "fulfilled"){
            //if the result was succesfull we log the value
            console.log(result)
            console.log(result.value);
            console.log(result.value.result)
            test();
        }
        if(result.status == "rejected"){
            //if it does not work we get an alert
            alert(`${userFilesInput[num].name} hat nicht geklappt aufgrund ${result.reason}`);
        }
    })
}