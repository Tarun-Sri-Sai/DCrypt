const path = require("path");

const formatPath = (inputPath) => {
  const normalizedPath = path.normalize(inputPath);
  const pathArray = normalizedPath.split(path.sep);
  if (pathArray.length <= 3) {
    return normalizedPath;
  }

  return path.join("...", ...pathArray.slice(-3));
};

module.exports = { formatPath };
