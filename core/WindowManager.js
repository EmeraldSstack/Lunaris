let zIndexCounter = 1000;

export class WindowManager {
  constructor(container) {
    this.container = container;
  }

  launchApp(app) {
    const win = document.createElement("div");
    win.className = "app-window";
    win.style.zIndex = ++zIndexCounter;

    const titleBar = document.createElement("div");
    titleBar.className = "window-titlebar";
    titleBar.innerHTML = `
      <span class="title">${app.name}</span>
      <div class="window-controls">
        <button class="minimize">_</button>
        <button class="close">×</button>
      </div>
    `;

    const iframe = document.createElement("iframe");
    iframe.src = app.file;
    iframe.className = "window-frame";

    win.appendChild(titleBar);
    win.appendChild(iframe);
    this.container.appendChild(win);

    // Make draggable
    this.makeDraggable(win, titleBar);

    // Focus on click
    win.onclick = () => {
      win.style.zIndex = ++zIndexCounter;
    };

    // Close
    titleBar.querySelector(".close").onclick = () => {
      win.remove();
    };

    // Minimize (just hide)
    titleBar.querySelector(".minimize").onclick = () => {
      win.style.display = "none";
    };
  }

  makeDraggable(win, handle) {
    let offsetX, offsetY, isDragging = false;

    handle.onmousedown = (e) => {
      isDragging = true;
      offsetX = e.clientX - win.offsetLeft;
      offsetY = e.clientY - win.offsetTop;
      win.style.zIndex = ++zIndexCounter;
    };

    document.onmousemove = (e) => {
      if (isDragging) {
        win.style.left = `${e.clientX - offsetX}px`;
        win.style.top = `${e.clientY - offsetY}px`;
      }
    };

    document.onmouseup = () => {
      isDragging = false;
    };
  }
}
