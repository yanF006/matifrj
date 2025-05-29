
//confirmaçao de senha do registro
let senha = document.getElementById('FloatingPassword');
let senhaC = document.getElementById('FloatingPasswordC');

function validarSenha() {
  if (senha.value != senhaC.value) {
    senhaC.setCustomValidity("Senhas diferentes!");
    senhaC.reportValidity();
    return false;
  } else {
    senhaC.setCustomValidity("");
    return true;
  }
}

// verificar também quando o campo for modificado, para que a mensagem suma quando as senhas forem iguais
senhaC.addEventListener('input', validarSenha);

function mascara_cpf(){
  var cpf = document.getElementById('Floatingcpf')
  if(cpf.value.length == 3 || cpf.value.length == 7) {
    cpf.value += "."
  } else if (cpf.value.length == 11) {
    cpf.value += "-"
  }
}



