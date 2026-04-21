const eventSection = document.getElementsByClassName("eventContainer")[0];
const addEventButton = document.getElementById("addEventButton");

document.addEventListener("DOMContentLoaded", () => {
    loadEvents();
});

function loadEvents() {
    const savedEvents = localStorage.getItem('events');
    let eventsArray = [];

    if (savedEvents) {
        try {
            eventsArray = JSON.parse(savedEvents);
        } catch (error) {
            console.error("Error parsing events from localStorage:", error);
        }
    }

    const savedTime = localStorage.getItem('time');
    let timeArray = [];

    if (savedTime) {
        try {
            timeArray = JSON.parse(savedTime);
        } catch (error) {
            console.error("Error parsing time from localStorage:", error);
        }
    }

    eventSection.innerHTML = '';
    eventsArray.forEach((eventContent, index) => {
        addEvent(eventContent, timeArray[index] || "00:00");
    });

}


function saveEvents() {
    const events = Array.from(eventSection.children).map(event => {
        const eventDescription = event.querySelector('.eventDescription');
        return eventDescription ? eventDescription.innerText : '';
    });
    localStorage.setItem('events', JSON.stringify(events));
}

function saveTime() {
    const timeArray = Array.from(eventSection.querySelectorAll('.eventTime')).map(input => {
    return input.value;
    });
    localStorage.setItem('time', JSON.stringify(timeArray));
}



function addEvent(initialText = "Enter event description...", initialTime = "00:00") {
    let newEvent = document.createElement("div");
    newEvent.className = "event";

    let eventTime = document.createElement("input");
    eventTime.type = "time";
    eventTime.className = "eventTime";
    eventTime.value = initialTime;
    eventTime.addEventListener("input", () => {
        saveTime();
    });

    let eventDescription = document.createElement("div");
    eventDescription.className = "eventDescription";
    eventDescription.innerText = initialText;

    eventDescription.addEventListener("input", () => {
        saveEvents();
    });

    let deleteEvent= document.createElement("img");
    deleteEvent.id = "deleteEvent";
    deleteEvent.src = "images/exit.png";

    deleteEvent.addEventListener("click", () => {
        eventSection.removeChild(newEvent);
        saveEvents();
        saveTime();
    });

    eventDescription.setAttribute('contenteditable', 'true');

    newEvent.appendChild(eventTime);
    newEvent.appendChild(eventDescription);
    eventDescription.appendChild(deleteEvent);
    eventSection.appendChild(newEvent);
}

addEventButton.addEventListener("click", () =>{
    addEvent();
    saveEvents();
    saveTime();
});

