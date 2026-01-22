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

const firstPageToSecondPage = () => {
    const loginDone = document.querySelector(".next");
    const firstPage = document.querySelector(".first-page");
    const secondPage = document.querySelector(".secondPage-container");
    const userNameInput = document.querySelector(".login-window input");
    const userName = document.querySelector(".username");
    const nameFirst = document.querySelector(".name-first");

    loginDone.addEventListener("click", () => {
        secondPage.style.display = "flex";
        firstPage.style.display = "none";
        nameFirst.textContent = userNameInput.value[0];
        userName.textContent = userNameInput.value;
    });

    //Second paga Work

    const userSideMenubtn = document.querySelector("#user-sidebar-menu-btn");
    const userSideMenu = document.querySelector(".user-menu-side-bar");

    let flag = true;
    userSideMenubtn.addEventListener("click", () => {
        if (flag) {
            userSideMenu.style.display = "block";

            flag = false;
        } else {
            userSideMenu.style.display = "none";
            flag = true;
        }
    });
};

firstPageToSecondPage();
