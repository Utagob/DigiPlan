const calendarDisplay = document.querySelector(".calendarDisplay");
let previousSelectedCell = null;

for (let i = 1; i <= 31; i++) {
    const dateCell = document.createElement("div");
    dateCell.className = "calendarDate";
    dateCell.innerHTML = `<p>${i}</p>`;
    calendarDisplay.appendChild(dateCell);
}

calendarDisplay.addEventListener("click", (event) => {
    const clickedCell = event.target.closest(".calendarDate");
    if (!clickedCell || !calendarDisplay.contains(clickedCell)) {
        return;
    }

    if (previousSelectedCell === clickedCell) {
        clickedCell.removeAttribute("id");
        previousSelectedCell = null;
        return;
    }

    if (previousSelectedCell) {
        previousSelectedCell.removeAttribute("id");
    }

    clickedCell.id = "calendarDateselected";
    previousSelectedCell = clickedCell;
});

document.addEventListener("click", (event) => {
    if (previousSelectedCell && !event.target.closest(".calendarDate")) {
        previousSelectedCell.removeAttribute("id");
        previousSelectedCell = null;
    }
});