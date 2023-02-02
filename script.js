window.onscroll = function() {scrollFunction()};
const navLinks = document.querySelectorAll(".link");

function scrollFunction() {
  if (document.body.scrollTop > 235 || document.documentElement.scrollTop > 235) {
    _.setCSS("#nav", "padding", "1vw 0.3vw");
   navLinks.forEach(navLinks => {
     navLinks.style.fontSize = "1.3vw"
   })
    _.setCSS("#logoMain", "height", "3vw");
  } else {
    _.setCSS("#nav", "padding", "10vw 0.5vw");
    navLinks.forEach(navLinks => {
     navLinks.style.fontSize = "2vw"
   })
    _.setCSS("#logoMain", "height", "15vw");
  }
}