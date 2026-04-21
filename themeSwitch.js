let currentState = true;
let changeTheme = document.getElementById('themeButton');

window.addEventListener("load", () => {
  const theme = localStorage.getItem("theme");
  console.log("theme: ", theme);

  const themeState = document.getElementById('themeState');
  const styleElement = document.getElementById('colorTheme');

  if (!themeState || !styleElement) {
    console.error("One or more elements are missing in the DOM.");
    return;
  }

  if (theme === 'night') {
    styleElement.href = "colorNight.css";
    themeState.src = 'images/sun.png';
  } else {
    styleElement.href = "colorDay.css";
    themeState.src = 'images/night.png';
  }
});

function switchTheme() {
    if (currentState) {
        document.getElementById('colorTheme').href = "colorNight.css";
        document.getElementById('themeState').src='images/sun.png';
        localStorage.setItem("theme", "night");
    } 
    else{
        document.getElementById('colorTheme').href = "colorDay.css";
        document.getElementById('themeState').src='images/night.png';
        localStorage.setItem("theme", "day");
    }
    currentState = !currentState;
}

if (changeTheme) {
    changeTheme.addEventListener('click', switchTheme);
}