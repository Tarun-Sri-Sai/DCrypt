const path = require("path");

module.exports = {
  DEFAULT_DIMS: { width: 1000, height: 600 },
  IS_DEV: { production: false, development: true, test: true }[
    process.env.NODE_ENV
  ],
  VAULT_FILE: ".dcryptvault",
  PRELOAD_PATH: path.join(__dirname, "preload.js"),
  REACT_INDEX_PATH: path.join(__dirname, "..", "build", "index.html"),
  REACT_DEV_URL: "http://localhost:3000",
  EXPORT_FILE_PREFIX: "dcryptexport",
};
