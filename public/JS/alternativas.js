//Seleção de elementos
const alternativeForm = document.querySelector("#alternative-form");
const alternativeInput = document.querySelector("#alternative-input");
const alternativeList = document.querySelector("#alternative-list");
const correta = document.getElementsByClassName(".correct-alternative")

//let oldInputValue;

//Funções

const saveAlternative = (text) => {
    
    const alternative = document.createElement("div");
    alternative.classList.add("alternative");
    const alternativeTitle = document.createElement("h3");
    alternativeTitle.innerText = text;
    alternative.appendChild(alternativeTitle);

    const correctBtn = document.createElement("button")
    correctBtn.id = 'opcao-correta'
    correctBtn.classList.add("correct-alternative")
    correctBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    alternative.appendChild(correctBtn)

    // const editBtn = document.createElement("button")
    // editBtn.classList.add("edit-alternative")
    // editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    // alternative.appendChild(editBtn)
    
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-alternative")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    alternative.appendChild(deleteBtn)

    console.log(correta)

    alternativeList.appendChild(alternative)
    alternativeInput.value = "";
    alternativeInput.focus();

};
// const updateA = (text) => {

//     const alternatives = document.querySelectorAll(".alternative")

//     alternatives.forEach((alternative) => {

//         let alternativeTitle = alternative.querySelector("h3")

//         if(alternativeTitle.innerText === oldInputValue) {
//             alternative.innerText = text;
//         }
//     })

// } 

const toggleForms = () => {
    editForm.classList.toggle("hide")
    alternativeForm.classList.toggle("hide")
    alternativeList.classList.toggle("hide")
};
//Eventos
 alternativeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = alternativeInput.value;

    if(inputValue) {
       saveAlternative(inputValue)
    }
 })
document.addEventListener("click", (e) => {
    const targetE1 = e.target
    const parentE1 = targetE1.closest("div");
    let alternativeTitle;


    if(parentE1 && parentE1.querySelector("h3")) {
        alternativeTitle = parentE1.querySelector("h3").innerText;
    }

    if(targetE1.classList.contains("correct-alternative")) {
        parentE1.classList.toggle("correct");
    }

    if(targetE1.classList.contains("remove-alternative")) {
        parentE1.remove();
    }
    // if(targetE1.classList.contains("edit-alternative")) {
    //     toggleForms()
    // }
    // editInput.value = alternativeTitle;
    // oldInputValue = alternativeTitle;
})

//      
// editForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const editInputValue = editInput.value;

//     if (editInputValue) {
//         updateA(editInputValue);
//     }
//     toggleForms();
// });