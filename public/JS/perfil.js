// Carrega o perfil do Local Storage ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const profile = JSON.parse(localStorage.getItem("profile")) || {
        nome: "",
        bio: "",
        turma: "",
        foto: "default.jpg"
    };

    document.getElementById("nome").value = profile.name;
    document.getElementById("bio").value = profile.bio;
    document.getElementById("turma").value = profile.turma;
    document.getElementById("foto").src = profile.photo;
});

// Habilita a edição do perfil
function enableEditing() {
    document.getElementById("nome").disabled = false;
    document.getElementById("bio").disabled = false;
    document.getElementById("turma").disabled = false;
    document.getElementById("fileInput").disabled = false;
    document.getElementById("editPhotoButton").disabled = false;
    document.getElementById("saveButton").disabled = false;
    document.getElementById("editButton").disabled = true;
}

// Salva o perfil no Local Storage e desabilita os campos de edição
function saveProfile() {
    const name = document.getElementById("nome").value;
    const bio = document.getElementById("bio").value;
    const turma = document.getElementById("turma").value;
    const photo = document.getElementById("foto").src;

    const profile = { name, bio, turma, photo };
    localStorage.setItem("profile", JSON.stringify(profile));

    Swal.fire({
        title: "Bom trabalho!",
        text: "As alterações foram salvas!",
        icon: "success"
      });



    // Desativa os campos novamente após salvar
    document.getElementById("nome").disabled = true;
    document.getElementById("bio").disabled = true;
    document.getElementById("turma").disabled = true;
    document.getElementById("fileInput").disabled = true;
    document.getElementById("editPhotoButton").disabled = true;
    document.getElementById("saveButton").disabled = true;
    document.getElementById("editButton").disabled = false;
}

// Carrega uma nova foto e a salva no Local Storage
document.getElementById("fileInput").addEventListener("change", function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const photoData = reader.result;
        document.getElementById("foto").src = photoData;

        // Atualiza o Local Storage automaticamente com a nova foto
        const profile = JSON.parse(localStorage.getItem("profile")) || {};
        profile.photo = photoData;
        localStorage.setItem("profile", JSON.stringify(profile));
    };
    reader.readAsDataURL(event.target.files[0]);
});
