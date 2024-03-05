//Die Funktion zählt die Wörter im Text
function counting(text = document.getElementById("textfield").value){
    let wordCount = 0;
    let count =[];

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

function countWords(){
    let result = counting();
    presentCount(result[0],result[1]);
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