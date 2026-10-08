let numeroSorteado = Math.floor(Math.random() * 100) + 1;

function verificar() {

    let tentativa = Number(document.getElementById("numero").value);
    let resultado = document.getElementById("resultado");
    
    let caixa = document.getElementById("tentativas");

    caixa.classList.add("tentativas");

    if (tentativa === numeroSorteado) {
        
        resultado.inerHTML = "Acertou!";
        resultado.style.backgroundColor = "green";

    } else if (tentativa < numeroSorteado) {
        resultado.innerHTML = "Errou!";
        resultado.style.backgroundColor = "red";
    }

}
    
