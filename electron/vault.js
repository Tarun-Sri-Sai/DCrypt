const fs = require("fs");
const path = require("path");
const { decryptData, encryptData } = require("./utils/encryption");
const {
  isValid,
  sortRecursively,
  isValidPassword,
} = require("./utils/validation");

class Vault {
  #data = null;
  #password = null;
  #DEFAULT_DATA = {
    name: "My Vault",
    type: "directory",
    contents: [],
  };
  #VAULT_FILE = ".dcryptvault";

  setPassword(password) {
    if (!isValidPassword(password)) {
      return false;
    }

    this.#password = password;
    return true;
  }

  hasVaultFile(directory) {
    const filePath = path.join(directory, this.#VAULT_FILE);
    return fs.existsSync(filePath);
  }

  unlock(directory) {
    if (this.#data !== null) return true;

    if (!this.hasVaultFile(directory)) {
      this.set(directory, this.#DEFAULT_DATA);
      return true;
    }

    try {
      const filePath = path.join(directory, this.#VAULT_FILE);
      const fileData = fs.readFileSync(filePath, "utf8");

      const dataString = decryptData(fileData, this.#password);
      const data = JSON.parse(dataString);
      if (!isValid(data)) {
        this.set(directory, this.#DEFAULT_DATA);
        return false;
      }

      this.set(directory, data);
      return true;
    } catch {
      return false;
    }
  }

  set(directory, data) {
    if (!isValid(data)) {
      return false;
    }

    this.#data = sortRecursively(data);
    this.#writeToFile(directory);
    return true;
  }

  getContents(pathArray) {
    try {
      let currentContents = this.#data;
      for (const pathItem of pathArray) {
        currentContents = currentContents[pathItem];
      }

      return currentContents;
    } catch {
      return null;
    }
  }

  setContents(directory, pathArray, key, value) {
    try {
      let currentContents = this.#data;
      for (const pathItem of pathArray) {
        currentContents = currentContents[pathItem];
      }

      const oldValue = currentContents[key];
      currentContents[key] = value;
      if (!isValid(currentContents, false)) {
        currentContents[key] = oldValue;
        return false;
      }
      currentContents = sortRecursively(currentContents);

      this.#writeToFile(directory);
      return true;
    } catch {
      return false;
    }
  }

  #writeToFile(directory) {
    const dataString = JSON.stringify(this.#data);
    const fileData = encryptData(dataString, this.#password);
    const filePath = path.join(directory, this.#VAULT_FILE);

    fs.writeFileSync(filePath, fileData);
  }
}

module.exports = { Vault };
