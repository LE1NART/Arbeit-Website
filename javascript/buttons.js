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
            
            //TODO : File erstellen, das in die export liste packen, dafür die addVisuell und delete umschreiben, damit das für beide Listen klappt


            result.value.result



        }
        if(result.status == "rejected"){
            //if it does not work we get an alert
            alert(`${userFiles[num].name} hat nicht geklappt aufgrund ${result.reason}`);
        }
    })
}