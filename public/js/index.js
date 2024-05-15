let taxswitch = document.getElementById("flexSwitchCheckDefault");

let cprices = document.querySelectorAll(".card-price");
const arrs=[];
  for(cprice of cprices){
    arrs.push(cprice.textContent)
  }
taxswitch.addEventListener("click", () => {
  
  cprices.forEach(cardprice => {
    // Conversion from local string to number
    const formattedNumber = cardprice.textContent; 

    // Remove commas from the formatted number
    const unformattedNumber = formattedNumber.replace(/,/g, '');

    let number = parseInt(unformattedNumber);

    let amt_gst = (number * 18) / 100;
    let total_amt=0;
    if (taxswitch.checked) {
      total_amt = number + amt_gst;
    } else {
      for(let i=0;i<arrs.length;i++){
        cprices[i].textContent=arrs[i];
      }      
    }
    
    // Conversion from number to local String
    let converted_amt = total_amt.toLocaleString("en-IN");
    // Reflecting changes
    cardprice.textContent = converted_amt;
  });
});


  let scrollLeftbtn = document.querySelector(".scroll-left-btn");
  let scrollRightbtn = document.querySelector(".scroll-right-btn");
  let scrollElement = document.getElementById("filter");
  let scrollRightDiv = document.querySelector(".nav-right");
  let scrollLeftDiv = document.querySelector(".nav-left");

  scrollLeftbtn.addEventListener("click",()=>{
    console.log("btn clicked");
    scrollElement.scrollLeft -= 65;
    
  })
  scrollRightbtn.addEventListener("click",()=>{
    scrollElement.scrollLeft += 65;
  })

  scrollElement.addEventListener("scroll",(ele)=>{
    let maxScrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;
    if(scrollElement.scrollLeft == 0){
      scrollLeftDiv.style.display = "none";
    }
    else{
      scrollLeftDiv.style.display = "flex";
    }

    
    if(maxScrollLeft == Math.ceil(scrollElement.scrollLeft)){
      scrollRightDiv.style.display = "none";
    }
    else{
      scrollRightDiv.style.display = "flex";
    }
  })

  if(scrollElement.scrollLeft == 0){
      scrollLeftDiv.style.display = "none";
  }
  else{
    scrollLeftDiv.style.display = "flex";
  }

  let mode_ch = document.querySelector(".nav-change-mode");
        let nav =document.querySelector(".navbar");
        let nav2 =document.querySelector(".nav2");
        let nav2left =document.querySelector(".nav2 .nav-left");
        let nav2right =document.querySelector(".nav2 .nav-right");
        let navlink =document.querySelectorAll(".navbar-nav .nav-link");
        let navcollapse =document.querySelector(".navbar-collapse ");
        let card =document.querySelectorAll(".card");
        let element = document.body;
        mode_ch.addEventListener("click",()=>{
            element.classList.toggle("dark-mode");
            if(mode_ch.classList.length == 1){
                mode_ch.classList.add("nav-change-day");
                mode_ch.children[0].classList.remove("fa-moon");
                mode_ch.children[0].classList.add("fa-sun");
                nav.style.backgroundColor = "black";
                nav2.style.backgroundColor = "black";
                nav2left.style.backgroundColor = "black";
                nav2left.style.boxShadow = "12px 2px 7px black";
                nav2right.style.backgroundColor = "black";
                
                nav2right.style.boxShadow = "-12px 2px 7px black";
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
                nav2.style.backgroundColor = "white";
                nav2left.style.backgroundColor = "white";
                nav2left.style.boxShadow = "12px 2px 7px white";
                nav2right.style.backgroundColor = "white";
                nav2right.style.boxShadow = "-12px 2px 7px white";
                navlink.forEach((nav)=>{
                  nav.style.cssText = "color:black !important";
                })
                card.forEach((car)=>{
                  car.style.backgroundColor = "white";
                  car.style.color = "black";
                })
                navcollapse.style.backgroundColor = "white";
              }
        });