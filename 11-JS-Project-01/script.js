const allElems = document.querySelectorAll(".elem");
const allfullElemPage = document.querySelectorAll(".fullElem");
const fulPageBackBtn = document.querySelectorAll(".fullElem .back-container .container");

allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
        allfullElemPage[elem.id].style.display = "block";
    });
});


fulPageBackBtn.forEach(back=>{
    back.addEventListener('click',()=>{
        allfullElemPage[back.id].style.display = "none";
        
    })
})