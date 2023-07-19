//Die folgenden Funktionen dienen der Seitenbar

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

