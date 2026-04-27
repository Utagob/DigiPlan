function openPopup() {
  const popup = document.getElementById('eventPopup');
  const timeInput = document.getElementById('eventTime');
  const descInput = document.getElementById('eventDescription');

  if (!popup) return;

  timeInput.value = '';
  descInput.value = '';

  popup.classList.remove('hidden');
  requestAnimationFrame(() => popup.classList.add('visible'));

  timeInput.focus();
}

function closePopup() {
  const popup = document.getElementById('eventPopup');
  if (!popup) return;

  popup.classList.remove('visible');

  popup.addEventListener('transitionend', () => {
    popup.classList.add('hidden');
  }, { once: true });
}

function handleSave() {
  const time = document.getElementById('eventTime').value.trim();
  const description = document.getElementById('eventDescription').value.trim();

  if (!description) {
    const descInput = document.getElementById('eventDescription');
    descInput.focus();
    descInput.classList.add('input-error');
    setTimeout(() => descInput.classList.remove('input-error'), 800);
    return;
  }

  const currentDate = localStorage.getItem('selectedDate');

  addEvent(currentDate, description, time);
  filterEventsByDate();

  if (typeof generateCalendar === 'function') {
    generateCalendar(currentYear, currentMonth);
  }

  closePopup();
}

document.addEventListener('keydown', (e) => {
  const popup = document.getElementById('eventPopup');
  if (!popup || popup.classList.contains('hidden')) return;

  if (e.key === 'Escape') closePopup();
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleSave();
});


document.getElementById('eventPopup')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('eventPopup')) closePopup();
});


document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('eventPopup');
  if (popup) popup.classList.add('hidden');

  document.getElementById('addEventButton')?.addEventListener('click', openPopup);
  document.getElementById('saveEventButton')?.addEventListener('click', handleSave);
  document.getElementById('cancelEventButton')?.addEventListener('click', closePopup);
});