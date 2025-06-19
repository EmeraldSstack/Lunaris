export class Shelly {
  constructor(fileSystem) {
    this.fs = fileSystem;
    this.currentPath = []; // root
  }

  pwd() {
    return "/" + this.currentPath.join("/");
  }

  ls() {
    const nodes = this.fs.listDir(this.currentPath);
    return nodes.map(n => (n.type === "folder" ? `[${n.name}]` : n.name)).join("  ");
  }

  cd(dir) {
    if (dir === "..") {
      if (this.currentPath.length > 0) this.currentPath.pop();
      return;
    }
    if (dir === "/") {
      this.currentPath = [];
      return;
    }
    const node = this.fs.getNode([...this.currentPath, dir]);
    if (node && node.type === "folder") {
      this.currentPath.push(dir);
    } else {
      throw new Error(`No such directory: ${dir}`);
    }
  }

  mkdir(folderName) {
    this.fs.mkdir(this.currentPath, folderName);
  }

  touch(fileName) {
    this.fs.touch(this.currentPath, fileName);
  }

  cat(fileName) {
    return this.fs.readFile(this.currentPath, fileName);
  }

  echo(content, fileName) {
    this.fs.writeFile(this.currentPath, fileName, content);
  }

  rm(name) {
    this.fs.delete(this.currentPath, name);
  }

  runCommand(input) {
    const parts = input.trim().split(" ");
    const cmd = parts[0];
    const args = parts.slice(1);

    try {
      switch (cmd) {
        case "pwd":
          return this.pwd();
        case "ls":
          return this.ls();
        case "cd":
          this.cd(args[0]);
          return "";
        case "mkdir":
          this.mkdir(args[0]);
          return "";
        case "touch":
          this.touch(args[0]);
          return "";
        case "cat":
          return this.cat(args[0]);
        case "echo":
          if (args.length >= 2) {
            const content = args.slice(0, args.length - 1).join(" ");
            const file = args[args.length - 1];
            this.echo(content, file);
            return "";
          }
          return "Usage: echo content filename";
        case "rm":
          this.rm(args[0]);
          return "";
        case "help":
          return "Commands: pwd, ls, cd, mkdir, touch, cat, echo, rm, help";
        default:
          return `Unknown command: ${cmd}`;
      }
    } catch (e) {
      return `Error: ${e.message}`;
    }
  }
}
