function verificarRespostas() {
    //Definindo as respostas corretas
    const respostasCorretas = {
        "pergunta1": "a",
        "pergunta2": "b",
        "pergunta3": "b",
        "pergunta4": "a",
        "pergunta5": "d"
    };

    let resultado = "";
    let totalCorretas = 0;

    // Checando cada pergunta
    for (let pergunta in respostasCorretas) {
        let respostaMarcada = document.querySelector(`input[name="${pergunta}"]:checked`);
        
        if (respostaMarcada) {
            if (respostaMarcada.value === respostasCorretas[pergunta]) {
                resultado += `Pergunta ${pergunta.replace("pergunta", "")}: Correta!<br>`;
                totalCorretas++;
            } else {
                resultado += `Pergunta ${pergunta.replace("pergunta", "")}: Errada. A resposta correta é "${respostasCorretas[pergunta].toUpperCase()}".<br>`;
            }
        } else {
            resultado += `Pergunta ${pergunta.replace("pergunta", "")}: Nenhuma opção marcada.<br>`;
        }
    }

    // Exibindo o resultado na página
    document.getElementById("resultado").innerHTML = resultado;
    document.getElementById("totalCorretas").textContent = `Você acertou ${totalCorretas} de ${Object.keys(respostasCorretas).length} perguntas.`;
}