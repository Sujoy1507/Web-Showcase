const menuForMobileOpenClose = () => {
    const menuBtn = document.querySelector(".menu-icon #menu-btn");
    const menuForMobile = document.querySelector(".menu-btn");

    let flag = true;
    menuBtn.addEventListener("click", () => {
        if (flag === true) {
            menuForMobile.style.height = "fit-content";
            flag = false;
        } else {
            menuForMobile.style.height = 0;
            flag = true;
        }
    });
};
menuForMobileOpenClose();

const loginPageOpenClose = () => {
    const loginPage = document.querySelector(".login-popup");
    const getStart = document.querySelectorAll(".get-start");
    const loginWindow = document.querySelector(".login-window");
    const menuForMobile = document.querySelector(".menu-btn");

    getStart.forEach((btn) => {
        btn.addEventListener("click", () => {
            loginPage.style.display = "block";
            menuForMobile.style.height = 0;
        });
    });

    loginPage.addEventListener("click", () => {
        loginPage.style.display = "none";
    });

    loginWindow.addEventListener("click", (e) => {
        e.stopPropagation();
    });
};

loginPageOpenClose();


const loginDone = document.querySelectorAll('.login-done');
const firstPage= document.querySelector('.first-page');
const secondPage = document.querySelector('.second-page');

loginDone.forEach(btn=>{
    btn.addEventListener('click',()=>{
        secondPage.style.display='block'
        firstPage.style.display='none'
    })
})