//Die folgenden Funktionen sind für die Buttons und download

function segmentCSV(){
    let text = document.getElementById("textfield").value;
    let file = new File([text],"segmentiert")
    download("csv",file)
}

function segmentTXT(){
    let text = document.getElementById("textfield").value;
    let file = new File([text],"segmentiert")
    download("txt",file)
}

function countCSV(){
    let result = counting();
    let anzahl = result[0];
    let liste = result[1];

    let text = "Gesamt;"+anzahl;

    for(el of liste){
        text = text+"\n"+el.join(';')
    }
    let file = new File([text],"count")
    download("csv",file)
}

function download(type, file){
    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(file);
    a.download = `${file.name}.${type}`;
    a.click();
    window.URL.revokeObjectURL(a.href);
    a.remove();
}


async function segmentAll(){
    /*with Promise.allSettled we resolve all promises in the array
    as
    - {status:"fulfilled", value:result} for successful responses,
    - {status:"rejected", reason:error} for errors.
    */
    let results = await Promise.allSettled(userFiles.map(file =>reader(file)));

    //now for every result
    results.forEach((result,num) =>{
        if(result.status ==  "fulfilled"){
            
        
            
            //segment the text
            text = segmentieren(result.value.result)
            fileName = userFiles[num].name.slice(0,-4) +"_segmentiert"
            //create a file with the segmentet text
            let file = new File([text],fileName)

            exportFiles.push(file)
            addVisualExportListElement(file)
            

            console.log(result.value.result)
            console.log(num)
            console.log(text)




        }
        if(result.status == "rejected"){
            //if it does not work we get an alert
            alert(`${userFiles[num].name} hat nicht geklappt aufgrund ${result.reason}`);
        }
    })
}

function downloadAllTXT(){
    exportFiles.forEach(file => download("txt",file))
}

function downloadAllCSV(){
    exportFiles.forEach(file => download("csv",file))
}

function fragebogenZuSubmit(){
    let rowStrings = [];
    for (let i = 0, row; row = tableData[i]; i++){
        rowStrings.push( row.join(";") );
    }
    let tableString = rowStrings.join("\n")

    let input = document.getElementById("uploadFile");
    input.value = tableString;

}

function uploadWindow(){
    const popup = document.getElementById("uploadConfirmWindow");
    if(popup.style.visibility == 'hidden'){
        popup.style.visibility = 'visible';
    }
    else{
        popup.style.visibility = "hidden";
    }
}

//writtenByChris
function fragebogenZuTXT(){
    let table = document.getElementById("myTable");
    let tableString = "";
    for (let i = 0, row; row = table.rows[i]; i++){
        for (let j = 0, col; col = row.cells[j]; j++){
            //added special case for columnheader so we get the value, by Linus
            if(i==0 && j >0){
                tableString += col.firstChild.value+ '; ';
            }
            else{
                tableString += col.textContent + '; ';
            }
        }
        tableString += "\n";
      }
    let file = new File([tableString],"fragebogentabelle")
    download("txt",file)
  }
 //writtenByChris 
  function fragebogenZuCSV(){
    let rowStrings = [];
    for (let i = 0, row; row = tableData[i]; i++){
        rowStrings.push( row.join(";") );
    }
    let tableString = rowStrings.join("\n")

    let file = new File([tableString],"fragebogentabelle")
    download("csv",file)
  }