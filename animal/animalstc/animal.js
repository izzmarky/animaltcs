// Interactive menu for animaltradingcards.html

// Create the menu container
const menu = document.createElement('div');
menu.style.position = 'fixed';
menu.style.top = '20px';
menu.style.right = '20px';
menu.style.background = 'rgba(255,255,255,0.95)';
menu.style.border = '2px solid #888';
menu.style.borderRadius = '12px';
menu.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
menu.style.padding = '18px 24px';
menu.style.zIndex = '1000';
menu.style.fontFamily = 'sans-serif';

// Menu title
const title = document.createElement('div');
title.textContent = 'Animal Cards Menu';
title.style.fontWeight = 'bold';
title.style.marginBottom = '12px';
title.style.textAlign = 'center';
menu.appendChild(title);

// Card options
const animals = [
  { name: 'Bottlenose Dolphin', selector: '.card1' },
  { name: 'Bengal Tiger', selector: '.card2' },
  { name: 'Peregrine Falcon', selector: '.card3' },
  { name: 'Freshwater Crocodile', selector: '.card4' }
];

// Create menu buttons
animals.forEach(animal => {
  const btn = document.createElement('button');
  btn.textContent = animal.name;
  btn.style.display = 'block';
  btn.style.width = '100%';
  btn.style.margin = '6px 0';
  btn.style.padding = '8px 0';
  btn.style.border = 'none';
  btn.style.borderRadius = '6px';
  btn.style.background = '#e0e7ff';
  btn.style.cursor = 'pointer';
  btn.style.fontSize = '1em';
  btn.onmouseover = () => btn.style.background = '#a1c4fd';
  btn.onmouseout = () => btn.style.background = '#e0e7ff';
  btn.onclick = () => {
    // Remove fullscreen from any card
    document.querySelectorAll('.card--fullscreen').forEach(c => c.classList.remove('card--fullscreen'));
    document.querySelectorAll('.card-backdrop').forEach(b => b.remove());

    // Scroll to the card and make it fullscreen
    const card = document.querySelector(animal.selector);
    if (card) {
      // Add backdrop
      const backdrop = document.createElement('div');
      backdrop.className = 'card-backdrop';
      backdrop.onclick = exitFullscreen;
      document.body.appendChild(backdrop);

      // Make card fullscreen
      card.classList.add('card--fullscreen');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Exit fullscreen on card click
      card.addEventListener('click', exitFullscreen, { once: true });
    }
  };
  menu.appendChild(btn);
});

// Toggle menu button
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '☰';
toggleBtn.title = 'Show/Hide Menu';
toggleBtn.style.position = 'fixed';
toggleBtn.style.top = '20px';
toggleBtn.style.right = '20px';
toggleBtn.style.zIndex = '1001';
toggleBtn.style.background = '#fbc2eb';
toggleBtn.style.border = '2px solid #888';
toggleBtn.style.borderRadius = '50%';
toggleBtn.style.width = '40px';
toggleBtn.style.height = '40px';
toggleBtn.style.fontSize = '1.5em';
toggleBtn.style.cursor = 'pointer';
toggleBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
toggleBtn.style.display = 'none';

toggleBtn.onclick = () => {
  if (menu.style.display === 'none') {
    menu.style.display = '';
    toggleBtn.style.display = 'none';
  }
};

// Hide menu on small screens by default
function checkMenuDisplay() {
  if (window.innerWidth < 600) {
    menu.style.display = 'none';
    toggleBtn.style.display = '';
  } else {
    menu.style.display = '';
    toggleBtn.style.display = 'none';
  }
}
window.addEventListener('resize', checkMenuDisplay);

// Add close button to menu
const closeBtn = document.createElement('span');
closeBtn.textContent = '✕';
closeBtn.title = 'Close Menu';
closeBtn.style.position = 'absolute';
closeBtn.style.top = '8px';
closeBtn.style.right = '12px';
closeBtn.style.cursor = 'pointer';
closeBtn.style.fontSize = '1.2em';
closeBtn.style.color = '#888';
closeBtn.onclick = () => {
  menu.style.display = 'none';
  toggleBtn.style.display = '';
};
menu.appendChild(closeBtn);

// Add menu and toggle button to the page
document.body.appendChild(menu);
document.body.appendChild(toggleBtn);

// Initial display check
checkMenuDisplay();

function exitFullscreen() {
  document.querySelectorAll('.card--fullscreen').forEach(c => c.classList.remove('card--fullscreen'));
  document.querySelectorAll('.card-backdrop').forEach(b => b.remove());
}
