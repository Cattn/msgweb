window.onscroll = function() {scrollFunction()};
const navLinks = document.querySelectorAll(".link");

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("nav").style.padding = "1vw 0.5vw";
   navLinks.forEach(navLinks => {
     navLinks.style.fo
   })
  } else {
    document.getElementById("nav").style.padding = "10vw 0.5vw";
  }
}