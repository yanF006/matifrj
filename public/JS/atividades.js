
$('#tipo_atividade').addEventListener('change', function() {
    var horaDiv = document.querySelector('.hora');
    if (this.value == '2') {
        horaDiv.style.display = 'block';
    } else {
        horaDiv.style.display = 'none';
    }
});