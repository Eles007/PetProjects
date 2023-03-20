const inputQRCode = document.getElementById("input-QRCode");
const qrcodeElement = document.getElementById("qrcode-img");
const rangeElement = document.getElementById("input-range");
const rangeOutputElement = document.getElementById("input-range-output");

const generationBtn = document.getElementById("generation-btn");
let qrcodeImg = document.getElementById("qrcode-img");

let qrcode = new QRCode(qrcodeElement, {
    text: "",
    width: 0,
    height: 0,
    correctLevel: QRCode.CorrectLevel.H
});
let count = 0;


function clearAll() {
    inputQRCode.value = "";
}

function send() {
    if (inputQRCode.value.replace(/ /g, '') === "") {
        inputQRCode.value = ""
        generationBtn.disabled = true;
    }
    else if (count === 0 || qrcode._htOption.width != rangeElement.value) {
        count++;
        qrcodeImg.innerHTML = '<div id="qrcode-img"></div>';
        qrcode = new QRCode(qrcodeElement, {
            text: `${inputQRCode.value}`,
            width: rangeElement.value,
            height: rangeElement.value,
            colorDark: "black",
            colorLight: "rgb(162, 178, 251)",
        });
        qrcodeImg.style.opacity = 1;
        qrcodeImg.style.transform = "scale(1)"
        generationBtn.disabled = false;
        rangeElement.disabled = false;
    }
    else {
        count = 0;
    }
}

function input_range() {
    rangeOutputElement.innerText = `${rangeElement.value}px`;
    qrcodeImg.style.opacity = 0;
    qrcodeImg.style.transform = "scale(0)"
    if(rangeElement.value == qrcode._htOption.width) {
        qrcodeImg.style.opacity = 1;
        qrcodeImg.style.transform = "scale(1)"
    }
    if (inputQRCode.value.replace(/ /g, '') === "") {
        inputQRCode.value = ""
        rangeElement.disabled = true;
    }
}