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

