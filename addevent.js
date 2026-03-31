const eventSection = document.getElementsByClassName("eventContainer")[0];
const addEventButton = document.getElementById("addEventButton");


function addEvent() {
    let newEvent = document.createElement("div");
    newEvent.id = "event";

    let eventTime = document.createElement("div");
    eventTime.id = "eventTime";
    eventTime.innerText = "00:00"; 

    let eventDescription = document.createElement("div");
    eventDescription.id = "eventDescription";

    let deleteEvent= document.createElement("img");
    deleteEvent.id = "deleteEvent";
    deleteEvent.src = "/images/exit.png";

    deleteEvent.addEventListener("click", () => {
        eventSection.removeChild(newEvent);
    });

    eventDescription.setAttribute('contenteditable', 'true');

    newEvent.appendChild(eventTime);
    newEvent.appendChild(eventDescription);
    eventDescription.appendChild(deleteEvent);
    eventSection.appendChild(newEvent);
}

addEventButton.addEventListener("click", () =>{
    addEvent();
    //save event to local storage
});

