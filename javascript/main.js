function segmentieren(){
    //werte der Checkboxen ziehen und in Variablen speichern
    const punkt = document.getElementById("punkt").checked;
    const komma = document.getElementById("komma").checked;
    const und = document.getElementById("und").checked;
    const oder = document.getElementById("oder").checked;
    const dpunkt = document.getElementById("dpunkt").checked;
    const klammer = document.getElementById("klammer").checked;
    const abkz = document.getElementById("abkz").checked;


    //text ziehen und als rawText umwandeln
    let text = document.getElementById("textfield").value;
    let textRaw = String.raw`${document.getElementById("textfield").value}`;
    
    textRaw = textRaw.replace("\r\n", " ");
    textRaw = textRaw.replace("\n", " ");
    textRaw = textRaw.replace("\r", " ");

    if (punkt){
        textRaw = textRaw.replace(/\./g, ". \r");
        textRaw = textRaw.replace(/\?/g , "? \r");
        textRaw = textRaw.replace(/!/g, "! \r");
    }

    if(komma){
        textRaw = textRaw.replace(/,/g, ", \r");
    }

    if(und){
        textRaw = textRaw.replace(/\sund\s/g, "\rund ");
    }

    if(oder){
        textRaw = textRaw.replace(/\soder\s/g, "\roder ");
    }

    if(dpunkt){
        textRaw = textRaw.replace(/:/g, ": \r" );
    }




    document.getElementById("textfield").value = textRaw;
}

function addList(input = document.getElementById("input").value){
    //Hinzufügen zu der Liste
    const list = document.getElementById("liste");

    if(document.getElementById(input) === null && input !== ""){
        //create new list element
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(input));
        li.setAttribute("id",input);
        
        list.appendChild(li);
    }
    else{
        //soll ein popup erzeugen, welches sagt, dass das element bereits vorhanden ist
        var popup = document.getElementById("myPopupAdd");
        popup.style.visibility = 'visible';
        setTimeout("hide()", 2000, popup);
    }
}

function hide(popup){
    popup.style.visibility = 'hidden';
}

function deleteList(){
    const list = document.getElementById("liste");
    const input = document.getElementById("input").value;

    if(document.getElementById(input) !== null){
        var li = document.getElementById(input)
        list.removeChild(li);
    }
    else{
        var popup = document.getElementById("myPopupDel");
        popup.style.visibility = 'visible';
        setTimeout("hide()", 2000, popup);
    }


}

function onStart(){
    const abkz = []
    abkz.forEach(element => {
        
    });
}