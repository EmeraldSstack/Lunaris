window.onload = () => {
  setTimeout(() => {
    document.getElementById('boot-screen').classList.add('hidden');
    document.getElementById('desktop').classList.remove('hidden');
  }, 2000);
};

function openTerminal() {
  document.getElementById('terminal').classList.remove('hidden');
  document.getElementById('terminal-input').focus();
}

function handleShell(e) {
  if (e.key === 'Enter') {
    const input = e.target.value;
    const output = document.getElementById('terminal-body');
    output.innerHTML += `\n<span>> ${input}</span>`;

    if (input.startsWith("mkdir ")) {
      const folderName = input.split(" ")[1];
      output.innerHTML += `\nFolder '${folderName}' created.`;
    } else if (input === "access root") {
      output.innerHTML += "\nAccessing root directory...";
    } else {
      output.innerHTML += "\nCommand not found.";
    }

    e.target.value = "";
    output.scrollTop = output.scrollHeight;
  }
}
