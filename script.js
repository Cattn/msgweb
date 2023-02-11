window.onscroll = function() {scrollFunction()};
const navLinks = document.querySelectorAll(".link");

function scrollFunction() {
  if (document.body.scrollTop > 235 || document.documentElement.scrollTop > 235) {
    _.setCSS("#nav", "padding", "2.5vw 0.3vw");
   navLinks.forEach(navLinks => {
     navLinks.style.fontSize = "1.3vw"
   })
    _.setCSS("#logoMain", "height", "5vw");

    // Set Media Sizes 
    _.setCSS("#mediaPlayerOuter", "margin-bottom", "1vh");
    _.setCSS("#mediaPlayerOuter", "margin-left", "50vw");

    _.setCSS("#mediaPlayerOuter", "height", "11vh");
    _.setCSS("#mediaPlayerOuter", "width", "20vw");

    _.setCSS("#mediaPlayerWrap", "margin-top", "4vh");

    _.setCSS("#backArrow", "height", "3vw");
    _.setCSS("#backArrow", "width", "3vw");
    _.setCSS("#backArrow", "border-radius", "1vh");

    _.setCSS("#pause", "height", "3vw");
    _.setCSS("#pause", "width", "3vw");
    _.setCSS("#pause", "border-radius", "1vh");

    _.setCSS("#forwardArrow", "height", "3vw");
    _.setCSS("#forwardArrow", "width", "3vw");
    _.setCSS("#forwardArrow", "border-radius", "1vh");

    // Set Quick Setting Sizes
    _.setCSS("#quickSettingsOuter", "margin-top", "0vh");
    _.setCSS("#quickSettingsOuter", "margin-left", "75vw");


    _.setCSS("#quickSettingsOuter", "height", "11vh");
    _.setCSS("#quickSettingsOuter", "width", "20vw");

    _.setCSS("#quickSettingsWrap", "margin-top", "1.5vh");

    _.setCSS("#themeSwitch", "height", "4vw");
    _.setCSS("#themeSwitch", "width", "4vw");
    _.setCSS("#themeSwitch", "border-radius", "1vh");
    _.setCSS("#themeSwitch", "margin-right", "2vw");

    _.setCSS("#reloadSwitch", "height", "4vw");
    _.setCSS("#reloadSwitch", "width", "4vw");
    _.setCSS("#reloadSwitch", "border-radius", "1vh");
    _.setCSS("#reloadSwitch", "margin-right", "2vw");

    _.setCSS("#fullScreenSwitch", "height", "4vw");
    _.setCSS("#fullScreenSwitch", "width", "4vw");
    _.setCSS("#fullScreenSwitch", "border-radius", "1vh");
    _.setCSS("#fullScreenSwitch", "margin-right", "2vw");
  } else {
    _.setCSS("#nav", "padding", "10vw 0.5vw");
    navLinks.forEach(navLinks => {
     navLinks.style.fontSize = "2vw"
   })
    _.setCSS("#logoMain", "height", "15vw");

    // Re-size Media
    _.setCSS("#mediaPlayerOuter", "margin-bottom", "20vh");
    _.setCSS("#mediaPlayerOuter", "margin-left", "70vw");

    _.setCSS("#mediaPlayerWrap", "margin-top", "9vh");

    _.setCSS("#mediaPlayerOuter", "height", "18vh");
    _.setCSS("#mediaPlayerOuter", "width", "23vw");

    _.setCSS("#backArrow", "height", "4vw");
    _.setCSS("#backArrow", "width", "4vw");
    _.setCSS("#backArrow", "border-radius", "2vh");

    _.setCSS("#pause", "height", "4vw");
    _.setCSS("#pause", "width", "4vw");
    _.setCSS("#pause", "border-radius", "2vh");

    _.setCSS("#forwardArrow", "height", "4vw");
    _.setCSS("#forwardArrow", "width", "4vw");
    _.setCSS("#forwardArrow", "border-radius", "2vh");

    // Re-Size Quick Setting Sizes
    _.setCSS("#quickSettingsOuter", "margin-top", "22vh");
    _.setCSS("#quickSettingsOuter", "margin-left", "70vw");


    _.setCSS("#quickSettingsOuter", "height", "18vh");
    _.setCSS("#quickSettingsOuter", "width", "23vw");

    _.setCSS("#quickSettingsWrap", "margin-top", "3vh");

    _.setCSS("#themeSwitch", "height", "6vw");
    _.setCSS("#themeSwitch", "width", "6vw");
    _.setCSS("#themeSwitch", "border-radius", "2vh");
    _.setCSS("#themeSwitch", "margin-right", "1vw");

    _.setCSS("#reloadSwitch", "height", "6vw");
    _.setCSS("#reloadSwitch", "width", "6vw");
    _.setCSS("#reloadSwitch", "border-radius", "2vh");
    _.setCSS("#reloadSwitch", "margin-right", "1vw");

    _.setCSS("#fullScreenSwitch", "height", "6vw");
    _.setCSS("#fullScreenSwitch", "width", "6vw");
    _.setCSS("#fullScreenSwitch", "border-radius", "2vh");
    _.setCSS("#fullScreenSwitch", "margin-right", "1vw");
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
   !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
     if (document.cancelFullScreen) {
        document.cancelFullScreen();
     } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
     } else if (document.webkitCancelFullScreen) {
       document.webkitCancelFullScreen();
     }
  }
}


function reloadSite () {
  location.reload();
}

function darkLightSwitch() {
  if (document.documentElement.getAttribute('data-theme') == 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
}