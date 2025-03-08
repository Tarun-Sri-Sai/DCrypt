const fs = require("fs");
const path = require("path");
const { decryptData, encryptData } = require("./utils/encryption");
const { isValidPassword } = require("./utils/validation");
const { VAULT_DIRECTORY } = require("./constants");

class VaultReadError extends Error {
  constructor(message) {
    super(message);
    this.name = "VaultReadError";
  }
}

class VaultWriteError extends Error {
  constructor(message) {
    super(message);
    this.name = "VaultWriteError";
  }
}

class VaultDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "VaultDataError";
  }
}

class Vault {
  #password = "";
  #directory = "";

  constructor(parentDirectory, password) {
    if (!isValidPassword(password)) {
      throw new VaultDataError("Password is too weak.");
    }

    if (!fs.existsSync(parentDirectory) || !fs.statSync(parentDirectory).isDirectory()) {
      throw new VaultDataError(`'${parentDirectory}' is not a valid directory.`);
    }

    this.#password = password;
    this.#directory = path.join(parentDirectory, VAULT_DIRECTORY);
  }

  read(relativePath = []) {
    const itemPath = path.join(this.#directory, ...relativePath);

    try {
      const itemStat = fs.statSync(itemPath);

      if (itemStat.isFile()) {
        const fileData = fs.readFileSync(itemPath, { encoding: "utf-8" });
        const decrypted = decryptData(fileData, this.#password);
        return [
          {
            name: path.basename(itemPath),
            isDirectory: false,
            contents: JSON.parse(decrypted),
          },
        ];
      }

      if (itemStat.isDirectory()) {
        const result = [];
        for (const childItem of fs.readdirSync(itemPath)) {
          result.push(childItem);
        }
        return result;
      }
    } catch (err) {
      throw new VaultReadError(err);
    }

    throw new VaultReadError(`'${itemPath}' is not a valid path.`);
  }

  write(relativePath = [], contents) {
    const itemPath = path.join(this.#directory, relativePath);

    const parentPath = path.dirname(itemPath);
    if (!fs.existsSync(parentPath)) {
      fs.mkdirSync(parentPath, { recursive: true });
    }

    if (!fs.statSync(parentPath).isDirectory()) {
      throw new VaultWriteError(`'${parentPath}' is not a directory.`)
    }

    try {
      const plainText = JSON.stringify(contents);
      const encrypted = encryptData(plainText, this.#password);
      fs.writeFileSync(itemPath, encrypted, { encoding: "utf-8" });
    } catch (err) {
      throw new VaultWriteError(err);
    }
  }
}

module.exports = { Vault, VaultWriteError, VaultReadError, VaultDataError };
