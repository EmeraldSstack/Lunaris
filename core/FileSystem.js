const STORAGE_KEY = "lunaris_fs";

export class FileSystem {
  constructor() {
    this.fs = this.load() || this.createRoot();
  }

  createRoot() {
    return {
      type: "folder",
      name: "/",
      children: {}
    };
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.fs));
  }

  load() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
    return null;
  }

  // Helper: get node by path array, e.g. ['folder1','folder2']
  getNode(pathArray) {
    if (pathArray.length === 0) return this.fs;
    let current = this.fs;
    for (let part of pathArray) {
      if (!current.children || !current.children[part]) return null;
      current = current.children[part];
    }
    return current;
  }

  mkdir(path, folderName) {
    const dirNode = this.getNode(path);
    if (!dirNode || dirNode.type !== "folder") {
      throw new Error("Invalid path for mkdir");
    }
    if (dirNode.children[folderName]) {
      throw new Error("Folder already exists");
    }
    dirNode.children[folderName] = {
      type: "folder",
      name: folderName,
      children: {}
    };
    this.save();
  }

  touch(path, fileName, content = "") {
    const dirNode = this.getNode(path);
    if (!dirNode || dirNode.type !== "folder") {
      throw new Error("Invalid path for touch");
    }
    dirNode.children[fileName] = {
      type: "file",
      name: fileName,
      content
    };
    this.save();
  }

  writeFile(path, fileName, content) {
    const dirNode = this.getNode(path);
    if (!dirNode || dirNode.type !== "folder") {
      throw new Error("Invalid path for writeFile");
    }
    const fileNode = dirNode.children[fileName];
    if (!fileNode || fileNode.type !== "file") {
      throw new Error("File does not exist");
    }
    fileNode.content = content;
    this.save();
  }

  readFile(path, fileName) {
    const dirNode = this.getNode(path);
    if (!dirNode || dirNode.type !== "folder") {
      throw new Error("Invalid path for readFile");
    }
    const fileNode = dirNode.children[fileName];
    if (!fileNode || fileNode.type !== "file") {
      throw new Error("File does not exist");
    }
    return fileNode.content;
  }

  listDir(path) {
    const dirNode = this.getNode(path);
    if (!dirNode || dirNode.type !== "folder") {
      throw new Error("Invalid path for listDir");
    }
    return Object.values(dirNode.children);
  }

  delete(path, name) {
    const dirNode = this.getNode(path);
    if (!dirNode || dirNode.type !== "folder") {
      throw new Error("Invalid path for delete");
    }
    if (!dirNode.children[name]) {
      throw new Error("Item does not exist");
    }
    delete dirNode.children[name];
    this.save();
  }
}
