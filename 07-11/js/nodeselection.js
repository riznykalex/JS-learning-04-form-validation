
const engRegEx = /[a-zA-Z]+[a-zA-Z\s,.:;?!-']*/gm;
const cyrRegEx = /[\u0400-\u04FF]+[[\u0400-\u04FF\s:;,.?!-]*/gm;


$(document).ready(function(){

    $("#engButton").click(function() {
        checkLang(engRegEx, asd);
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


//функция сборки новой строки
function checkLang(languageConst, wrapNode){

        let textNodes = getTextNodes('p');

        textNodes.each (function (index){

            let newText = document.createElement("p");
            let selectedWords = []; //соответствуют регулярному выражению
            let otherWords = [];    //не соответствуют регулярному выражению

            //позиция вхождения
            let positionWord = 0;
            positionWord = textNodes[index].parentElement.innerText.search(languageConst);


            //проверка на пустой массив
            if (positionWord >= 0){
                selectedWords = textNodes[index].parentElement.innerText.match(languageConst);      //элементы совпавшие
                otherWords = textNodes[index].parentElement.innerText.split(languageConst);         //элементы не совпавшие
            }else {
                selectedWords[0] = "";
                otherWords[0] = textNodes[index].parentElement.innerText;
            }

            //подчистка пустых элементов массива несоответствующих слов
            otherWords = otherWords.filter(function (el) {
                return el != "";
            })

            // сборка новой строки если первый узел соответствует поиску
            if (positionWord === 0){

                for (let i = 0; i < selectedWords.length; i++){
                    newText.append( wrapNode(selectedWords[i])); //функция обертки

                    if( otherWords[i] ){
                        newText.append(otherWords[i]);
                    }
                    textNodes[index].replaceWith(newText);      //замена содержимого узла

                }

            // сборка новой строки если первый узел не соответствует поиску
            }else {
                for (let i = 0; i < otherWords.length; i++) {
                    newText.append(otherWords[i]);
                    newText.append( wrapNode(selectedWords[i])); //функция обертки
                    textNodes[index].replaceWith(newText);      //замена содержимого узла
                }
            }
    });

};


