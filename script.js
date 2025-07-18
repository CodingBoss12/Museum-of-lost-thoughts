// Cursor Glow
const cursor = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Modal Settings
const modal = document.getElementById('settings-modal');
const darkToggle = document.getElementById('darkmode-toggle');
const soundToggle = document.getElementById('sound-toggle');
const textSizeSelect = document.getElementById('text-size-select');
const fontSelect = document.getElementById('font-select');
const ambientAudio = document.getElementById('ambient-audio');

function openSettings() { modal.classList.remove('hidden'); }
function closeSettings() { modal.classList.add('hidden'); }

// Load saved prefs
if(localStorage.getItem('darkMode') === 'on') {
  document.body.classList.add('dark');
  darkToggle.checked = true;
}
if(localStorage.getItem('sound') === 'on') {
  ambientAudio.play();
  soundToggle.checked = true;
}
textSizeSelect.value = localStorage.getItem('textSize') || 'medium';
fontSelect.value = localStorage.getItem('font') || 'spectral';
updateTextPrefs();

// Event Listeners
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', darkToggle.checked);
  localStorage.setItem('darkMode', darkToggle.checked ? 'on' : 'off');
});

soundToggle.addEventListener('change', () => {
  if(soundToggle.checked) {
    ambientAudio.play();
    localStorage.setItem('sound', 'on');
  } else {
    ambientAudio.pause();
    localStorage.setItem('sound', 'off');
  }
});

textSizeSelect.addEventListener('change', updateTextPrefs);
fontSelect.addEventListener('change', updateTextPrefs);

function updateTextPrefs() {
  const size = textSizeSelect.value;
  const font = fontSelect.value;

  document.body.style.fontSize = size === 'small' ? '14px' : size === 'large' ? '18px' : '16px';
  document.body.style.fontFamily = font === 'unica' ? "'Unica One', cursive" : "'Spectral', serif";

  localStorage.setItem('textSize', size);
  localStorage.setItem('font', font);
}

// Particle Background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w, h; 
let particles = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

for(let i=0; i<100; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function draw() {
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  for(let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if(p.x < 0 || p.x > w) p.dx *= -1;
    if(p.y < 0 || p.y > h) p.dy *= -1;
  }
  requestAnimationFrame(draw);
}
draw();
