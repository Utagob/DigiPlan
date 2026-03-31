const eventSection = document.getElementsByClassName("eventContainer")[0];
const addEventButton = document.getElementById("addEventButton");

document.addEventListener("DOMContentLoaded", loadEvents);

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

    eventSection.innerHTML = '';
    eventsArray.forEach(eventContent => {
        addEvent(eventContent);
    });
}

function saveEvents() {
    const events = Array.from(eventSection.children).map(event => {
        const eventDescription = event.querySelector('.eventDescription');
        return eventDescription ? eventDescription.innerText : '';
    });
    localStorage.setItem('events', JSON.stringify(events));
}

function addEvent(initialText = "Enter event description...") {
    let newEvent = document.createElement("div");
    newEvent.className = "event";

    let eventTime = document.createElement("div");
    eventTime.className = "eventTime";
    eventTime.innerText = "00:00"; 

    let eventDescription = document.createElement("div");
    eventDescription.className = "eventDescription";
    eventDescription.innerText = initialText;

    eventDescription.addEventListener("input", () => {
        saveEvents();
    });

    let deleteEvent= document.createElement("img");
    deleteEvent.id = "deleteEvent";
    deleteEvent.src = "/images/exit.png";

    deleteEvent.addEventListener("click", () => {
        eventSection.removeChild(newEvent);
        saveEvents();
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
});

