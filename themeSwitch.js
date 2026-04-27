let currentState = true;
const changeTheme = document.getElementById('themeButton');
const themeState = document.getElementById('themeState');
const styleElement = document.getElementById('colorTheme');

function applyTheme(theme) {
  if (!styleElement || !themeState) {
    console.error("One or more elements are missing in the DOM.");
    return;
  }

  if (theme === 'night') {
    styleElement.href = "css/colourNight.css";
    themeState.src = 'images/sun.png';
    currentState = true;
  } else {
    styleElement.href = "css/colourDay.css";
    themeState.src = 'images/night.png';
    currentState = false;
  }
}

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme") || "day"; // Default to day theme
  applyTheme(savedTheme);
});

function switchTheme() {
  const newTheme = currentState ? "day" : "night";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

if (changeTheme) {
  changeTheme.addEventListener('click', switchTheme);
} else {
  console.error("Theme button is missing in the DOM.");
}