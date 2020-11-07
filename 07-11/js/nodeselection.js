
const engRegEx = /[a-zA-Z]+[a-zA-Z\s,.:;?!-']*/gm;
const cyrRegEx = /[\u0400-\u04FF]+[[\u0400-\u04FF\s:;,.?!-]*/gm;

$(document).ready(function(){

    $("#rusButton").click(function() {
        checkLang(cyrRegEx, "cyr");
    });

    $("#engButton").click(function() {
        checkLang(engRegEx, "lat");
    });
});


//выбор текстовых узлов
function getTextNodes (tagName){

    let selectedElement = $(tagName).contents();
    let textNodes = selectedElement.filter(function (){
        return this.nodeType === 3;
    });

    return textNodes;
}


//всплывающие подсказки
function addTip (className){
    let s = 'span.' + className;
    $(s).mouseover(function(){
        this.setAttribute('tooltip',this.textContent);
    });
}


//функция обертки
function checkLang(languageConst, className){

        let textNodes = getTextNodes('p');

        textNodes.each (function (index){

            let newSpan = document.createElement("span");
            let newText = document.createElement("p");
            let selectedWords = []; //соответствуют регулярному выражению
            let otherWords = [];    //не соответствуют регулярному выражению

            let positionWord = 0;

            //позиция вхождения
            positionWord = textNodes[index].parentElement.innerText.search(languageConst);


            //роверка на пустой массив
            if (positionWord >= 0){
                selectedWords = textNodes[index].parentElement.innerText.match(languageConst);
                otherWords = textNodes[index].parentElement.innerText.split(languageConst);
            }else {
                selectedWords[0] = "";
                otherWords[0] = textNodes[index].parentElement.innerText;
            }

            //подчистка пустых элементов массива несоответствующих слов
            otherWords = otherWords.filter(function (el) {
                return el != "";
            })

            // сборка новой строки первый узел соответствует поиску
            if (positionWord === 0){

                for (let i = 0; i < selectedWords.length; i++){

                    newSpan = document.createElement("span");
                    newSpan.classList.toggle(className);
                    newSpan.innerText = selectedWords[i];
                    newText.append(newSpan);

                    if( otherWords[i] ){
                        newText.append(otherWords[i]);
                    }

                    textNodes[index].replaceWith(newText);

                }

                // сборка новой строки первый узел не соответствует поиску
            }else {
                for (let i = 0; i < otherWords.length; i++) {

                    newText.append(otherWords[i]);
                    newSpan = document.createElement("span");
                    newSpan.classList.toggle(className);
                    newSpan.innerText = selectedWords[i];
                    newText.append(newSpan);
                    textNodes[index].replaceWith(newText);
                }
            }
    });

    addTip(className);
};


