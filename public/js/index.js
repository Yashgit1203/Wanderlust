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
