/* Getting the Input Element and adding an event Listener for changing the userFiles list*/
const input = document.getElementById("file");
input.addEventListener("change", addToInputList);

//File list for InputElement and drag and drop
const userFiles = [];
const exportFiles = [];

//adding the Files from the Input element to our own UserFile list
function addToInputList(){
    const curFiles = input.files;
    if(curFiles.length != 0){
        for(const file of curFiles) {
            if(checkIfExists(file.name, userFiles) == false){
                userFiles.push(file) 
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
                if(checkIfExists(file.name, userFiles) == false){
                    userFiles.push(file) 
                    addVisualInputListElement(file)
                }
            }
        }
    }

}

//checks if the file already exists in FileList
function checkIfExists(name, liste){
    for(let file of liste){
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
    deleteButton.onclick = function(){deleteListElement(deleteButton, userFiles);}
    deleteButton.innerHTML = "Del";

    //adds elements to the listelement and add listelement to the list
    para.textContent = file.name;
    listItem.appendChild(para);
    listItem.appendChild(deleteButton);
    liste.appendChild(listItem);

}
/*adds for the receiving file an visuell Element in the list with 
    - name
    - delete button
*/
function addVisualExportListElement (file) {
    //get liste from html 
    const liste = document.getElementById("listeOutput")
    // create listelement, p for name and button for deleteButton
    const listItem = document.createElement("li");
    const para = document.createElement("p");
    const deleteButton = document.createElement("button");
    const downloadButtonTxt = document.createElement("button");
    const downloadButtonCSV = document.createElement("button");

    //add DeleteButton Function etc
    deleteButton.classList.add("deleteButton");
    deleteButton.onclick = function(){deleteListElement(deleteButton, exportFiles);}
    deleteButton.innerHTML = "Del";

    //add DownloadButtonTxt function etc
    downloadButtonTxt.classList.add("downloadButton");
    downloadButtonTxt.onclick = function(){download("txt",file)}
    downloadButtonTxt.innerHTML = "Download_txt";
    //add DownloadButtonCSV function etc
    downloadButtonCSV.classList.add("downloadButton");
    downloadButtonCSV.onclick = function(){download("csv",file)}
    downloadButtonCSV.innerHTML = "Download_csv";


    //adds elements to the listelement and add listelement to the list
    para.textContent = file.name;
    listItem.appendChild(para);
    listItem.appendChild(deleteButton);
    listItem.appendChild(downloadButtonTxt);
    listItem.appendChild(downloadButtonCSV);
    liste.appendChild(listItem);

}


//function that deletes the listElement, receive button from corresponding listelement
function deleteListElement(button, liste){
    //get listItem over button
    let listItem = button.parentElement;
    //search for the file in file list and remove it from the list
    for(let child of listItem.children){
        if(child.tagName =="P" || child.tagName == "p"){
            let fileName = child.textContent;
            for(const[index,element] of liste.entries()){
                if(element.name == fileName){
                    liste.splice(index,1);
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

