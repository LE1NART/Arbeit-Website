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
    let textRaw = String.raw`${document.getElementById("textfield").value} `;

    
    
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
        textRaw = textRaw.replace(/:/g, ":\n" );
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

    


    document.getElementById("textfield").value = textRaw;
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
        const popup = document.getElementById("myPopupAdd");
        popup.style.visibility = 'visible';
        setTimeout(hide, 2000, popup);
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
        console.log(popup)
        console.log(typeof(popup))
        setTimeout(hide, 2000, document.getElementById("myPopupDel"));
    }


}

function changeDisplay(){
    let divs = document.getElementsByClassName("showHide");
    let but = document.getElementById("hideButton");
    let buts = getComputedStyle(but);

    for (div of divs){
        if(div.style.display == "none"){
            div.style.display = "";
        }
        else{
        div.style.display = "none";
        }
    };

    if(buts.getPropertyValue('--status') == "show"){
        but.style.setProperty('--status', 'hide');
        document.getElementById("content").style.gridTemplateAreas = '"textfield textfield hideButton" "textfield textfield .';
        document.getElementById("buttonIcon").innerHTML="keyboard_double_arrow_left";
    }
    else{
        but.style.setProperty('--status', 'show');
        document.getElementById("content").style.gridTemplateAreas = '"textfield hideButton ." "textfield options abkz"';
        document.getElementById("buttonIcon").innerHTML="keyboard_double_arrow_right";
    }
}

function presentCount(anzahl, liste){
    let otherEl = document.getElementsByClassName("countHide");
    for(el of otherEl){
        el.style.display = "none";
    }
   
    document.getElementById("wordCount").style.display = "flex";

    document.getElementById("content").style.gridTemplateAreas = '"textfield count count" "textfield count count"';


    let table = document.getElementById("countTable");
    let row = table.insertRow();
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);

    c1.innerHTML = "Gesamt";
    c2.innerHTML = anzahl;

    for(item of liste){
        	let row = table.insertRow();
            let c1 = row.insertCell(0);
            let c2 = row.insertCell(1);

            c1.innerHTML = item[0];
            c2.innerHTML = item[1];
    }
}

function hideCount(){
    let otherEl = document.getElementsByClassName("countHide");
    for(el of otherEl){
        el.style.display = "";
    }
    document.getElementById("buttonIcon").innerHTML="keyboard_double_arrow_right";

    document.getElementById("wordCount").style.display = "none";

    document.getElementById("content").style.gridTemplateAreas = '"textfield hideButton ." "textfield options abkz"';


}

function segmentCSV(){
    let a = document.createElement("a");
    let text = document.getElementById("textfield").value;
    a.href = window.URL.createObjectURL(new Blob([text], {type: "text/plain"}));
    a.download = "segment.csv";
    a.click();
}

function segmentTXT(){
    let a = document.createElement("a");
    let text = document.getElementById("textfield").value;
    a.href = window.URL.createObjectURL(new Blob([text], {type: "text/plain"}));
    a.download = "segment.txt";
    a.click();
}

function countCSV(){
    let result = counting();
    let anzahl = result[0];
    let liste = result[1];

    let text = "Gesamt;"+anzahl;

    for(el of liste){
        text = text+"\n"+el.join(';')
    }

    let a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([text], {type: "text/plain"}));
    a.download = "count.csv";
    a.click();
}

function countWords(){
    let result = counting();
    presentCount(result[0],result[1]);
}


function counting(){
    let wordCount = 0;
    let count =[];

    let text = document.getElementById("textfield").value;
    text = normalizeText(text);

    let textArray = text.split(" ");
    textArray = textArray.filter(text => text != '');
    
    for(let e of textArray){
        wordCount +=1;
        let excist = false;
        for(let c of count){
            if(c[0] == e){
                c[1] = c[1]+1;
                excist = true;
                break
            }
        }
        if(excist == false){
            count.push([e,1]);
        }
    }

    count.sort(function(a,b){return b[1]-a[1]})

    console.log(textArray);
    console.log(count);

    return [wordCount, count]
}

function normalizeText(text){
    text = text.replace(/\,/g, "");
    text = text.replace(/\./g, "");
    text = text.replace(/\(/g, "");
    text = text.replace(/\)/g, "");
    text = text.replace(/\:/g, "");
    text = text.replace(/\;/g, "");
    text = text.toLowerCase();
    return text;
}

window.onload = function onStart(){
    const abkz = ["a." , "a.A." , "a.a.O." , "a.a.S." , "a.D." , "a.d." , "A.d.Hrsg." , "A.d.Ü." , "a.G." , "a.gl.O." , "a.n.g." , "a.S." , "Abb." , "Abf." , "Abg." , "abg." , "Abh." , "Abk." , "abk." , "Abs." , "Abw." , "Abz." , "Adir." , "Adj." , "adj." , "Adr." , "Adv." , "adv." , "Afr." , "Ag." , "agg." , "Aggr." , "Ahg." ,"Anh." , "Akad." , "akad." , "Akk." , "Alg." , "allg." , "alph." , "altgr." , "Am." , "Amp." , "amtl." , "Amtsbl." , "An." , "anat." , "anerk." , "Anf." , "Anfr." , "Ang." , "angekl." , "Angel." , "Angest." , "angew." , "Ank." , "Anl." , "anl." , "Anm." , "Ann." , "ann." , "anon." , "Anord." , "Anp." , "ANr." , "Ans." , "Ansch.-K." , "Ansch." , "anschl." , "Anschr." , "Anspr." , "Antiq." , "Antr." , "Antw." , "Anw.-L." , "Anz." , "Apart." , "apl." , "App." , "Apr." , "apr." , "Aq." , "Arbf." , "Arbg." , "Arbn.","ArbN" , "Arch." , "arr." , "Art.","Artt." , "Art.-Nr." , "Asp." , "Ass." , "Assist." , "ASt." , "Astrol." , "astron." , "asym." , "asymp." , "At." , "Atl." , "Atm." , "Attr." , "Aufb.","Aufbew." , "Aufg." , "Aufkl." , "Aufl." , "Ausg." , "ausschl." , "Az." , "Änd." , "Äq." , "ärztl." , "ästh." , "äth." , "b." , "b.w." , "Ba." , "Bd.","Bde." , "beil." , "bes." , "Best.-Nr." , "Betr." , "bez." , "Bez." , "Bhf." , "Bil." , "Bl." , "brosch." , "Bsp." , "Bspw." ,"bspw." , "bzgl." , "bzw." , "Bzw.", "c.t." , "ca." , "d.Ä." , "d.Gr." , "d.h." , "d.i." , "d.J." , "d.M." , "d.O." , "d.R." , "d.U." , "d.Vf." , "DDr." , "desgl." , "dgl." , "Dipl." , "Dr." , "Dr.-Ing." , "Dr.jur." , "Dr.med." , "Dr.med.dent." , "Dr.med.vet." , "Dr.phil." , "Dr.rer.nat." , "Dr.rer.pol." , "Dr.theol." , "Dres." , "Ph.D." , "dt.","dtsch." , "dto." , "Dtz.","Dtzd." , "e.h." , "e.V." , "ebd." , "Ed." , "ehem." , "eig.", "eigtl." , "einschl." , "entspr." , "erg." , "etal." , "etc." , "etc.pp." , "ev." , "evtl." , "exkl." , "Expl." , "Exz.", "f." , "f.d.R." , "Fa." , "Fam." , "ff." , "Forts." , "Fr." , "frdl." , "Frhr." , "Frl." , "frz." , "Gbf." , "geb." , "Gebr." , "gegr." , "geh." , "gek." , "Ges." , "ges.gesch." , "gesch." , "Geschw." , "gest." , "Gew." , "gez." , "ggf." , "Hbf." , "hg." , "hL." , "hl." , "Hr(n)." , "Hrsg." , "Hs." , "i.a.","i.allg." , "i.A.","i.Allg." , "i.d.R." , "i. e." , "i.e.S." , "i. H. v." , "i.J." , "i.R." , "i.S." , "i.V." , "i.W." , "i.w.S." , "i.Z.m." , "id." , "Ing." , "Inh." , "inkl." , "Jb." , "Jg." , "Jh." , "Jkr." , "jr.","jun." , "Kap." , "kart." , "kath." , "Kfm." , "kfm." , "kgl." , "Kl." , "Komp." , "Kr." , "Kto." , "led." , "lfd." , "lfd.m." , "lfd.Nr." , "Lfg.","Lfrg." , "lt." , "Ltn." , "luth." , "m.A.n." , "m.a.W." , "m.E." , "m.W." , "math." , "m.d.B." , "Min." , "Mio.","Mill." , "möbl." , "Mrd.","Md.","Mia." , "Ms.","Mskr." , "mtl." , "MwSt." , "Mz." , "Nachf.","Nchf." , "n.Chr." , "n.J." , "n.M." , "N.N." , "nachm." , "Nds." , "Nr.","No." , "Nrn.","Nos." , "o." , "o.Ä." , "o.B." , "o.B.d.A.","oBdA" , "o.J." , "o.P." , "Obb." , "op." , "p.A." , "Pf." , "Pfd." , "pp.","ppa." , "Pfr." , "Pkt." , "Prof." , "Prov." , "ps." , "q.e.d." , "r.-k.","rk." , "rd." , "Reg.-Bez." , "Rel." , "resp." , "Rhh." , "Rhld." , "S." , "s.a." , "s.d." , "s.o." , "s.t." , "s.u." , "s.Z." , "Sa." , "sen." , "spez." , "Spk." , "sog." , "spec." , "St.","Skt.","Std." , "Str." , "stud." , "svw.","s.v.w." , "Tel." , "Tsd." , "u.A.w.g." , "u." , "u.a." , "u.a.m." , "u.Ä." , "u.d.M." , "u.dgl.(m.)" , "u.E." , "u.U."  , "u.ü.V." , "u.v.a." , "u.v.m." , "u.W." , "ü.d.M." , "Univ.-Prof." , "urspr." , "usf.","u.s.f." , "usw.","u.s.w." , "v." , "V." , "v.a." , "v.Chr." , "v.g.u." , "v.H." , "v.J." ,"vl.", "vll.", "vlt.", "vllt.", "v.M." , "v.T." , "Verf.","Vf." , "verh." , "Verl." , "Vers." , "vers." , "verw." , "vgl." , "vorm." , "Vors." , "w.o." , "Wwe." , "Wwr." , "Wz." , "z.B." ,"zB.", "z.d.A." , "z.H.","z.Hd." , "z.K.","z.Kts." , "z.S." , "z.T." , "zz.","zzt."  , "z.Z.","z.Zt." , "Ztg." , "Ztr." , "Ztschr." , "zus." , "zw." , "zzgl."]
    
    abkz.forEach(element => {
        addList(element);
    });
}