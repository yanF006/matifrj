var labels = document.getElementById('labels_data');
var hora = document.querySelector('.hora');
hora.children[0].remove();

function exibirCampos()
{

    var tipoAtividade = document.getElementById("tipo_atividade").value;
        var camposHora = document.querySelector(".hora");

        if (tipoAtividade == "1") {
            camposHora.appendChild(labels);
        } else {
            camposHora.removeChild(labels);
        }
}