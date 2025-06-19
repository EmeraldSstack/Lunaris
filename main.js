import { WindowManager } from './core/WindowManager.js';

const wm = new WindowManager(document.getElementById("window-container"));

const apps = [
  { name: "Clock", file: "apps/clock.html" },
  { name: "Notes", file: "apps/notes.html" },
  { name: "Terminal", file: "apps/terminal.html" }
];

const dock = document.getElementById("dock");
apps.forEach(app => {
  const icon = document.createElement("div");
  icon.className = "dock-icon";
  icon.innerText = app.name;
  icon.onclick = () => wm.launchApp(app);
  dock.appendChild(icon);
});

setInterval(() => {
  const time = new Date().toLocaleTimeString();
  document.getElementById("taskbar-clock").innerText = time;
}, 1000);

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
