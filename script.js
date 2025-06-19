// Dynamic Clock
setInterval(() => {
  document.getElementById("clock").textContent = new Date().toLocaleTimeString();
}, 1000);

// Sample apps
const apps = [
  { name: "Clock", file: "apps/clock.html" },
  { name: "Notes", file: "apps/notes.html" }
];

// Load apps into dock
const dock = document.getElementById("dock");
apps.forEach(app => {
  const icon = document.createElement("div");
  icon.className = "dock-icon";
  icon.textContent = app.name;
  icon.onclick = () => openApp(app.file);
  dock.appendChild(icon);
});

function openApp(file) {
  const appWindow = document.getElementById("app-window");
  const appFrame = document.getElementById("app-frame");
  appFrame.src = file;
  appWindow.classList.remove("hidden");
}

document.getElementById("close-app").onclick = () => {
  document.getElementById("app-window").classList.add("hidden");
  document.getElementById("app-frame").src = "";
};

// Terminal commands
const output = document.getElementById("terminal-output");
const input = document.getElementById("terminal-input");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    output.innerHTML += `<div>> ${cmd}</div>`;
    handleCommand(cmd);
    input.value = "";
  }
});

function handleCommand(cmd) {
  if (cmd === "help") {
    output.innerHTML += "<div>Shelly commands: help, mkdir [name], access root</div>";
  } else if (cmd.startsWith("mkdir")) {
    const folder = cmd.split(" ")[1];
    if (folder) {
      output.innerHTML += `<div>📁 Folder '${folder}' created.</div>`;
    } else {
      output.innerHTML += "<div>Error: Folder name required.</div>";
    }
  } else if (cmd === "access root") {
    output.innerHTML += "<div>🛠️ Root access granted.</div>";
  } else {
    output.innerHTML += "<div>Unknown command.</div>";
  }

  output.scrollTop = output.scrollHeight;
}
