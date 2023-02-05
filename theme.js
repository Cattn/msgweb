const themeState = 1;

function themeValue(themeState) {
    if (themeState == 1) {
        document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    if (themeState == 2) {
        document.documentElement.setAttribute('data-theme', 'dark');
      
      localStorage.setItem('theme', 'dark');
    }
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
document.documentElement.setAttribute('data-theme', currentTheme);