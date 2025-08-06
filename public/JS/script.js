const toggler = document.querySelector(".btn");
toggler.addEventListener("click",function(){
    document.querySelector("#sidebar").classList.toggle("collapsed");
    document.querySelector("#index").classList.toggle("side");
    // const nome = localStorage.getItem('name')
    // const user = document.getElementById("usuario")
    // user.innerHTML= nome
});

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    // Carrega preferência do usuário
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.setAttribute('data-bs-theme', 'dark'); // Bootstrap
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.setAttribute('data-bs-theme', 'light'); // Bootstrap
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        document.body.setAttribute('data-bs-theme', isDark ? 'dark' : 'light'); // Bootstrap
        if(isDark) {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
});

