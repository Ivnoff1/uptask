const mobileMenuBtn=document.querySelector("#mobile-menu"),cerrarMenuBtn=document.querySelector("#close-menu"),sidebar=document.querySelector(".sidebar-mobile");mobileMenuBtn&&mobileMenuBtn.addEventListener("click",(function(){sidebar.classList.add("show")})),cerrarMenuBtn&&cerrarMenuBtn.addEventListener("click",(function(){sidebar.classList.add("hide"),setTimeout((()=>{sidebar.classList.remove("show"),sidebar.classList.remove("hide")}),1e3)}));const anchoPantalla=document.body.clientWidth;window.addEventListener("resize",(function(){document.body.clientWidth>=768&&sidebar.classList.remove("show")}));