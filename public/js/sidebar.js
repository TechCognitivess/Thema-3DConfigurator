

/*=============== SHOW SIDEBAR ===============*/
const showSidebar = (toggleButton, toggleId, sidebarId, mainId, footerId) =>{
   const toggle = document.getElementById(toggleId),
   sidebar = document.getElementById(sidebarId),
   main = document.getElementById(mainId),
   footer = document.getElementById(footerId),
   toggleView = document.getElementById(toggleButton)

   if(toggle && sidebar && main && footer && toggleView){
       toggle.addEventListener('click', ()=>{
           /* Show sidebar */
           sidebar.classList.toggle('show-sidebar')
           /* Add padding main */
           main.classList.toggle('main-pd')
           footer.classList.toggle('footer-sec-pd')
       })
       toggleView.addEventListener('click', ()=>{
        /* Show sidebar */

        sidebar.classList.toggle('show-sidebar')
        /* Add padding main */
        main.classList.toggle('main-pd')
        footer.classList.toggle('footer-sec-pd')
        toggleView.classList.toggle('rotate-button');
    })
   }

}
showSidebar("toggleButton", 'header-toggle','sidebar', 'main', "footer")

/*=============== LINK ACTIVE ===============*/
const sidebarLink = document.querySelectorAll('.sidebar__link')

function linkColor(){
    sidebarLink.forEach(l => l.classList.remove('active-link'))
    this.classList.add('active-link')
}

sidebarLink.forEach(l => l.addEventListener('click', linkColor))