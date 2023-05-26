console.log("conectado")
///////// FIREBASE /////////

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ1EURIBlm6ZrhzXd7peNNf2fb-CQfOBA",
  authDomain: "ps-database.firebaseapp.com",
  projectId: "ps-database",
  storageBucket: "ps-database.appspot.com",
  messagingSenderId: "1062406476119",
  appId: "1:1062406476119:web:0895126bd3155ec6b3ae12",
  measurementId: "G-VD40KQCKW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

///////// HAMBURGUER /////////

function hamburguer() {
  let x = document.getElementById("ham-hidden");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }

  let y = document.getElementById("ham-buttons");
  if (y.style.display === "flex") {
    y.style.display = "none";
  } else {
    y.style.display = "flex";
  }
}

///////// RESPONSIVE //////////

const tablet = 768;
const desktop = 1000;

let screenSize = ''

setScreenSize()

if (screenSize === 'mobile') {
    alertaMobile()
}

window.addEventListener('resize', () => setScreenSize())

function setScreenSize() {

    if (window.innerWidth < tablet) {
        screenSize = 'mobile'
    } else if (window.innerWidth >= tablet && window.innerWidth < desktop) {
        screenSize = 'tablet'
    } else if (window.innerWidth > desktop) {
        screenSize = 'desktop'
    }

    console.log(screenSize)

}

function alertaMobile() {
    alert('This page is better in desktop format')
}

///////// SWIPER ///////////

const swiper = new Swiper(".swiper-hero", {
    // Optional parameters
    slidesPerView: "3",
    // spaceBetween: 15,
     slidesPerGroupAuto: true,

    direction: "horizontal",
    loop: true,
    // allowTouchMove: true,
    effect: "cube",
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    },

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      // type: "progressbar"
      clickable: true,
      // dynamicBullets: true
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    // scrollbar: {
    //   el: ".swiper-scrollbar",
    //   draggable: true,
    // },
  });


  ////// CARROUSEL ///////

  
window.addEventListener('load', function(){
	new Glider(document.querySelector('.carousel__lista'), {
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: '.carousel__indicadores',
		arrows: {
			prev: '.carousel__anterior',
			next: '.carousel__siguiente'
		},
		responsive: [
			{
			  // screens greater than >= 775px
			  breakpoint: 450,
			  settings: {
				// Set to `auto` and provide item width to adjust to viewport
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},{
			  // screens greater than >= 1024px
			  breakpoint: 800,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			  }
			}
		]
	});
});
