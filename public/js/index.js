let taxswitch = document.getElementById("flexSwitchCheckDefault");
  taxswitch.addEventListener("click",()=>{
    let taxicons = document.getElementsByClassName("tax-icon");
    for (taxicon of taxicons){
      if(taxicon.style.display != "inline"){
        taxicon.style.display = "inline";
      }
      else{
        taxicon.style.display = "none";
      }

    }
  })

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
