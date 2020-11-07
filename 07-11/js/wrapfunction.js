const asd =  function(text){

    let newSpan = document.createElement('span');
    newSpan.classList.toggle('lat');
    newSpan.innerText = text;
    newSpan.setAttribute('tooltip',newSpan.textContent);

    return newSpan;

}