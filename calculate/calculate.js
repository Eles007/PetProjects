let input = document.querySelector(".output-panel");

function insert(num){
    if(input.textContent == 0){
        input.textContent = ""
        input.textContent = input.textContent + num; 
    }else
        input.textContent = input.textContent + num;
}

function clean() {
    input.textContent = "0";
}

function back(){
    input.textContent = input.textContent.substring(0, input.textContent.length-1)
}

function equal() {
    let exp = input.textContent.replace(/\^/,"**");
    let sum = eval(exp);
    if(exp) {
        input.textContent = sum;
        if (sum%1 !== 0) {
            input.textContent = sum.toFixed(6);
        } 
    } 
}