let counter = document.getElementById("counter") ;
let plus_one = document.getElementById("plus-one") ;
let minus_one = document.getElementById("minus-one") ;
let reset = document.getElementById("reset") ;

plus_one.onclick = () => {
    counter.value = parseInt(counter.value)+1 ;
    counter.innerText = counter.value ;
}

minus_one.onclick = () => {
    counter.value = parseInt(counter.value)-1 ;
    counter.innerText = counter.value ;
}

reset.onclick = () => {
    counter.value = 0  ;
    counter.innerText = counter.value ;
}