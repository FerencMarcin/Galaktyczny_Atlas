/*!
* Start Bootstrap - Agency v7.0.0 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    // const mainNav = document.body.querySelector('#mainNav');
    // if (mainNav) {
    //     new bootstrap.ScrollSpy(document.body, {
    //         target: '#mainNav',
    //         offset: 74,
    //     });
    // };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// light/dark mode

let dakrMode = sessionStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("#ModeBtn");

const enableDarkMode = function () {
   document.body.classList.add("darkMode");
  sessionStorage.setItem("darkMode", "ON");
};

const disableDarkMode = function () {
  document.body.classList.remove("darkMode");
  sessionStorage.setItem("darkMode", null);
};

if (dakrMode === "ON") {
  enableDarkMode();
}

darkModeToggle.addEventListener("click", function () {
  dakrMode = sessionStorage.getItem("darkMode");
  if (dakrMode !== "ON") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

// size of cart 

class Cart1 {
  static getCart() {
      var ca = JSON.parse(sessionStorage.getItem('cart'));
      if (ca === null || ca === undefined) Cart1.cart = [];
      else Cart1.cart = ca;

      var IiC = JSON.parse(sessionStorage.getItem('itemsInCart'));
      if (IiC === null || IiC === undefined) Cart1.Item_inCart = [0,0,0,0,0,0,0,0];
      else Cart1.Item_inCart = IiC;

      var QiC = JSON.parse(sessionStorage.getItem('quantityOfItems'));
      if (QiC === null || QiC === undefined) Cart1.Quantity_inCart = [0,0,0,0,0,0,0,0];
      else Cart1.Quantity_inCart = QiC;
  }
}

document.addEventListener("DOMContentLoaded", () => { 
  Cart1.getCart();
  setSizeOfCart();

  function setSizeOfCart() {
    pill = document.querySelector('#sizeOfCart')
    let size = 0;
    for (let i = 0; i < Cart1.Item_inCart.length; i++) {
        size += Cart1.Item_inCart[i]*Cart1.Quantity_inCart[i];
    }
    if(!size){
        pill.innerHTML = size;
        pill.style.visibility = "hidden"
    } else {
        pill.style.visibility = "visible"
        pill.innerHTML = size;
    }
}
});