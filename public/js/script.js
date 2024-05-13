// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  // Navbar

  let btns = document.querySelector(".nav-buttons");
        btns.addEventListener("click",()=>{
            
            if(btns.children[1].classList.length == 2){
                btns.children[0].classList.add("nav-btn-1");
                btns.children[1].classList.add("nav-btn-2");
                btns.children[2].classList.add("nav-btn-3");
                
                btns.children[0].classList.remove("nav-btn-1i");
                btns.children[2].classList.remove("nav-btn-3i");
                btns.children[0].classList.remove("nav-btn-1-next");
                btns.children[2].classList.remove("nav-btn-3-next");
            }
            else{
                btns.children[0].classList.remove("nav-btn-1");
                btns.children[1].classList.remove("nav-btn-2");
                btns.children[2].classList.remove("nav-btn-3");
                
                btns.children[0].classList.add("nav-btn-1-next");
                btns.children[2].classList.add("nav-btn-3-next");
            }
        })