const path = require("path");

const IS_DEV = { production: false, development: true }[process.env.NODE_ENV];
const VAULT_FILE = ".dcryptvault";
const PRELOAD_PATH = path.join(__dirname, "..", "preload.js");
const DEFAULT_DIMS = { width: 800, height: 600 };
const INDEX_HTML = path.join(__dirname, "..", "..", "build", "index.html");
const REACT_DEV_URL = "http://localhost:3000";

module.exports = {
  IS_DEV,
  VAULT_FILE,
  PRELOAD_PATH,
  DEFAULT_DIMS,
  INDEX_HTML,
  REACT_DEV_URL,
};
