const windowButton = document.querySelector(".windows-bttn");
const windowScreen = document.querySelector(".windowScreen");


//opening closing window
let isWindow = true;
windowButton.addEventListener("click", () => {
    if (isWindow) {
        windowScreen.style.transform = "translate(-50%,-50%)";
        isWindow = false;
    } else {
        windowScreen.style.transform = "translate(-50%,60%)";
        isWindow = true;
    }
});



//Inside Window






//right-click-menu
const rightClick = document.querySelector('.right-click-menu')

document.addEventListener('contextmenu',(event)=>{
    event.preventDefault()
    rightClick.style.display='flex'
    rightClick.style.top=event.clientY+'px'
    rightClick.style.left=event.clientX+'px'
    rightClick.style.flexDirection= "column";
    rightClick.style.justifyContent= "space-between";
})
document.addEventListener('click',(event)=>{
    rightClick.style.display='none'
    
})



