const currentTime = "https://time.now/developer/api/timezone/Europe/Chisinau";

const headerSection = document.querySelector("#headerText");
const calendarDisplay = document.querySelector(".calendarDisplay");
const dayDisplay = document.querySelector(".dayDisplay");
const icon = document.querySelector(".calendar-icon");
const input = document.querySelector("#monthInput");
let previousSelectedCell = null;
let previousSelectedDay = null;
let currentYear, currentMonth;
let selectedDate = null;

const months = ["January", "February","March","April","May","June","July","August","September","October","November","December"]

input.addEventListener("input", () => {
    let value = input.value;
    let year = parseInt(value.substr(0, 4));
    let monthIndex = parseInt(value.substr(5, 2)) - 1;
    currentYear = year;
    currentMonth = monthIndex;
    previousSelectedDay = null;
    previousSelectedCell = null;
    selectedDate = null;
    generateCalendar(year, monthIndex);
});

function updateSelectedDate() {
    if (previousSelectedDay !== null && currentYear !== undefined && currentMonth !== undefined) {
        const month = String(currentMonth + 1).padStart(2, '0');
        const day = String(previousSelectedDay).padStart(2, '0');
        selectedDate = `${currentYear}-${month}-${day}`;
        dayDisplay.innerHTML = `Plans for  ${months[currentMonth]} ${previousSelectedDay}, ${currentYear}`;
        
    } else {
        selectedDate = null;
    }
}

function generateCalendar(year, month) {
    calendarDisplay.innerHTML = '';
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const dateCell = document.createElement("div");
        dateCell.className = "calendarDate";
        dateCell.innerHTML = `<p>${i}</p>`;
        calendarDisplay.appendChild(dateCell);
    }
    if (previousSelectedDay <= daysInMonth) {
        const cells = calendarDisplay.querySelectorAll('.calendarDate');
        for (let cell of cells) {
            if (parseInt(cell.querySelector('p').innerHTML) === previousSelectedDay) {
                cell.id = 'calendarDateselected';
                previousSelectedCell = cell;
                break;
            }
        }
    }
}

calendarDisplay.addEventListener("click", (event) => {
    const clickedCell = event.target.closest(".calendarDate");
    if (!clickedCell || !calendarDisplay.contains(clickedCell)) {
        return;
    }

    if (previousSelectedCell === clickedCell) {
        clickedCell.removeAttribute("id");
        previousSelectedCell = null;
        previousSelectedDay = null;
        selectedDate = null;
        return;
    }

    if (previousSelectedCell) {
        previousSelectedCell.removeAttribute("id");
    }

    clickedCell.id = "calendarDateselected";
    previousSelectedCell = clickedCell;
    previousSelectedDay = parseInt(clickedCell.querySelector('p').innerHTML);
    updateSelectedDate();
});

document.addEventListener("click", (event) => {
    if (previousSelectedCell && !event.target.closest(".calendarDate")) {
        previousSelectedCell.removeAttribute("id");
        previousSelectedCell = null;
        previousSelectedDay = null;
        selectedDate = null;
    }
});

fetch(currentTime)
    .then(res => res.json())
    .then(data => {
    let time = data.datetime;
    
    let year = parseInt(time.substr(0, 4));
    let monthIndex = parseInt(time.substr(5, 2)) - 1;
    currentYear = year;
    currentMonth = monthIndex;
    input.value = time.substr(0, 7);
    generateCalendar(year, monthIndex);

    let currentDay = parseInt(time.substr(8, 2));
    headerSection.innerHTML = `Today is  ${months[currentMonth]} ${currentDay}, ${currentYear}`;
    previousSelectedDay = currentDay;
    const cells = calendarDisplay.querySelectorAll('.calendarDate');
    for (let cell of cells) {
        if (parseInt(cell.querySelector('p').innerHTML) === currentDay) {
            cell.id = 'calendarDateselected';
            previousSelectedCell = cell;
            break;
        }
    }
    updateSelectedDate();
});

