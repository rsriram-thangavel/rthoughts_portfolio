/*----------------------navigation menu--------------------*/

// (()=>{
//      const hamburgerbtn = document.querySelector(".hamburger-btn");
//      navmenu = document.querySelector(".nav-menu")
//      closenavbtn = navmenu.querySelector(".close-nav-menu");


//      hamburgerbtn.addEventListener("click",shownavmenu);
//      closenavbtn.addEventListener("click",hidenavmenu);



//      function shownavmenu(){
//        navmenu.classList.add("open");
//        bodyscrollingtoggle();
//      }

//      function hidenavmenu(){
//       navmenu.classList.remove("open");
//       fadeouteffect();
//       bodyscrollingtoggle();
//     }
//     function fadeouteffect(){
//       document.querySelector(".fade-out-effect").classList.add("active");
//       setTimeout(()=>{
//         document.querySelector(".fade-out-effect").classList.remove("active");

//       },300)
//     }
//     //  attach an event handler to document
//     document.addEventListener("click",(event)=>{
//     //     if(event.target.classList.contains('link-item')){
//     // //       //make sure event.target.hash has a value before overridding default behaviour
//     // //       if(event.target.hash !==""){
//     // //         // prevent default anchor click behavior
//     //          event.preventDefault();
//     //           // const hash=event.target.hash
//     //         //  console.log(hash)
//     //            //deactivate existing active 'section'
//     //           document.querySelector(".section.active").classList.add("hide");
//     //          document.querySelector(".section.active").classList.remove("active");
//     //         // //activate new section
//     //          document.querySelector(hash).classList.add("active");
//     //          document.querySelector(hash).classList.remove("hide");
//     //         //deactivate existing active navigation menu 'link-item'
//     //          navmenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
//     //          navmenu.querySelector(".active").classList.remove("active","inner-shadow");
//     //         //if clicked 'link-item' is contained within the navigation
//             if(navmenu.classList.contains("open")){
//     //         // //acivate new navigation menu 'link-item'
//                event.target.classList.add("active","inner-shadow");
//                 event.target.classList.remove("outer-shadow","hover-in-shadow");
           
//     //         //hide navigation menu
//                 //  hidenavmenu();
                
//     //         }
//     //         // else{
 
//     //         // }
//     //       }
//           // console.log("even.target contains 'link-item' class")
//         // }
//     //     // else{
//     //     //   console.log("event.target not contains 'link-item' class")
//         }
//     })
// })();




/*----------------------------about section tabs ------*/

(() => {
  const aboutsection = document.querySelector(".about-section"),
    tabscontainer = document.querySelector(".about-tabs");

  tabscontainer.addEventListener("click", (event) => {
    /* if event target contains 'tab-item' class and not contains
    'active class*/
    if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
      const target = event.target.getAttribute("data-target");
      //   deactivate existing active 'tab-item'
      tabscontainer.querySelector(".active").classList.remove("outer-shadow", "active");
      //activate new 'tab-item'
      event.target.classList.add("active", "outer-shadow");
      // deactivate existing active 'tab-content'
      aboutsection.querySelector(".tab-content.active").classList.remove("active");
      //activate new 'tab-content'
      aboutsection.querySelector(target).classList.add("active");
    }
  })
})();

function bodyscrollingtoggle() {
  document.body.classList.toggle("hidden-scrolling");
}

// console.log("event.target contains 'tab-item' class and not contains 'active' class")
//               console.log(event.target)


/*-----------------------portfolio filter and popup-------------------*/
(() => {
  const filtercontainer = document.querySelector(".portfolio-filter"),
    portfolioitemscontainer = document.querySelector(".portfolio-items"),
    portfolioitems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevbtn = popup.querySelector(".pp-prev"),
    nextbtn = popup.querySelector(".pp-next"),
    closebtn = popup.querySelector(".pp-close"),
    projectdetailscontainer = popup.querySelector(".pp-details"),
    projectdetailsbtn = popup.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;

  /* filter portfolio items */
  filtercontainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("filter-item") && !
      event.target.classList.contains("active")) {
      // deactivate existing active 'filter-items'
      filtercontainer.querySelector(".active").classList.remove("outer-shadow", "active");
      //activate new 'filter-item'
      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");
      portfolioitems.forEach((item) => {
        // console.log(item)
        // console.log(item.getAttribute("data-category"));
        if (target === item.getAttribute("data-category") || target === 'all') {
          item.classList.remove("hide");
          item.classList.add("show");
        }
        else {
          item.classList.remove("show");
          item.classList.add("hide")
        }
      })

    }
    // else{
    //   console.log("false")
    // }
    // console.log(event.target)
  })

  portfolioitemscontainer.addEventListener("click", (event) => {
    // console.log(event.target.closest(".portfolio-item-inner"))
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioitem = event.target.closest(".portfolio-item-inner").parentElement;
      //get the portfolioitem indes
      itemIndex = Array.from(portfolioitem.parentElement.children).indexOf(portfolioitem);
      // console.log(itemIndex);
      screenshots = portfolioitems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
      // console.log(screenshots)
      //convert screenshots into array
      screenshots = screenshots.split(",");
      // console.log(screenshots);
      if (screenshots.length === 1) {
        prevbtn.style.display = "none";
        nextbtn.style.display = "none";
      }
      else {
        prevbtn.style.display = "block";
        nextbtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupslideshow();
      popupdetails();
    }
  })

  closebtn.addEventListener("click", () => {
    popupToggle();
    if(projectdetailscontainer.classList.contains("active")){
      popupdetailstoggle();
    }
  })

  function popupToggle() {
    popup.classList.toggle('open');
    bodyscrollingtoggle();
  }

  function popupslideshow() {
    const imgsrc = screenshots[slideIndex];
    // console.log(imgsrc);
    const popupimg = popup.querySelector(".pp-img");
    //activate loader until the popupimg loaded
    popup.querySelector(".pp-loader").classList.add("active");
    popupimg.src = imgsrc;
    popupimg.onload = () => {
      //deactivate loader after the popupimg loaded
      popup.querySelector(".pp-loader").classList.remove("active")

    }
    popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " +
      screenshots.length;
  }

  //next slide
  nextbtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    }
    else {
      slideIndex++;
    }
    popupslideshow();
    // console.log("slideIndex:" + slideIndex);

  })

  //prev slide
  prevbtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1
    }
    else {
      slideIndex--;
    }
    popupslideshow()
    // console.log("slideIndex:" + slideIndex);
  })
  function popupdetails() {
    //if portfolio-item-details not exists
    if(!portfolioitems[itemIndex].querySelector(".protfolio-item-details")){
         projectdetailsbtn.style.display="none";
         return;/*end function execution*/
    }
    projectdetailsbtn.style.display="block";
    //get the project details
   
    const details = portfolioitems[itemIndex].querySelector(".protfolio-item-details").innerHTML;
   //set project details
    popup.querySelector(".pp-project-details").innerHTML = details;
    // get the project title
    const title = portfolioitems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
    console.log(title);
    popup.querySelector(".pp-title h2").innerHTML = title;
    //get the project category

    const category = portfolioitems[itemIndex].getAttribute("data-category");
    // console.log(category)
    //set the project category
    popup.querySelector(".pp-project-category").innerHTML = category.split("-").join("");
  }
  projectdetailsbtn.addEventListener("click", () => {
    popupdetailstoggle();
  })
  function popupdetailstoggle() {
    if (projectdetailscontainer.classList.contains("active")) {
      projectdetailsbtn.querySelector("i").classList.remove("fa-minus");
      projectdetailsbtn.querySelector("i").classList.add("fa-plus")
      // console.log(true);
      projectdetailscontainer.classList.remove("active");
      projectdetailscontainer.style.maxHeight = 0 + "px";
    }
    else {
      projectdetailsbtn.querySelector("i").classList.remove("fa-plus");
      projectdetailsbtn.querySelector("i").classList.add("fa-minus")
      // console.log(false)
      projectdetailscontainer.classList.add("active");
      projectdetailscontainer.style.maxHeight = projectdetailscontainer.
        scrollHeight + "px";
      popup.scrollTo(0, projectdetailscontainer.offsetTop);
    }
  }
})();


/*-------------hide all sections except active------------*/
// (()=>{
//    const sections = document.querySelector(".section");
//    sections.forEach((section) => {
//      if(!section.classList.contains("active")){
//        section.classList.add("hide")
       
//      }
//    })
// })();

window.addEventListener("load",()=>{
  //preloader
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() =>{
    document.querySelector(".preloader").style.display="none";
  },600)
})

