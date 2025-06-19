import { WindowManager } from './core/WindowManager.js';
import { FileSystem } from './core/FileSystem.js';
import { Shelly } from './core/Shelly.js';

const container = document.getElementById("window-container");
const wm = new WindowManager(container);
const fs = new FileSystem();
const shelly = new Shelly(fs);

// Load apps.json dynamically (simulate fetch)
async function loadApps() {
  const resp = await fetch('data/apps.json');
  const apps = await resp.json();
  return apps;
}

async function setupDock() {
  const dock = document.getElementById("dock");
  const apps = await loadApps();
  apps.forEach(app => {
    const icon = document.createElement("div");
    icon.className = "dock-icon";
    icon.innerText = app.name;
    icon.onclick = () => wm.launchApp(app);
    dock.appendChild(icon);
  });
}

setupDock();

setInterval(() => {
  const time = new Date().toLocaleTimeString();
  document.getElementById("taskbar-clock").innerText = time;
}, 1000);

// Export shelly so your Terminal app iframe can communicate
window.lunarisShelly = shelly;

// Basic window launcher (we'll replace this with WindowManager in Step 2)
function launchApp(app) {
  const container = document.getElementById("window-container");
  const frame = document.createElement("iframe");
  frame.src = app.file;
  frame.style = `
    position: absolute;
    top: 60px;
    left: 60px;
    width: 500px;
    height: 400px;
    border: 2px solid white;
    border-radius: 10px;
    background: white;
    z-index: 999;
  `;
  container.appendChild(frame);
}
