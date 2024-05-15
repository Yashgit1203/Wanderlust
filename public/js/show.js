// Nav- modes
let mode_ch = document.querySelector(".nav-change-mode");
let nav =document.querySelector(".navbar");
let navlink =document.querySelectorAll(".navbar-nav .nav-link");
let card =document.querySelectorAll(".card");
let navcollapse =document.querySelector(".navbar-collapse ");
 
let element = document.body;
mode_ch.addEventListener("click",()=>{
    element.classList.toggle("dark-mode");
    if(mode_ch.classList.length == 1){
        mode_ch.classList.add("nav-change-day");
        mode_ch.children[0].classList.remove("fa-moon");
        mode_ch.children[0].classList.add("fa-sun");
        nav.style.backgroundColor = "black";
        navlink.forEach((nav)=>{
            nav.style.cssText = "color:white !important";
        })
        card.forEach((car)=>{
            car.style.backgroundColor = "black";
            car.style.color = "white";
        })
        navcollapse.style.backgroundColor = "black";
    }
    else{
        mode_ch.classList.remove("nav-change-day");
        mode_ch.children[0].classList.remove("fa-sun");
        mode_ch.children[0].classList.add("fa-moon");
        nav.style.backgroundColor = "white";
        navlink.forEach((nav)=>{
            nav.style.cssText = "color:black !important";
        })
        card.forEach((car)=>{
            car.style.backgroundColor = "white";
            car.style.color = "black";
        })
        navcollapse.style.backgroundColor = "white";
    }
})