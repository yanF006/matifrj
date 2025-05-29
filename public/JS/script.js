const toggler = document.querySelector(".btn");
toggler.addEventListener("click",function(){
    document.querySelector("#sidebar").classList.toggle("collapsed");
    document.querySelector("#index").classList.toggle("side");
    // const nome = localStorage.getItem('name')
    // const user = document.getElementById("usuario")
    // user.innerHTML= nome
});