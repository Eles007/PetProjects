let modalData = document.getElementById("data-modal").classList;
let article = document.querySelector("article").style;
let dataIndicators = document.querySelectorAll(".data.indicator input,select");

let heightElement = document.getElementById("height");
let ageElement = document.getElementById("age");
let genderElement = document.getElementById("gender");
let weightElement = document.getElementById("weight");
let waistElement = document.getElementById("waist");
let neckElement = document.getElementById("neck");
let hipElement = document.getElementById("hip");

let button_send = document.getElementById("send-btn");


function send() {
    let count = 0;
    for(let i=0; i<dataIndicators.length;i++){
        if(+(dataIndicators[i].value)<+(dataIndicators[i].min) || dataIndicators[i].value==="-------"){
            dataIndicators[i].style.border="4px solid red";
        }else{
            dataIndicators[i].style.border="1px solid gray";
            count++;
        }
    }
    
    if(count === dataIndicators.length){
        button_send.classList.remove("enable")
    }else {
        button_send.classList.add("enable")
        return button_send.enabled = false;
    }

    

    let height = +(heightElement.value);
    let age = +(ageElement.value);
    let gender = +(genderElement.value);
    let weight = +(weightElement.value);

    let waist = +(waistElement.value);
    let neck = +(neckElement.value);
    let hip = +(hipElement.value);

    modalData.add("close");
    article.visibility = "visible";

    const BMI = weight/((height/100)**2);
    const BFP = (gender == true)
                ?((495/(1.0324 - 0.19077*Math.log10(waist-neck) + 0.15456*Math.log10(height)))-450)
                :((495/(1.29579 - 0.35004*Math.log10(waist+hip-neck) + 0.22100*Math.log10(height)))-450);
    const LBM = (gender == true) 
                ?(0.407*weight + 0.267*height - 19.2)
                :(0.252*weight + 0.473*height - 48.3);
    const BSA = 0.007184 * weight**0.425 * height**0.725;
    const FFMI = (LBM / (height/100)**2) + 6.1 * (1.8 - height/100);
    const BAI = (hip / (height/100)**1.5) - 18;
    const BMR = (gender == true)
                ?(13.397*weight + 4.799*height - 5.677*age + 88.362)
                :(9.247*weight + 3.098*height - 4.330*age + 447.593);
    const IBW = (gender == true)
                ?(50+2.3*(0.394*height-60))
                :(45.5+2.3*(0.394*height-60));

    document.getElementById("BMI").innerHTML = `<p>Индекс мыссы тела-<b>${BMI.toFixed(1)}</b></p>`;
    document.getElementById("BFP").innerHTML = `<p>Процент жировой массы тела-<b>${BFP.toFixed(1)}</b>%</p>`;
    document.getElementById("LBM").innerHTML = `<p>Сухая масса тела-<b>${LBM.toFixed(1)}</b>кг</p>`;
    document.getElementById("BSA").innerHTML = `<p>Площадь поверхности тела-<b>${BSA.toFixed(1)}</b> м&sup2;</p>`;
    document.getElementById("FFMI").innerHTML = `<p>Индекс обезжиренной массы-<b>${FFMI.toFixed(1)}</b></p>`;
    document.getElementById("BAI").innerHTML = `<p>Индекс ожирения тела-<b>${BAI.toFixed(1)}</b></p>`;
    document.getElementById("BMR").innerHTML = `<p>Базальная скорость обмена веществ-<b>${BMR.toFixed(1)}</b> калорий в день</p>`;
    document.getElementById("IBW").innerHTML = `<p>Идеальная масса тела-<b>${IBW.toFixed(1)}</b>кг</p>`;
}

function change(){
    modalData.remove("close");
    article.visibility="hidden";
}

function input_after_error(){
    for(let i=0; i<dataIndicators.length;i++){
       if (dataIndicators[i].style.border.indexOf('red') > 0){
            return button_send.classList.remove("enable");
       }
    }
}