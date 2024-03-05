// Die folgenden Funktionen dienen dem Segmentieren und er dazu notwendigen Textbearbeitung

function segmentieren(textRaw = String.raw`${document.getElementById("textfield").value} `){
    //text wird als Parameter übergeben, wenn kein Wert übergeben wird nutzen wir den default, welcher der text aus dem Textfield ist
    
    //werte der Checkboxen ziehen und in Variablen speichern
    const punkt = document.getElementById("punkt").checked;
    const komma = document.getElementById("komma").checked;
    const und = document.getElementById("und").checked;
    const oder = document.getElementById("oder").checked;
    const dpunkt = document.getElementById("dpunkt").checked;
    const klammer = document.getElementById("klammer").checked;
    const abkz = document.getElementById("abkz").checked;

    //text ziehen und als rawText umwandeln
    //let textRaw = String.raw`${document.getElementById("textfield").value} `;

    textRaw = textRaw.replaceAll("\r\n", " ");
    textRaw = textRaw.replaceAll("\n", " ");
    textRaw = textRaw.replaceAll("\r", " ");

    if (punkt){
        textRaw = textRaw.replace(/\. /g, ". \n");
        textRaw = textRaw.replace(/\?/g , "?\n");
        textRaw = textRaw.replace(/!/g, "!\n");
        textRaw = textRaw.replaceAll("?\n " , "?\n");
        textRaw = textRaw.replaceAll("!\n ", "!\n");
    }

    if(komma){
        textRaw = textRaw.replace(/,/g, ",\n");
        textRaw = textRaw.replaceAll(",\n ", ",\n");
    }

    if(und){
        textRaw = textRaw.replace(/\sund\s/g, "\nund ");
        textRaw = textRaw.replace(/\sUnd\s/g, "\nUnd ");
    }

    if(oder){
        textRaw = textRaw.replace(/\soder\s/g, "\noder ");
        textRaw = textRaw.replace(/\sOder\s/g, "\nOder ");
    }

    if(dpunkt){
        textRaw = textRaw.replace(/: /g, ": \n" );
        textRaw = textRaw.replaceAll(":\n ", ":\n" );
    }

    if(klammer){
            //Wenn die Klammerung nicht korrekt ist gehen wir in den Else Case
            if (testBrackets(textRaw)){
                textRaw = segBrackets(textRaw,0);
            }
            else{
                if(confirm("Die Klammerung dieses Textes ist nicht korrekt, soll die Segmentierung der Klammern trotzdem durchgeführt? Dies kann allerdings zu einer fehlerhaften Segmentierung führen.")){
                    textRaw = segBrackets(textRaw,0);
                }
            }
        }

    if(!abkz){
        const list = document.getElementById("liste");
        for (let i = 0; i < list.children.length; i++) {
            var snippet = list.children[i].id;
            var re = new RegExp("\\s"+snippet+"\\s\\n", "g");
            textRaw = textRaw.replace(re, " "+snippet+" ")
          }
        //
    }

    
    if(!!document.getElementById("textfield")){
        document.getElementById("textfield").value = textRaw;
    }
    else{
        return textRaw;
    }
}

function segBrackets(str,start, array = []){
    for(let i =start; i <= str.length; i++){
        if(str[i] == '('){
            array.push(['(',i]);
        }
        if(str[i] == ')'){
            let el = array.pop();
            let cutBack = str;
            if(el !== undefined){
                cutBack = cut(str,el[1],i);
            }
            let back = segBrackets(cutBack, i,array);
            back = back.replace("§@", "[(");
            back = back.replace("@§", ")]");
            return back;
        }

    }
    return str;

}


function cut(str,start,end){
    const beg = str.slice(0,start);
    const rest = str.slice(end+1,str.length+1);
    let copy = str.slice(start,end+1);
    copy = copy.replace("(", "§@");
    copy = copy.replace(")", "@§");

    let newStr = String.raw`${beg}${rest}`;
    let array = [];
    let matches = newStr.matchAll("\r");
    for(const match of matches){
        array.push([match[0],match.index]);
    }
    matches = newStr.matchAll("\n");
    for(const match of matches){
        array.push([match[0],match.index]);
    }
    matches = newStr.matchAll("\r\n");
    for(const match of matches){
        array.push([match[0],match.index]);
    }
    array = array.sort(function(a,b){return a[1]-b[1];});
    for(let match in array){
        if(array[match][1] > start+1 && array[match][1] > end-copy.length){
            let output = [newStr.slice(0,array[match][1])+"\n",copy,newStr.slice(array[match][1])].join('');
            output = output.slice(0,start)+"[]"+output.slice(start);
            return output;
        }
    }
    return "Da ist was schiefgegangen."

}

function testBrackets(str) {
    var chksum = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i] == "(") chksum++
        if (str[i] == ")") chksum--;
        if (chksum < 0) return false;
        }
    return (chksum == 0);
}


